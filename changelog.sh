#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:-Unreleased}"
TAG="$(git describe --tags --abbrev=0 2>/dev/null || true)"
RANGE="HEAD"
if [[ -n "$TAG" ]]; then
  RANGE="$TAG..HEAD"
fi

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

git log --no-merges --format='%H%x09%s' "$RANGE" > "$TMP"

if [[ ! -s "$TMP" ]]; then
  echo "No commits found for $VERSION (range: ${RANGE})." >&2
  exit 0
fi

printf '# %s\n\n' "$VERSION"

for category in Added Fixed Changed Removed; do
  entries=""
  while IFS=$'\t' read -r sha subject; do
    [[ -z "$subject" ]] && continue
    lower="${subject,,}"
    type=""
    case "$lower" in
      add:*|added:*|feat:*|feature:*) type="Added" ;;
      fix:*|fixed:*|bugfix:*|bug:*) type="Fixed" ;;
      remove:*|removed:*|delete:*|deleted:*) type="Removed" ;;
      change:*|changed:*|update:*|updated:*|refactor:*|perf:*|docs:*|chore:*|style:*|test:*|build:*|ci:*) type="Changed" ;;
    esac
    if [[ "$type" == "$category" ]]; then
      clean="${subject#*:}"
      clean="${clean# }"
      entries+="- ${clean} (${sha:0:7})\n"
    fi
  done < "$TMP"

  if [[ -n "$entries" ]]; then
    printf '## %s\n\n' "$category"
    printf '%b\n' "$entries"
  fi
done

uncategorized=""
while IFS=$'\t' read -r sha subject; do
  [[ -z "$subject" ]] && continue
  lower="${subject,,}"
  case "$lower" in
    add:*|added:*|feat:*|feature:*|fix:*|fixed:*|bugfix:*|bug:*|remove:*|removed:*|delete:*|deleted:*|change:*|changed:*|update:*|updated:*|refactor:*|perf:*|docs:*|chore:*|style:*|test:*|build:*|ci:*) ;;
    *) uncategorized+="- ${subject} (${sha:0:7})\n" ;;
  esac
done < "$TMP"

if [[ -n "$uncategorized" ]]; then
  printf '## Changed\n\n%b\n' "$uncategorized"
fi
