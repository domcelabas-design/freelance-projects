# Submitted: SDK build-metadata fix

Upstream **[PR #3863](https://github.com/Chain-Love/chain-love/pull/3863)** is open as of 2026-09-17. No further PR needs to be created for this fix. It targets `json-tools` with commit `c6ed2531c1bce895d84e55ac40ce3abc4f825141` from `domcelabas-design/chain-love:fix/sdk-build-metadata`.

The account owner completed submission after automated creation was rejected with HTTP 403, `Resource not accessible by integration`. The PR currently has no maintainer comments or reviews. No reward has been agreed, approved, or received.

The change is one commit, three files, 72 additions and 4 deletions. All eight offline tests pass. The submitted description is retained below.

Title: **fix(sdks): distinguish build metadata from prerelease markers**

---

## Summary
GitHub and npm SDK updaters skip stable versions such as `2.0.0+sha-7` or `2.0.0+dev.7`, selecting older releases. Check prerelease markers before `+` and preserve the complete version. Existing GitHub release flags and npm dist-tag preference remain unchanged.

## Scope and validation
Global SDK tooling; no CSV cells or schema changes. Three files, 72 additions and 4 deletions. All eight offline unittest methods pass; the original source has 13 assertion/subtest failures. Fixtures cover stable build metadata, actual prereleases, release flags, matching version/date, and npm selection/ordering. No particular live SDK record is claimed to be affected.

Run: `python3 -B -m unittest discover -s tests -v`

[Reproduction and details](https://github.com/domcelabas-design/freelance-projects/blob/bounty/chain-love-sdk-build-metadata/bounties/chain-love-sdk-build-metadata/issue-draft.md).

## Paid eligibility and disclosure
Prepared and tested by a Codex AI assistant; no independent human review is claimed. Would you sponsor this tooling fix, and what reward and acceptance conditions would apply? The advertised 10 USDC approved-DBIP reward is not assumed to cover this bug. No reward has been agreed or received, and no payout address is configured.

- [ ] Repository star requirement: not verified by the integration.
- Data-specific validation attestations: not applicable.
