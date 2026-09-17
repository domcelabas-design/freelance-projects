# Chain.Love SDK build-metadata fix

Updated on 2026-09-17. The patch is tested and pushed to `domcelabas-design/chain-love:fix/sdk-build-metadata`. **Upstream [PR #3863](https://github.com/Chain-Love/chain-love/pull/3863) is now open.** It targets `json-tools` with the tested commit. No reward has been assigned, approved, or received.

## Deliverables

- [fix.patch](fix.patch): two small production changes and eight regression tests.
- [issue-draft.md](issue-draft.md): an upstream bug report and an explicit request to confirm whether paid work is available.

The target is `Chain-Love/chain-love`, branch `json-tools`, commit `24d9e96116496ca4fe5d3dd2478353f6b4c7ad58`. The patch changes three files: 72 insertions and 4 deletions. It does not change database records.

## What it fixes

GitHub and npm metadata updaters reject stable versions whose build metadata contains a hyphen or a word such as `dev`. For example, `2.0.0+sha-7` is skipped and an older `1.0.0` can be selected instead. The fix checks the portion before `+` for prerelease markers while retaining the complete selected version.

The [SemVer specification, sections 9–11](https://semver.org/spec/v2.0.0.html#spec-item-9), distinguishes prerelease identifiers from build metadata. This is a focused correction to the existing parsers, not a new strict SemVer parser.

## Verification

The unmodified source fails the regression suite with 13 assertion/subtest failures across eight test methods. With the patch, all eight tests pass. Tests use synthetic API fixtures and make no network requests. They cover stable build metadata, genuine prereleases, GitHub draft/prerelease flags, selected version/date pairing, npm dist-tag preference, and fallback ordering. `git diff --check` passes.

Run from a clean checkout at the target commit, replacing `/path/to/fix.patch` with this patch's location:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install --no-index --find-links tools/wheels -r tools/requirements.txt
git apply --check /path/to/fix.patch
git apply /path/to/fix.patch
.venv/bin/python -B -m unittest discover -s tests -v
git diff --check
```

## Reward and submission status

The fix is published in [the fork](https://github.com/domcelabas-design/chain-love/tree/fix/sdk-build-metadata), commit `c6ed2531c1bce895d84e55ac40ce3abc4f825141`. The upstream comparison has one commit and exactly the three intended files.

[PR #3863](https://github.com/Chain-Love/chain-love/pull/3863) has been submitted from the account owner's GitHub session. The earlier integration attempt received HTTP 403, `Resource not accessible by integration`; no repeat submission is needed. On 2026-09-17 the PR is open, with no maintainer comments or reviews and no reward agreement. [The submitted description and validation details](pull-request-draft.md) are retained for reference.

The [published program](https://github.com/Chain-Love/chain-love/discussions/41) advertises 10 USDC for approved database improvement proposals. That does **not** establish a reward for this tooling bug. A maintainer must confirm eligibility and any amount. The program pays monthly on Ethereum, not PayPal. On September 8 the maintainers warned that new DBIP reviews may take months. The star requirement remains applicable; its status has not been verified through the integration.

Research, implementation, and tests were performed by a Codex AI assistant. No independent human review is claimed. The evidence demonstrates a parser/selection defect using fixtures; it does not establish that a particular live SDK record is currently incorrect.
