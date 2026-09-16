# Prepared upstream pull request

Status on 2026-09-16: the fork `domcelabas-design/chain-love` exists, but GitHub rejected branch creation with HTTP 403, `Resource not accessible by integration`. The connector's accessible-repository list still contains only `domcelabas-design/freelance-projects`. No upstream PR was created.

The fork contains only `main`, but the target `json-tools` commit is readable through the fork. Once repository access is granted, create `fix/sdk-build-metadata` directly from commit `24d9e96116496ca4fe5d3dd2478353f6b4c7ad58`, upload the three files in `fix.patch`, and create a draft PR targeting `Chain-Love/chain-love:json-tools`. Recheck upstream before submitting if it has changed.

Title: **fix(sdks): distinguish build metadata from prerelease markers**

---

## Summary

The GitHub and npm SDK metadata updaters reject stable versions when build metadata contains a hyphen or a prerelease keyword, such as `2.0.0+sha-7` or `2.0.0+dev.7`. They can consequently select an older release and record its version and date.

Check prerelease markers only before the first `+`, while preserving the full version in the output. GitHub's existing tag-format validation, draft/prerelease flags, and npm dist-tag preference remain in effect. [SemVer sections 9–11](https://semver.org/spec/v2.0.0.html#spec-item-9) distinguish prerelease identifiers from build metadata.

## Type of change

- [x] Tooling bug fix: SDK metadata generation
- No CSV rows or schema changes

## Scope

- Networks: global tooling
- Category: `sdks`
- Base: `json-tools` at `24d9e96116496ca4fe5d3dd2478353f6b4c7ad58`
- Three files, 72 insertions and 4 deletions

## Validation

```sh
python3 -B -m unittest discover -s tests -v
git diff --cached --check
```

All eight test methods pass with the patch. Against the unmodified source, the same suite reports 13 assertion/subtest failures.

The offline fixtures cover stable build metadata, genuine prerelease exclusion, GitHub draft/prerelease flags, matching version and release date, npm dist-tag preference, fallback selection, and ordering that ignores build metadata. They make no network requests. They demonstrate a parser/selection defect; no particular live SDK record is claimed to be affected.

## Contribution checklist

- [ ] Star requirement: account-owner status has not been verified by the integration.
- Data-specific provider, network-support, cell-value, and new-link attestations: not applicable; no database cells or links are changed.

## Paid eligibility and disclosure

Prepared and tested by a Codex AI assistant for the account owner. No independent human review is claimed.

This draft requests review of the fix and confirmation of paid eligibility. Would the maintainers sponsor this tooling correction, and if so, what reward and acceptance conditions apply? The advertised 10 USDC approved-DBIP reward is not assumed to cover an ordinary tooling bug. No per-cell reward or existing bounty assignment is claimed. No reward has been agreed or received, and no payout address is configured.
