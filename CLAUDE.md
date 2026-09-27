# Portfolio — branch protocol

## Company-tailored portfolios

This repo ships a different portfolio per company being applied to, via long-lived git branches — not a single file trying to serve every target.

- **`main`** — the standard default portfolio. (As of 2026-09-27, `main`'s `index.html` still carries ZenSpace/ZenAI-specific pitch copy inherited from before this protocol existed; genericizing it into a real company-agnostic default, inspired by braydoncoyer.dev, is a tracked follow-up, not done yet.)
- **`company/<slug>`** — a permanent, tailored variant for one company's application: brand colors, resume, copy rewritten toward that company. Branch off `main` when starting a new company's pitch.
  - Slug format: lowercase, hyphenated — `company/coca-cola`, not `company/CocaCola`.
  - Existing: `company/zenspace` (branched 2026-09-27 from main commit `5a47866`, snapshotting the ZenSpace-tailored content as-is).

**Company branches are never merged back into `main`.** Generic improvements — new pages, structural changes, anything useful across every variant — land on `main` first (via the normal feature-branch → PR → merge flow). Company branches don't automatically inherit `main`'s later changes; pull in what's needed manually (cherry-pick or rebuild) if a generic improvement should also apply to an active company branch.

See root `/Users/munish/CLAUDE.md` for the general git workflow (feature branches, PR conventions, commit style) — that applies here too, on top of the company-branch structure above.
