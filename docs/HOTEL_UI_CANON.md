# Hotel UI Canon

This document records the visual and product rules that should remain stable while the Hotel-side mockup evolves.

## Workspace context

- The Hotel workspace is already scoped to the hotel/property selected in the Hotel shell.
- Do not repeat that context inside individual Hotel pages with an `All hotels` filter or a `Hotel / Brand` table column.
- Multi-property or cross-hotel controls belong in an Admin or portfolio-management context, not the ordinary Hotel workspace.
- Page content should answer what the currently selected hotel needs to do, decide, run or understand.

## Visual character

- Calm, hospitality-led and editorial rather than dashboard-heavy.
- Use the dark forest Hotel sidebar as the stable navigation anchor.
- Main surfaces use light canvas, white cards, restrained borders and soft shadows.
- Prefer compact operational information over oversized analytics chrome.
- Typography should preserve the existing display/body contrast and avoid dense enterprise-table styling.
- Compact status/navigation tabs use a 28px control height; page-level primary actions use 32px so navigation remains visually subordinate to action.

## Decision surfaces

- Applications are a decision queue, not a generic CRM list.
- Creator review should expose enough audience, social and relationship context to make a human decision without turning the creator into a scorecard.
- Fit score, audience quality and engagement are supporting evidence, not the relationship itself.
- Accept / Hold / Decline remain the primary decision actions.

## Campaigns

- Campaigns belong to the current hotel context; do not restate the hotel on every row.
- Campaign list priorities are campaign identity, dates, status, agreed content, participating talent, expected/observed outcomes and progress.
- Status navigation should be immediately legible; the active status uses a filled Partout action treatment.
- Create campaign is the primary page action.

## Messages

- Messaging is a collaboration workspace, not a standalone generic inbox.
- Keep creator identity and collaboration state visible while reading the conversation.
- The right context rail should surface the current campaign, stay logistics and agreed-content progress so hotel staff do not need to leave the conversation for basic operational context.
- Tracking agreed content means tracking what was promised/published; it must not introduce a deliverable approval workflow.
- Conversation tabs follow the compact 28px navigation-control rule while composer send/actions remain 32px controls where appropriate.

## Insights

- Insights should answer what the hotel achieved and what is worth acting on; it should not become a generic chart wall.
- Keep outcomes such as bookings and EMV visible alongside reach and engagement rather than treating attention metrics as the end goal.
- Audience, campaign and content modules should use compact comparative views with clear labels and restrained decoration.
- The `So what?` area translates measurements into a few useful observations. It is part of the decision-support layer, not an always-on AI persona.
- Insight tabs use the 28px navigation-control rule; period and export controls remain 32px page controls.

## Imagery

- Mockups may use deterministic placeholders when owner-supplied or licensed creator/hotel imagery is not available.
- Placeholder imagery must preserve composition and hierarchy without pretending to be production assets.

## Responsive behavior

- Desktop is the primary owner-review surface.
- Preserve the Hotel sidebar on desktop; allow content surfaces to scroll horizontally only when a dense table cannot responsibly collapse.
- Avoid reducing text or controls below usable sizes merely to force every column into a narrow viewport.
