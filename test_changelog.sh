#!/usr/bin/env bash
set -euo pipefail

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

cd "$workdir"
git init -q
git config user.email test@example.com
git config user.name Tester

cp "$OLDPWD/changelog.sh" .
echo one > file.txt
git add .
git commit -qm 'feat: add initial feature'
git tag v1.0.0

echo two >> file.txt
git add .
git commit -qm 'fix: handle empty input'
echo three >> file.txt
git add .
git commit -qm 'refactor: simplify parser'
echo four >> file.txt
git add .
git commit -qm 'remove: obsolete helper'
echo five >> file.txt
git add .
git commit -qm 'Improve docs wording'

output="$(./changelog.sh)"
grep -q '^# Unreleased$' <<< "$output"
grep -q '^## Fixed$' <<< "$output"
grep -q 'handle empty input' <<< "$output"
grep -q 'simplify parser' <<< "$output"
grep -q '^## Removed$' <<< "$output"
grep -q 'obsolete helper' <<< "$output"
grep -q 'Improve docs wording' <<< "$output"

echo 'All changelog generator tests passed.'
