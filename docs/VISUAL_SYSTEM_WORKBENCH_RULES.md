# Partout Hotel — visual system workbench rules

This document protects the Hotel mockup from becoming a collection of independently styled screens while Estelle iterates freely.

It applies to all visual work on `review/hotel-mockup-v4`.

Read it together with:
- `docs/HOTEL_UI_CANON.md`
- `docs/ESTELLE_HOTEL_WORKFLOW.md`

## Core rule

> **A request that is given while looking at one screen is not automatically a one-screen change.**

Before implementing a material visual change, determine whether the intended rule is:

1. `LOCAL` — intentionally specific to this screen/state;
2. `SHARED_PATTERN` — applies to a reusable family of components/interactions;
3. `GLOBAL_SYSTEM` — changes the visual grammar of the Hotel experience.

Do not patch only the screen where feedback was given when the design intent is shared or global.

Do not change a global rule merely to solve a legitimate local exception.

## LOCAL

Use only when the reason is genuinely specific to one surface or state.

Examples:
- a unique creator-profile information block needs more vertical room;
- one empty state uses a special illustration;
- content on one page has a justified density exception.

Keep the exception close to the surface and do not turn it into a global token or shared variant unless the need actually recurs.

## SHARED_PATTERN

Use when the design decision belongs to a family of surfaces/components.

Examples:
- compact status tabs should use one common height and active treatment;
- creator identity cards should share the same anatomy wherever that pattern appears;
- context rails should use one common spacing and heading grammar;
- repeated action groups should use the same control hierarchy.

Change the shared component/pattern/contract first, then inspect all known consumers.

## GLOBAL_SYSTEM

Use when the requested change affects the overall Hotel visual language.

Examples:
- typography scale;
- page-title treatment;
- spacing rhythm;
- card radius/border/shadow language;
- primary action sizing;
- shell/sidebar geometry;
- global color/token semantics;
- viewport scaling or breakpoint behavior.

For a global change:

1. identify the canonical source of the rule (`HOTEL_UI_CANON`, tokens/theme, shell, shared component, etc.);
2. change the highest correct shared layer;
3. inventory affected surfaces;
4. remove/reconcile old local overrides that would fight the new rule unless an exception is intentional;
5. render representative affected screens;
6. verify responsive states when relevant;
7. update `docs/HOTEL_UI_CANON.md` when the canonical rule itself changes.

A global change is **not complete** because the screen that triggered the feedback looks correct.

## Representative visual proof

After a `SHARED_PATTERN` or `GLOBAL_SYSTEM` change, review a bounded representative set rather than only the originating route.

Choose the surfaces that exercise the changed rule. Depending on blast radius this may include:
- Hotel shell/navigation;
- list/table page;
- card-heavy page;
- profile/detail page;
- Messages/context-rail page;
- Settings/form page;
- at least one additional supported viewport when responsive/scaling rules are touched.

The goal is not to screenshot every route. The goal is to prove that the shared rule still produces one coherent Hotel product.

## Examples of correct scope

**Feedback:** “The page titles feel too small.”

If this is meant as a Hotel-wide visual correction, treat it as `GLOBAL_SYSTEM`: change the canonical title rule and verify representative pages. Do not edit only Campaigns because Campaigns happened to be open when the feedback was given.

**Feedback:** “These compact tabs are too tall.”

If the same compact-tab pattern appears across Campaigns, Stays, Messages and Insights, treat it as `SHARED_PATTERN` and fix the pattern everywhere it is canonical.

**Feedback:** “The Profile details card is cut off at this viewport.”

If the problem comes from unique content/layout on that surface and the global card rhythm is still correct, treat it as `LOCAL`. Do not reduce every card in the product merely to fix this page.

## Product/backend boundary

Visual scope and product capability are separate decisions.

A change can be globally visual while using only existing product capability. A beautiful mockup can also propose functionality Partout does not yet support.

For behavior, data, status, permissions or persistence, continue to use `jddnd/curated-stay-craft` as source of truth and follow `docs/ESTELLE_HOTEL_WORKFLOW.md` for capability-gap handoff through the Partout coordinator.

## Completion check for Estelle's ChatGPT

Before saying a visual change is finished, answer internally:

- Was the design intent local, shared or global?
- Did I change it at the highest correct layer?
- Did I accidentally create a one-off value/component when a shared rule exists?
- Did I accidentally change a global rule to solve one local exception?
- Which other surfaces consume this rule?
- Did I review a representative proof set after a shared/global change?
- If the canon changed, did I update `HOTEL_UI_CANON.md`?

If those questions cannot be answered, the change is not ready to be called complete.