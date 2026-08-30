# Partout Hotel Side Mockup v4

Production-shaped React/TanStack Start/Tailwind prototype for the Partout Hotel workspace.

## Foundation goal

Turn the new owner Hotel-side references into implementation-ready mockups without creating throwaway UI or a monolithic React codebase. The first calibration slice is **Today**; the remaining Hotel routes are intentionally scaffolded behind the same shell.

## Stack

- React 19
- TanStack Start + Router
- TypeScript strict mode
- Tailwind CSS v4 through the first-party Vite plugin
- Lucide icons
- CVA + clsx + tailwind-merge for controlled component variants
- Vitest + Testing Library
- Netlify TanStack Start Vite integration

## Architecture

```text
src/
├── routes/            # thin route boundaries / code splitting
├── hotel/             # Hotel feature ownership
│   ├── shell/
│   └── today/
├── components/ui/     # domain-free primitives
├── data/mock/         # prototype data only
├── lib/               # small framework-agnostic helpers
└── styles/            # Tailwind v4 semantic design tokens
```

See `docs/ARCHITECTURE.md`, `docs/HOTEL_UI_CANON.md`, and `docs/PERFORMANCE_BUDGET.md` before broadening the UI.

## Local development

```bash
npm install
npm run dev
```

Quality gate:

```bash
npm run check
```

## Public-repository rule

Assume everything committed here is public. Never commit production credentials, OAuth secrets, service-role keys, private creator information, or production hotel operational data.

## Branching

Keep `main` reviewable. Material UI work should use focused feature/design branches and pull requests.
