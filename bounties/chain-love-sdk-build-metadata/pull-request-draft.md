# Ready to submit: SDK build-metadata fix

The patch is published in [domcelabas-design/chain-love, branch fix/sdk-build-metadata](https://github.com/domcelabas-design/chain-love/tree/fix/sdk-build-metadata), commit `c6ed2531c1bce895d84e55ac40ce3abc4f825141`.

**[Open the prefilled pull request](https://github.com/Chain-Love/chain-love/compare/json-tools...domcelabas-design:chain-love:fix/sdk-build-metadata?quick_pull=1&title=fix%28sdks%29%3A+distinguish+build+metadata+from+prerelease+markers&body=%23%23+Summary%0AGitHub+and+npm+SDK+updaters+skip+stable+versions+such+as+%602.0.0%2Bsha-7%60+or+%602.0.0%2Bdev.7%60%2C+selecting+older+releases.+Check+prerelease+markers+before+%60%2B%60+and+preserve+the+complete+version.+Existing+GitHub+release+flags+and+npm+dist-tag+preference+remain+unchanged.%0A%0A%23%23+Scope+and+validation%0AGlobal+SDK+tooling%3B+no+CSV+cells+or+schema+changes.+Three+files%2C+72+additions+and+4+deletions.+All+eight+offline+unittest+methods+pass%3B+the+original+source+has+13+assertion%2Fsubtest+failures.+Fixtures+cover+stable+build+metadata%2C+actual+prereleases%2C+release+flags%2C+matching+version%2Fdate%2C+and+npm+selection%2Fordering.+No+particular+live+SDK+record+is+claimed+to+be+affected.%0A%0ARun%3A+%60python3+-B+-m+unittest+discover+-s+tests+-v%60%0A%0A%5BReproduction+and+details%5D%28https%3A%2F%2Fgithub.com%2Fdomcelabas-design%2Ffreelance-projects%2Fblob%2Fbounty%2Fchain-love-sdk-build-metadata%2Fbounties%2Fchain-love-sdk-build-metadata%2Fissue-draft.md%29.%0A%0A%23%23+Paid+eligibility+and+disclosure%0APrepared+and+tested+by+a+Codex+AI+assistant%3B+no+independent+human+review+is+claimed.+Would+you+sponsor+this+tooling+fix%2C+and+what+reward+and+acceptance+conditions+would+apply%3F+The+advertised+10+USDC+approved-DBIP+reward+is+not+assumed+to+cover+this+bug.+No+reward+has+been+agreed+or+received%2C+and+no+payout+address+is+configured.%0A%0A-+%5B+%5D+Repository+star+requirement%3A+not+verified+by+the+integration.%0A-+Data-specific+validation+attestations%3A+not+applicable.)**

Review the title, description and changes, then click **Create pull request**. To retain draft status, choose **Create draft pull request** from the button's dropdown instead.

Status checked on 2026-09-17: writing to the fork succeeds. The attempt to create an upstream PR was rejected by GitHub with HTTP 403, `Resource not accessible by integration`. A follow-up check confirmed no upstream PR exists for this branch. The remaining action must be performed from the account owner's GitHub session; granting more access to the fork did not grant the integration access to the upstream project.

Remote comparison verified: one commit, exactly three intended files, 72 additions and 4 deletions. All eight local offline tests pass. No reward has been agreed or received.

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
