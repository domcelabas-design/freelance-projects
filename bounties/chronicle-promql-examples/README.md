# Chronicle PromQL examples bounty

Prepared for Chronicle bounty #1: add at least 10 PromQL examples to `docs/API.md`.

## Status

- Official reward: **$25**, paid through GitHub Sponsors or PayPal within 7 days of merge.
- Public claim/PR search at 2026-09-23 04:27 UTC found no competing work for bounty #1.
- Automated attempt to create the required claim issue returned GitHub **403**. It was not retried.
- No upstream PR has been opened.
- AI assistance was used to draft and cross-check the documentation.

## Proposed change

`PROPOSED_API.md` is a complete replacement copy of upstream `docs/API.md` at blob
`6007374156e2784395d1b2476ccd1ee163b90bdd`, with a new “PromQL examples”
section placed after the range-query endpoint.

The section contains 15 expressions plus instant- and range-query curl commands.
Every syntax form is grounded in Chronicle's current `promql.go` parser and
`promql_test.go` coverage: equality/inequality and regex matchers, range
selectors, supported aggregations, grouping, `@`, and `offset`.

## Submission blocker

A human must open a single claim issue in `josedab/chronicle` before work is
eligible. Suggested title: `Bounty #1 claim: Add PromQL query examples`.

Suggested body:

> I'd like to work on Bounty #1, “Add PromQL query examples,” from
> `docs/BOUNTY_PROGRAM.md`. I plan to add at least 10 focused, copyable PromQL
> examples to `docs/API.md`. Payout preference: PayPal; payment details will be
> shared privately after acceptance. AI assistance was used, with repository
> sources used to verify the documentation.

After the claim is accepted, create/fork `domcelabas-design/chronicle`, copy
`PROPOSED_API.md` to `docs/API.md`, review the diff, and open a focused PR.
