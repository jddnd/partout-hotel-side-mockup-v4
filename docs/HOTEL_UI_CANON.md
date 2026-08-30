# Partout Hotel UI Canon — Foundation

Status: **foundation / calibration**, not final owner sign-off.

## Source direction

The owner screenshots define six desktop surfaces: Today, Applications, Campaigns, Profile review, Messages and Insights. They share a persistent Hotel shell and a compact premium hospitality visual language.

## Desktop calibration

- The supplied owner artboards are approximately 2:1. Visual proof uses `1600×800` as the primary proportion check and `1440×720` as a secondary desktop check. This is a fidelity calibration choice, not a claim that production supports only those viewport sizes.
- Persistent dark forest Hotel sidebar: approximately 15% of the owner artboard; the current implementation calibrates at 240px on large desktop.
- Warm canvas rather than pure gray.
- Main page padding: approximately 28–32px at the calibration viewports.
- The owner reference is vertically more generous than a generic dense dashboard: KPI cards, navigation rows and operational rows need enough height for people and status to remain legible at a glance.
- Borders provide separation; shadows remain nearly invisible.
- Card radii approximately 6–8px.
- Controls approximately 32–40px high depending on hierarchy.

## Today geometry

- Four KPI cards occupy one uninterrupted row.
- The operational row is intentionally asymmetric: Arrivals is roughly 35%, Needs action roughly 22%, Stay timeline roughly 43%.
- Creator rows use square visual identity rather than anonymous circular initials.
- Arrivals reads horizontally as creator → arrival timing → dates → status.
- Stay timeline rows align creator identity with a neutral base track, green confirmed period and a single current-day marker.
- Quick actions stay inside the Needs action card; `Create campaign` is the only filled action.

## Typography

- Editorial serif for page titles and selected entity names.
- Neutral sans serif for operational UI, metrics and controls.
- Prefer regular/medium weights; information hierarchy comes from scale and position rather than heavy bold.

## Brand palette

- Forest: `#08372D`
- Action green: `#075943`
- Canvas: `#FBFAF8`
- Surface: `#FFFFFF`
- Border: `#E6E6E1`
- Text: `#17201C`
- Muted text: `#69706B`

## Interaction hierarchy

1. Filled forest/action-green controls = primary decisions/actions.
2. White bordered controls = secondary actions.
3. Quiet text controls = navigation/supporting actions.
4. Destructive decisions should not become visually dominant merely because they are destructive.

## Photography

Creator and hotel imagery is identity infrastructure, not decoration. The public mockup currently uses deterministic visual placeholders rather than embedding private owner-reference imagery. When approved mock assets are introduced they should have canonical URLs/sizes and explicit dimensions to prevent layout shift.

## Responsive rule

The supplied owner references are desktop references. Desktop fidelity is calibrated first. Tablet/mobile behavior must preserve tasks and accessibility but should not be presented as owner-approved until separately reviewed.
