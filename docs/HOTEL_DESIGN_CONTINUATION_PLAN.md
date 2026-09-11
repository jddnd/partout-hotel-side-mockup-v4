# Partout Hotel — Design Continuation Plan

## Purpose

This plan governs continued design work in `review/hotel-mockup-v4`.

The current Hotel mockup is the design baseline. It is **not** a blank-slate concept and must not be treated as an invitation to reinvent the Hotel product from scratch.

The working principle is:

> **Continue, refine, validate and extend the existing mockup. Do not reopen settled design decisions unless Estelle explicitly asks to.**

`jddnd/curated-stay-craft` remains the read-only source of truth for what the real Partout product currently supports.

---

## 1. Default posture

When Estelle asks to work on a Hotel surface, begin from the existing implementation on `review/hotel-mockup-v4`.

Do not start by asking what the page should be from first principles when the mockup has already answered that question.

Instead ask internally:

- What already works in this exact surface?
- What is Estelle asking to change?
- Is that change local, shared-pattern or global-system?
- Is it purely visual, based on an existing Partout capability, or proposing new capability?
- What must remain unchanged to preserve the existing design intent?

The current navigation, page hierarchy, visual character and interaction language are presumed intentional until Estelle says otherwise.

---

## 2. Working loop

Use this loop for normal design work:

```text
Estelle gives visual/product feedback
        ↓
Inspect the current mockup implementation
        ↓
Classify visual scope: LOCAL / SHARED_PATTERN / GLOBAL_SYSTEM
        ↓
If behavior/data is involved, verify curated-stay-craft read-only
        ↓
Classify capability: A / B / C
        ↓
Implement only in the Hotel mockup
        ↓
Commit/push to the design branch
        ↓
Review the Netlify result in browser
        ↓
Refine or restore previous version based on Estelle's feedback
```

Estelle should not need to manage React, TanStack, Tailwind, routing, commits or Git mechanics herself.

---

## 3. Capability classification

### A — Visual-only change

Examples:

- spacing
- typography
- card sizing
- hierarchy
- images
- navigation presentation
- layout
- interaction presentation

Implement freely in the mockup.

### B — Existing Partout capability

If the design uses real status, data, relationship or behavior, inspect the relevant current implementation in `jddnd/curated-stay-craft` before assuming anything.

When verified, say plainly:

> **This already exists in Partout.**

Then use that real product behavior as the basis for the mockup.

### C — New or changed Partout capability

The mockup may still prototype the experience.

Say plainly:

> **We can design this, but Partout does not fully support it yet. Something new is required behind the design.**

Do not modify the production app, Supabase, schema, RLS, authentication, APIs, Edge Functions or deployment architecture from this design workflow.

Prepare a bounded `DESIGN_CAPABILITY_REQUEST — ESTELLE` handoff when the gap is real and worth escalating.

---

## 4. Preserve the existing design system

The current Hotel mockup already establishes a coherent design direction.

Do not casually replace it with a new design concept.

Preserve unless Estelle explicitly changes them:

- the existing Hotel workspace structure;
- current page composition and information hierarchy;
- calm, hospitality-led visual character;
- established typography and spacing relationships;
- creator-first relationship presentation;
- existing card, tab, status, context-panel and action patterns;
- current interaction language.

When feedback affects a repeated pattern, change the highest correct shared layer instead of patching only the screen that happened to be open.

---

## 5. Page work means refinement, not reinvention

When Estelle says:

> “I want to work on Campaigns.”

that means:

1. open the current Campaigns design;
2. understand what is already there;
3. preserve the parts that already work;
4. change only the parts Estelle wants to explore or the directly related parts needed for coherence;
5. verify any non-visual behavior against `curated-stay-craft`;
6. show the result in the existing design system.

Apply the same rule to Today, Applications, Creator review, Stays, Messages, Insights and Settings.

Do not automatically turn page work into an information-architecture exercise or product reset.

---

## 6. Experiments and reversibility

Small and normal iterations stay on:

`review/hotel-mockup-v4`

For a materially different experiment that should be compared against the current design, create a short-lived branch from the review branch, for example:

`design/campaigns-v2`

This allows Estelle to say:

- “Try this.”
- “I prefer the old version.”
- “Keep this version.”

without losing the prior design.

Do not create extra branches for every small visual adjustment.

---

## 7. Browser review is the design proof

A change is not complete because the code compiles.

The primary proof is the rendered Hotel experience in the browser/Netlify preview.

Review the affected surface for:

- visual hierarchy;
- clarity;
- spacing and rhythm;
- consistency with the rest of Hotel;
- whether the next action is understandable;
- whether the experience still feels human and hospitality-led;
- responsive behavior where relevant.

For shared/global changes, review representative affected Hotel surfaces rather than only the originating screen.

---

## 8. Settled decisions remain settled

Do not reopen existing decisions merely because another solution is technically possible.

A previously settled decision may be revisited only when:

- Estelle explicitly asks to revisit it;
- a new design request genuinely conflicts with it;
- current `curated-stay-craft` truth shows the mockup is representing product behavior incorrectly;
- or a shared/global change necessarily affects it.

Otherwise, build forward from the current baseline.

---

## 9. Technical boundary

Normal Hotel design work may change only the mockup repository.

Treat `jddnd/curated-stay-craft` as read-only product truth.

Do not modify as part of this workflow:

- Supabase;
- database schema;
- RLS/security policies;
- authentication;
- APIs;
- Edge Functions;
- production;
- deployment architecture;
- real Partout application code.

If the design reveals a genuine product gap, document and escalate the gap instead of implementing it from the design workspace.

---

## 10. Definition of a good design iteration

A Hotel design iteration is complete when:

- it starts from the current mockup rather than a blank slate;
- Estelle's requested experience is visible in the browser;
- existing successful design decisions are preserved unless intentionally changed;
- visual scope is handled at the correct local/shared/global level;
- real Partout behavior is verified when needed;
- new capability is clearly separated from existing capability;
- no production/backend architecture was changed;
- and the previous design can be recovered if Estelle changes direction.

The operating principle remains:

> **Human in front. System behind.**

Estelle owns the experience. ChatGPT handles the technical implementation and system-awareness behind it.