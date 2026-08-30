# Owner Requirements — Hotel Side

## Current visual references

The supplied owner concept contains six connected Hotel surfaces:

1. Today
2. Applications
3. Campaigns
4. Creator profile review
5. Messages
6. Insights

Settings is visible in the owner navigation but no dedicated Settings artboard was supplied. Its product capability therefore comes from the real Hotel implementation in `jddnd/curated-stay-craft`; this mockup only redesigns that capability into the approved Hotel visual language.

## Shared product intent inferred from the references

- The Hotel side is an operational workspace, not only a reporting dashboard.
- Property identity remains persistent in the left navigation and should support multiple properties later.
- Creator identity and relationship history remain visible across applications, campaigns, stays, messages and results.
- Application review should expose enough context for fast decisions without forcing every creator into a detail page.
- Messages should carry campaign/stay context alongside the conversation.
- Insights should connect performance reporting to useful interpretation rather than only displaying charts.

## Settings capability authority

The current real Hotel Settings implementation establishes the V1 boundary:

1. Hotel profile — Hero, Logo, Name, Location, Description and creator preview.
2. Gallery — Add and Remove photography, maximum six images.
3. Account — read-only email and editable display name.

Team members, notification preferences, stay defaults and invented role/permission controls are deliberately not treated as current Settings capability. Any future addition or removal requires an explicit owner/product reason rather than a generic SaaS assumption.

## Implementation sequence

1. Foundation and Today calibration.
2. Applications queue.
3. Creator profile review.
4. Campaigns.
5. Messages.
6. Insights.
7. Stays and Settings details where owner references are incomplete, grounded in the real product capability where available.
8. Responsive and full state coverage after desktop visual language is approved.

Do not silently invent missing owner requirements. Record inferred behavior separately from explicit screenshot evidence and bring material product choices back for review.
