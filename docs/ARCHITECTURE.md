# Hotel UI Architecture

## Intent

The mockup is production-shaped: visual work can evolve quickly without forcing a rewrite when real Partout data is connected later.

## Dependency direction

Routes -> Hotel features -> Entity/shared UI -> utilities.

Visual components do not call Supabase or production APIs. Data enters feature components through route loaders/adapters or mock-data modules.

## Component layers

1. **UI primitives** — Button, badge, tabs, progress, menu. No Partout domain knowledge.
2. **Entity components** — creator, campaign, stay and hotel representations used across multiple features.
3. **Feature components** — application queue, shortlist, campaign table, stay timeline, conversation context.
4. **Pages** — composition only. Pages coordinate features; they should not become large all-purpose components.

## Feature ownership

Keep a component in its feature until there is proven cross-feature reuse. Do not create a generic shared abstraction merely because two components look similar.

## Routing and splitting

Each top-level Hotel domain is a TanStack file route and therefore a natural code-splitting boundary. Heavy dependencies must stay route-local. Recharts will be introduced only when Insights is implemented.

## State

- Server/remote data: route loader or query/data layer.
- URL state: filters, tabs and sort values that users should be able to link to or revisit.
- Local UI state: component-local.
- Global client state: only for genuinely global client concerns such as active-property context when it cannot be derived from the route/session.

## Styling

Tailwind v4 consumes semantic Partout tokens from `src/styles/app.css`. Arbitrary values are allowed only for deliberate fidelity details that are not reusable tokens.

## Non-negotiables

- No production credentials or private production data.
- No backend access from presentational components.
- No giant universal cards with dozens of conditionals.
- No app-wide store for server data.
- No eager import of route-specific heavy libraries.
- No broad refactor while matching an owner-approved screen.
