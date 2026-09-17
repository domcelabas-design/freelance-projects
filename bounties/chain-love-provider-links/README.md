# Chain.Love provider contact update

Prepared on 2026-09-17. **Code is pushed and validated; the upstream PR has not been submitted. No reward has been approved or received.**

The [change in the fork](https://github.com/domcelabas-design/chain-love/commit/1406bcc0de946f28600bb6dfba227ffadfb63d6f) fills two empty cells in `references/providers/providers.csv`. Branch: `data/txnlab-oku-community-links`. Base: upstream `main`, commit `206288e7e84f007ec47d28ee664ac95079312f23`.

## Submit

**[Open the prepared pull request form](https://github.com/Chain-Love/chain-love/compare/main...domcelabas-design:chain-love:data/txnlab-oku-community-links?quick_pull=1&title=data%28providers%29%3A+add+official+TxnLab+X+and+Oku+Telegram+links&body=%23%23+Summary%0AFill+two+empty+provider+contact+fields+in+%60references%2Fproviders%2Fproviders.csv%60%3A%0A%0A%7C+Provider+%7C+Field+%7C+Value+%7C+Official+source+%7C%0A%7C+---+%7C+---+%7C+---+%7C+---+%7C%0A%7C+TxnLab+%7C+x+%7C+%60txnlab%60+%7C+https%3A%2F%2Fwww.txnlab.dev%2F+footer+links+to+https%3A%2F%2Ftwitter.com%2Ftxnlab%3B+it+redirects+to+the+TxnLab+X+profile.+%7C%0A%7C+Oku+Trade+%7C+telegram+%7C+%60OkuTelegram%60+%7C+https%3A%2F%2Foku.trade%2F+links+to+https%3A%2F%2Ft.me%2FOkuTelegram%3B+the+destination+identifies+the+Oku+community.+%7C%0A%0ASources+checked+on+2026-09-17.+These+fields+are+separate+from+TxnLab+Discord%2FLinkedIn+in+%233795+and+Oku+X%2FGitHub%2FDiscord+in+%232865.%0A%0A%23%23+Scope%0A-+Update+data+rows%3B+no+schema+changes.%0A-+Existing+Algorand+SDK+provider+%28TxnLab%29+and+Filecoin+bridge+provider+%28Oku%29.%0A-+TxnLab%27s+website+describes+its+Algorand+products.+Oku%27s+official+Filecoin+deployments%3A+https%3A%2F%2Fdocs.oku.trade%2Fhome%2Fextra-information%2Fdeployed-contracts%0A-+Two+cells+in+two+existing+rows%3B+all+727+provider+rows+and+all+other+fields+preserved.%0A%0A%23%23+Validation%0A%60validate_csv.py%60%2C+%60csv_to_json.py%60%2C+and+%60validate.py%60+all+exit+0+using+the+project%27s+json-tools+scripts.+%60git+diff+--check%60+passes.%0AThe+generator+reports+six+missing-chain+warnings+for+untouched+Zilliqa%2C+Camino%2C+and+Lightning+listings.%0A%0A%23%23+Disclosure+and+checklist%0APrepared+and+source-checked+by+a+Codex+AI+assistant.+No+independent+human+review+is+claimed.%0A-+%5B+%5D+I+have+starred+the+Chain.Love+repository+%28not+verified+through+the+integration%29.%0A-+%5Bx%5D+CSV+fields+follow+the+Style+Guide+and+column+definitions.%0A-+%5B+%5D+Account+owner+has+personally+opened+and+verified+the+new+links.%0A-+%5B+%5D+Account+owner+has+personally+reviewed+the+network+evidence+and+changed+values.%0A%0A%23%23+Reward%0ASubmitted+for+consideration+under+https%3A%2F%2Fgithub.com%2FChain-Love%2Fchain-love%2Fdiscussions%2F41.%0ATwo+improved+cells+imply+a+base+calculation+of+0.12+USDC+before+applicable+adjustments%2C+subject+to+maintainer+approval+and+eligibility.%0ARewards+address%3A+not+yet+supplied+by+the+account+owner.+No+reward+has+been+approved+or+received.%0A)**

Review the two changed values and the sources below. The project's [.github/PULL_REQUEST_TEMPLATE.md](https://github.com/Chain-Love/chain-love/blob/main/.github/PULL_REQUEST_TEMPLATE.md) asks the contributor to personally verify links and network support. Those human attestations and the unverified star requirement are deliberately left unchecked. Mark them only after you have performed those checks. Use **Create draft pull request** if review is incomplete; otherwise submit with **Create pull request**.

The integration can write to your fork. Its earlier upstream PR-creation attempt was rejected with HTTP 403, `Resource not accessible by integration`; the GitHub form therefore needs the account owner's session. No new fork or repeat connection setup is needed.

## Sources and scope

| Provider | Cell | New value | Evidence |
| --- | --- | --- | --- |
| TxnLab | x | `txnlab` | [Official website](https://www.txnlab.dev/) footer links to `https://twitter.com/txnlab`. A direct HTTP request redirects to [the X profile](https://x.com/txnlab), status 200, title identifying TxnLab. The site describes its Algorand tools. |
| Oku Trade | telegram | `OkuTelegram` | [Official website](https://oku.trade/) community link leads to [the Telegram group](https://t.me/OkuTelegram), whose page identifies Oku. [Official deployment documentation](https://docs.oku.trade/home/extra-information/deployed-contracts) lists Filecoin contracts. |

The existing dataset maps TxnLab SDKs to Algorand and Oku's bridge to Filecoin. No network listings, pricing, capabilities, or schemas are changed. The two values use the required suffix-after-domain format.

Duplicate checks covered provider searches and the current changes in PRs #2865, #2977, #2978, #2979, #3250, #3323, #3324, #3325, #3326, and #3795. Neither proposed cell is included in those patches. In particular, #3795 adds different TxnLab fields; #2865 adds different Oku fields. Other candidates were skipped where pending contributions already filled their contacts.

## Validation

- Exact CSV comparison: two changed cells, 727 rows preserved in the same order, every other field unchanged.
- `git diff --check`: passed.
- Project scripts `validate_csv.py`, `csv_to_json.py`, and `validate.py`: all exit 0 using Python 3.12 and the vendored json-tools dependencies.
- The generator reports six missing-chain warnings for untouched Zilliqa, Camino, and Lightning listings. Validation still succeeds.
- GitHub comparison: one commit, one file, two additions and two deletions.
- Published file blob `d950fa2b831d107dd37ceb261e727476b8a3be55` exactly matches the validated local file.

Validation used a separate checkout with scripts and `meta` from the current `json-tools` branch. Generated JSON, tooling copies, and logs are not part of the contribution.

## Reward status

The [published program](https://github.com/Chain-Love/chain-love/discussions/41) lists 0.06 USDC per accepted improved non-null cell. Two cells imply a **base calculation of 0.12 USDC**, before any category multipliers or quality adjustments. This is conditional on acceptance and program eligibility, not an approved reward. Payments are monthly on Ethereum; no payout address has been supplied by the account owner. No wallet has been created and no funds have moved.

The separate [SDK fix PR #3863](https://github.com/Chain-Love/chain-love/pull/3863) is already open and awaits maintainers. Its tooling reward is unconfirmed. [Updated SDK work record](https://github.com/domcelabas-design/freelance-projects/tree/bounty/chain-love-sdk-build-metadata/bounties/chain-love-sdk-build-metadata).

## AI disclosure

Research, edits, and validation were performed by a Codex AI assistant. Sources and destination responses were checked as described above; independent human review is not claimed.

## Prepared PR description

## Summary
Fill two empty provider contact fields in `references/providers/providers.csv`:

| Provider | Field | Value | Official source |
| --- | --- | --- | --- |
| TxnLab | x | `txnlab` | https://www.txnlab.dev/ footer links to https://twitter.com/txnlab; it redirects to the TxnLab X profile. |
| Oku Trade | telegram | `OkuTelegram` | https://oku.trade/ links to https://t.me/OkuTelegram; the destination identifies the Oku community. |

Sources checked on 2026-09-17. These fields are separate from TxnLab Discord/LinkedIn in #3795 and Oku X/GitHub/Discord in #2865.

## Scope
- Update data rows; no schema changes.
- Existing Algorand SDK provider (TxnLab) and Filecoin bridge provider (Oku).
- TxnLab's website describes its Algorand products. Oku's official Filecoin deployments: https://docs.oku.trade/home/extra-information/deployed-contracts
- Two cells in two existing rows; all 727 provider rows and all other fields preserved.

## Validation
`validate_csv.py`, `csv_to_json.py`, and `validate.py` all exit 0 using the project's json-tools scripts. `git diff --check` passes.
The generator reports six missing-chain warnings for untouched Zilliqa, Camino, and Lightning listings.

## Disclosure and checklist
Prepared and source-checked by a Codex AI assistant. No independent human review is claimed.
- [ ] I have starred the Chain.Love repository (not verified through the integration).
- [x] CSV fields follow the Style Guide and column definitions.
- [ ] Account owner has personally opened and verified the new links.
- [ ] Account owner has personally reviewed the network evidence and changed values.

## Reward
Submitted for consideration under https://github.com/Chain-Love/chain-love/discussions/41.
Two improved cells imply a base calculation of 0.12 USDC before applicable adjustments, subject to maintainer approval and eligibility.
Rewards address: not yet supplied by the account owner. No reward has been approved or received.
