# [BUG] SDK metadata skips stable releases with SemVer build metadata

## Problem

On `json-tools` at `24d9e96116496ca4fe5d3dd2478353f6b4c7ad58`, both `tools/update_sdks_metadata_github.py:is_stable_release_tag()` and `tools/update_sdks_metadata_npm.py:is_stable_npm_version()` look for hyphens and prerelease keywords across the entire version string.

As a result, valid build metadata such as `+sha-5114f85`, `+dev.7`, or `+alpha` makes a normal release appear to be a prerelease. The selectors can fall back to an older version, so the generated `latestKnownVersion` and `latestKnownReleaseDate` can become stale.

The [SemVer specification](https://semver.org/spec/v2.0.0.html#spec-item-10) allows hyphens in build identifiers and excludes build metadata from version precedence. A prerelease suffix occurs before `+`.

## Reproduction

From the repository root, with the existing Python requirements installed:

```sh
PYTHONPATH=tools python3 - <<'PY'
from update_sdks_metadata_github import is_stable_release_tag, pick_latest_stable_release
from update_sdks_metadata_npm import is_stable_npm_version, pick_latest_stable_version

for version in ("1.2.3+sha-5114f85", "1.2.3+dev.7", "1.2.3-rc.1+build-7"):
    print(version, is_stable_release_tag(version), is_stable_npm_version(version))

print(pick_latest_stable_release([
    {"tag_name": "v2.0.0+sha-7"}, {"tag_name": "v1.0.0"}
])["tag_name"])
print(pick_latest_stable_version({
    "dist-tags": {"latest": "2.0.0+sha-7"},
    "versions": {"1.0.0": {}, "2.0.0+sha-7": {}}
}))
PY
```

Current result: both stable examples return `False`; the selectors return `v1.0.0` and `1.0.0`. Expected: the stable examples return `True`, the genuine `-rc.1` prerelease remains `False`, and the selectors return the full version with build metadata.

These are synthetic fixtures demonstrating the selection defect, not a claim that a specific published SDK record is currently affected.

## Prepared fix and tests

Check prerelease markers only in the portion before `+`. Retain the full tag for GitHub's existing format check and for the output fields. Preserve the existing GitHub draft/prerelease flags and npm dist-tag preference.

Patch and verification notes: https://github.com/domcelabas-design/freelance-projects/tree/bounty/chain-love-sdk-build-metadata/bounties/chain-love-sdk-build-metadata

The patch includes eight offline unittest methods. Against the original code the suite reports 13 failures including subtests. With the patch all eight tests pass, including true-prerelease exclusion, GitHub release flags, version/date pairing, npm fallback selection, and ordering that ignores build metadata. The change is 72 insertions and 4 deletions across three files; no CSV cells are changed.

## Paid eligibility inquiry and disclosure

This work was prepared and tested by a Codex AI assistant for the account owner; no independent human review is claimed. Is this tooling correction work you would sponsor, and if so, what reward and acceptance conditions apply? The published 10 USDC approved-DBIP provision is not assumed to cover an ordinary tooling bug, and no per-cell reward is claimed. No reward has been agreed or received.
