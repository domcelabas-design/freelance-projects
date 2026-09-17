// Standalone address-model check for tt-metal issue #56908.
// This executes integer indexing models only, not Tenstorrent C++ or hardware kernels.
// Source reviewed: ab7a0dbcc7d28d29822c465346e9ef0141ba9c31.
"use strict";

function divisorAtMost(total, maximum) {
  let value = Math.min(total, maximum);
  while (total % value !== 0 && value > 1) value--;
  return value;
}

function expectedOwnership(rows, width, coreX, coreY, rowsPerCore, columnsPerCore) {
  const result = [];
  // Independent oracle: partition the complete row-major matrix into rectangles.
  const firstRow = coreX * rowsPerCore;
  const firstColumn = coreY * columnsPerCore;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < width; column++) {
      if (row >= firstRow && row < firstRow + rowsPerCore &&
          column >= firstColumn && column < firstColumn + columnsPerCore) {
        result.push(row * width + column);
      }
    }
  }
  return result;
}

function modelRead(width, x, y, height, localWidth, mode) {
  const startRow = mode === "complete-addressing" ? x * height : x;
  let id = startRow * width + y * localWidth;
  const result = [];
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < localWidth; column++) result.push(id++);
    if (mode !== "current") id += width - localWidth;
  }
  return result;
}

function evaluate(rows, width, gridLimit, mode) {
  const coresX = divisorAtMost(rows, gridLimit);
  const coresY = divisorAtMost(width, gridLimit);
  const height = rows / coresX;
  const localWidth = width / coresY;
  const seen = new Set();
  let ownershipMismatches = 0, duplicates = 0, outOfBounds = 0;
  for (let x = 0; x < coresX; x++) {
    for (let y = 0; y < coresY; y++) {
      const expected = expectedOwnership(rows, width, x, y, height, localWidth);
      const actual = modelRead(width, x, y, height, localWidth, mode);
      if (actual.length !== expected.length ||
          actual.some((value, index) => value !== expected[index])) ownershipMismatches++;
      for (const id of actual) {
        if (id < 0 || id >= rows * width) outOfBounds++;
        if (seen.has(id)) duplicates++;
        seen.add(id);
      }
    }
  }
  return {rows, width, gridLimit, coresX, coresY, rowsPerCore:height,
    columnsPerCore:localWidth, ownershipMismatches, duplicates, outOfBounds,
    missing:rows * width - [...seen].filter(id => id >= 0 && id < rows * width).length};
}

function run() {
  const dimensions = [1, 2, 4, 8, 9, 16, 24, 32, 64];
  const totals = {cases:0, currentFailing:0, strideOnlyFailing:0, completeAddressingFailing:0};
  for (const rows of dimensions) {
    for (const width of dimensions) {
      for (const grid of [4, 8]) {
        totals.cases++;
        for (const [mode, key] of [
          ["current", "currentFailing"],
          ["stride-only", "strideOnlyFailing"],
          ["complete-addressing", "completeAddressingFailing"]
        ]) {
          const result = evaluate(rows, width, grid, mode);
          if (result.ownershipMismatches || result.duplicates || result.outOfBounds || result.missing) totals[key]++;
        }
      }
    }
  }
  if (totals.completeAddressingFailing !== 0) throw new Error("Corrected address model failed");
  if (totals.currentFailing === 0 || totals.strideOnlyFailing === 0) throw new Error("Negative controls failed");
  const example = ["current", "stride-only", "complete-addressing"].map(mode => ({
    mode, ...evaluate(16, 16, 8, mode),
    core_1_0_reads: modelRead(16, 1, 0, 2, 2, mode)
  }));
  const writerExpected = expectedOwnership(16, 16, 1, 0, 2, 2);
  const writerIfOnlyStartCorrected = [32, 33, 34, 35];
  if (JSON.stringify(writerExpected) === JSON.stringify(writerIfOnlyStartCorrected)) {
    throw new Error("Writer negative control failed");
  }
  // In the 1D case the local width equals the full width; the added row gap is zero.
  let oneDimensionalControls = 0;
  for (const width of dimensions) for (const height of [1, 2, 4]) {
    const flat = modelRead(width, 0, 0, height, width, "current");
    const strided = modelRead(width, 0, 0, height, width, "complete-addressing");
    if (JSON.stringify(flat) !== JSON.stringify(strided)) throw new Error("1D behavior changed");
    oneDimensionalControls++;
  }
  return {sourceRevision:"ab7a0dbcc7d28d29822c465346e9ef0141ba9c31",
    kind:"integer address model, not production or hardware test",
    totals, oneDimensionalControls, example,
    writerCounterexample:{expected:writerExpected,flatAfterStartCorrection:writerIfOnlyStartCorrected},
    welfordTrafficExample:{rowsPerCore:2,fullWidth:16,localWidth:2,
      readerTilesWithCurrentArguments:32,computeTiles:4}};
}

if (typeof module !== "undefined") module.exports = {run, evaluate, modelRead};
// Run with Node when available: node -e 'console.log(JSON.stringify(require("./address-model.cjs").run(),null,2))'
