# Partout Hotel UI Canon — Foundation

Status: **Today calibration implemented; owner visual sign-off still required.**

## Source direction

The owner screenshots define six desktop surfaces: Today, Applications, Campaigns, Profile review, Messages and Insights. They share a persistent Hotel shell and a compact premium hospitality visual language.

## Desktop calibration

The isolated Today owner reference is the current calibration surface. Measurements are reconstructed from the supplied raster rather than treated as original design-file values.

- Persistent dark forest Hotel sidebar: target **232px** at standard desktop width.
- Warm near-white canvas (`#FBFAF8`) rather than a cool SaaS gray.
- Main page padding: approximately **24–32px**.
- Dense cards and rows; avoid oversized SaaS spacing.
- Borders provide separation; shadows remain nearly invisible.
- Card radii approximately **6–8px**.
- Controls approximately **32–36px** high.
- Today uses a four-card KPI row followed by a **4 / 3 / 5** twelve-column operations grid.
- The three operations panels align to one row height on wide desktop.

## Today fidelity rules

- KPI icons are visually free-standing; do not put every icon inside a generic circular badge.
- Arrivals are scanned horizontally: creator identity, relative arrival, date range, then confirmation state.
- Creator identity uses compact rounded-square imagery rather than generic circular SaaS avatars.
- Needs action keeps task counts prominent and retains the `View all tasks` bridge before quick actions.
- Stay timeline uses a neutral baseline plus the active green stay segment, a current-day marker, and the Confirmed / Upcoming / Checked out legend.
- The sidebar hotel identity is integrated directly into the rail rather than enclosed in a second card.

## Typography

- Editorial serif for page titles and selected entity names.
- Neutral sans serif for operational UI, metrics and controls.
- Prefer regular/medium weights; information hierarchy comes from scale and position rather than heavy bold.
- The `partout` sidebar wordmark remains sans serif in this prototype; it should not inherit the editorial page-title font.

## Brand palette

- Forest: `#08372D`
- Action green: `#075943`
- Canvas: `#FBFAF8`
- Surface: `#FFFFFF`
- Border: `#E6E6E1`
- Text: `#17201C`
- Muted text: `#69706B`

## Interaction hierarchy

1. Filled action-green controls = primary decisions/actions.
2. White bordered controls = secondary actions.
3. Quiet text controls = navigation/supporting actions.
4. Destructive decisions should not become visually dominant merely because they are destructive.

## Photography

Creator and hotel imagery is identity infrastructure, not decoration. The current foundation uses lightweight deterministic placeholders so the public mockup does not embed the supplied raster or private assets. When approved real assets are introduced they should have canonical URLs/sizes and explicit dimensions to prevent layout shift.

## Responsive rule

The supplied owner references are desktop references. Desktop fidelity is calibrated first. Tablet/mobile behavior must preserve tasks and accessibility but should not be presented as owner-approved until separately reviewed.
