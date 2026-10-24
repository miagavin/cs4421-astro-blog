# Contributing

## Workflow (GitHub Flow)
1. Create or pick an issue (user story + Given/When/Then acceptance criteria).
2. Branch from `main`: `<issue-number>-<short-slug>`.
3. Commit small and often using Conventional Commits: `type(scope): description`.
4. Open a pull request that says `Fixes #<issue>`.
5. CI must be green. Merge with a **merge commit** after review.

## Definition of Done
- [ ] Code authored on a feature branch
- [ ] `npm run lint`, `npm run check` and `npm run test:unit` pass locally
- [ ] Pull request reviewed
- [ ] Merged cleanly into `main`

## Commit types
`feat`, `fix`, `docs`, `chore`, `test`, `ci`, `refactor`