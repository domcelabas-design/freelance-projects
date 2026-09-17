# Tenstorrent #56908: address analysis and executable model

Date: 2026-09-17. Source revision: `ab7a0dbcc7d28d29822c465346e9ef0141ba9c31`.

**Status: preparatory engineering work, not a completed bounty solution.** The [issue](https://github.com/tenstorrent/tt-metal/issues/56908) advertises an approved USD 3,000 reward. No assignment, acceptance, or payment has been obtained. No claim, issue comment, or pull request has been posted to Tenstorrent.

## What was completed

Reviewed the two input readers, three relevant program factories, the shared writer, the 2D pre-gather compute kernel, device-operation dispatch, and the existing single-device regression test. No nested AGENTS.md files were present in the complete TTNN subtree inspected.

Created and executed [address-model.cjs](address-model.cjs). [results.json](results.json) is the actual output from the available V8 JavaScript runtime:

- 162 combinations of matrix shape and grid limit.
- The current-address model fails 99 combinations.
- Adding only the full-row stride, while retaining the current start offsets, still fails 99 combinations.
- A consistent contiguous-rectangle address model passes all 162 combinations, with no missing, duplicate, or out-of-range tile IDs.
- 27 full-width controls preserve the flat 1D address sequence.

These are integer-address checks, **not** C++ compilation, production-kernel tests, numerical LayerNorm/RMSNorm tests, or device results. The normal development runtime is unavailable in this session, and no Wormhole device is available. No assertion about hardware test success is made.

To repeat the model with Node:

```sh
node -e 'console.log(JSON.stringify(require("./address-model.cjs").run(),null,2))'
```

The run above used V8 directly; this Node command itself has not been executed here.

## Concrete counterexample

Take a 16-by-16 matrix of tiles, an 8-by-8 core grid, and two rows/two columns per core. For core `(x=1, y=0)`, the proposed contiguous assignment owns rows 2–3 and columns 0–1.

| Address policy | Tile IDs read by this core |
| --- | --- |
| Current factory offset and flat reader | 16, 17, 18, 19 |
| Add row stride only, retain current factory offset | 16, 17, 32, 33 |
| Consistent contiguous assignment plus row stride | 32, 33, 48, 49 |

For the whole matrix, the current model misses 126 tiles and repeats 126 accesses. The stride-only model still misses 112 tiles and repeats 112 accesses.

This establishes why a reader-only increment is insufficient for a complete partition. A cyclic row assignment would also be possible, but it would require a different, consistently applied row stride for input, statistics, and output.

## Implementation findings

1. **Reader row stride.** [Pre-gather reader](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/ttnn/cpp/ttnn/operations/normalization/layernorm_distributed/device/kernels/dataflow/reader_layernorm_preallgather_2d.cpp) and [shared post-gather reader](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/ttnn/cpp/ttnn/operations/normalization/layernorm_distributed/device/kernels/dataflow/reader_unary_interleaved_ln_rm_gb_post_allgather.cpp) advance the input tile ID linearly across local rows. They need both the local slice width and the full physical row width. A contiguous-row design adds `full_width - local_width` after each local row. The residual pre-add reader shares this address and must remain aligned.

2. **Factory start offsets.** The [pre](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/ttnn/cpp/ttnn/operations/normalization/layernorm_distributed/device/layernorm_pre_all_gather_program_factory.cpp), [normal post](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/ttnn/cpp/ttnn/operations/normalization/layernorm_distributed/device/layernorm_post_all_gather_program_factory.cpp), and [Welford post](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/ttnn/cpp/ttnn/operations/normalization/layernorm_distributed/device/layernorm_post_all_gather_welford_program_factory.cpp) 2D paths currently start at `x * Wt + y * tiles_per_core_y`. With a contiguous partition the start row is `x * tiles_per_core_x`; input, output and statistics offsets must use that same row. Fixing only the reader stride makes adjacent core groups overlap.

3. **Output row stride.** The [shared writer](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/ttnn/cpp/ttnn/operations/normalization/layernorm_distributed/device/kernels/dataflow/writer_unary_interleaved_start_id_blocked.cpp) also advances linearly. Even with its starting offset corrected, the example would write 32, 33, 34, 35 rather than 32, 33, 48, 49. Any change to its argument schema must also update its 1D and pre-Welford callers. The 1D row gap must stay zero.

4. **Welford producer/consumer width mismatch.** The Welford post factory supplies full `Wt` to the shared reader but `tiles_per_core_y` to compute. In the example, two local rows cause the reader to produce 32 input tiles while compute consumes four. Local/full widths must be explicit, and block size must remain compatible with each local row. These are static-code observations; the resulting device behavior has not been measured here.

## Known boundaries that prevent calling this finished

- [#55075](https://github.com/tenstorrent/tt-metal/issues/55075) already tracks the pre-2D L1 issue and a tall-shape hang. The 2D compute kernel emits per-row partials, but the reader's transfer and compute's final merge occur once after the row loop. The new bounty explicitly requires maintainer confirmation before claiming that transfer work as a separate fix. No fix or new-bug credit is claimed here.
- [#52110](https://github.com/tenstorrent/tt-metal/issues/52110) already records that the pre-2D path computes only RMSNorm statistics despite LayerNorm allocating two statistic columns. This complicates the new bounty's requirement to cover both operations. It is not a newly discovered issue.
- The API explicitly rejects **pre-gather Welford with a 2D grid**. A regression must respect that restriction and exercise post-Welford only through supported API/configuration combinations.

## Required next validation

1. Implement matching input, statistics and output addressing in the pinned sources, including each kernel argument binding. Compile and run formatting/lint checks.
2. First isolate normal and Welford post-gather on a single Wormhole using known-correct statistics, so the existing pre-2D hang cannot hide a post-addressing error.
3. Add a multi-row shape such as `tile_rows = 2 * grid.y`, with distinct non-affine row/column data. Pure row scaling or offsets can disappear under normalization and are weak regression inputs.
4. Compare each row with the appropriate PyTorch result and retain existing valid 1D/single-row 2D cases. Check gamma, beta and supported residual combinations. Record real tolerances, command, device configuration, and actual output.
5. Resolve the already-tracked pre-2D blockers and scope with maintainers before representing all bounty acceptance criteria as met. Do not weaken validation or silently skip required cases.

The existing control test is [test_distributed_rmsnorm_allgather.py](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/tests/ttnn/nightly/unit_tests/operations/fused/test_distributed_rmsnorm_allgather.py); it currently uses sequence length 128 and can mask multi-row-per-core defects.

## Submission constraints and money

The project's [AI bounty rules](https://github.com/tenstorrent/tt-metal/blob/ab7a0dbcc7d28d29822c465346e9ef0141ba9c31/CONTRIBUTING.md#bug-bounty-program---ai-tool-restrictions) prohibit automated issue claims/assignment requests and require humans to personally review and take responsibility for AI-assisted submissions. That requirement, plus the mandatory Wormhole test, means this cannot be turned into a fully autonomous paid submission with the current session capabilities.

The USD 3,000 is the sponsor's advertised reward, not money earned or reserved for this account. Payment method and settlement have not been verified. No equipment, compute service, or other purchase has been made.

Research and the integer model were prepared by Codex. No independent human review is claimed.
