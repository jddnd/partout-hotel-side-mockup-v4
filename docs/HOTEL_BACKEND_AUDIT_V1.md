# HOTEL BACKEND AUDIT V1

**Status:** FOUNDER-APPROVED AUDIT BASELINE  
**Date:** 2026-09-14  
**Hotel mock baseline:** `jddnd/partout-hotel-side-mockup-v4` @ `bfb141b9bb2077a961851859f2e79a477da7f997`  
**Real backend baseline:** `jddnd/curated-stay-craft` @ `0298a15dd48473a29a8aba84b5f58d1da4af9354`

## Purpose

This document keeps the approved Hotel experience and the real Partout backend honest with each other.

The Hotel mock defines the approved Hotel-side experience. The real backend defines what Partout can actually read, write and enforce today. Neither side may silently redesign the other.

For every visible Hotel capability, classify it as one of:

- **GROUNDED** — the real backend already has the required domain/read/write path.
- **MOCK-ONLY / BACKEND GAP** — the approved mock is intentionally ahead of the backend.
- **PROTOTYPE / PARTIAL** — the experience is useful and truthful as a prototype, but only part of it is backed by live Partout data today.
- **FOUNDER DECISION REQUIRED** — the visible product promise exists, but its intended behavior is not yet agreed.

## Operating rule

Do not remove, hide, replace, relabel, reinterpret or invent Hotel behavior/data to make the mock fit the backend.

Do not add backend-supported fields or workflows to the mock merely because they exist in the schema.

When the mock is ahead, preserve the approved experience and record the backend gap. When the backend exposes a constraint that the approved mock must eventually respect, close that truth gap as a separate bounded slice.

---

## Surface audit

| Surface / capability | Classification | Real backend truth | Hotel mock consequence |
|---|---|---|---|
| Campaign list/detail | **GROUNDED** | Campaign, Campaign Window, Application and Collaboration reads exist. Hotel runtime already reads Campaign data and Collaboration-linked content. | Keep current Campaign-first Hotel experience. Do not reintroduce legacy Deal-first concepts. |
| Create Campaign — title/description | **GROUNDED** | Real Campaign create path writes title, occasion and description. | Current Basics step is valid. |
| Create Campaign — stay dates / spots | **GROUNDED** | `campaign_windows` carries stay start/end and capacity; real Hotel creation validates the window. | Current Stay step is valid; mock must not allow invalid date windows. |
| Create Campaign — agreed content | **GROUNDED** | Campaign `deliverable_requirements` / canonical Content Expectations capture platform, format and quantity. Real publish gate requires at least one requirement. | Current Content step is valid; zero total agreed content must not create a Campaign. |
| Create Campaign — usage rights | **GROUNDED** | Real Campaign model carries usage-rights terms and canonical content-usage-rights infrastructure exists. | Current Usage rights choice is valid. Do not add extra rights complexity unless approved. |
| Create Campaign — exchange / compensation | **GROUNDED** | Real Campaign model carries compensation type/amount/currency/notes; production publish requires compensation terms. | Current simple `Hosted stay` / `Hosted stay + fee` / `Paid collaboration` UX can remain the approved abstraction, but it must map truthfully when production-integrated. |
| Create Campaign — five-step flow | **GROUNDED** | Real Hotel flow is Basics → Stay slots → Inclusions & Terms → Agreed content → Review. | Current Basics → Stay → Terms → Content → Review is structurally aligned. Do not redesign for backend parity. |
| Application review | **GROUNDED** | Hotel can read pending Applications and applicant/creator context. | Keep Applications as a human decision queue. |
| Accept Application | **GROUNDED** | Canonical `approve_campaign_application` creates committed Collaboration state. | Approved Accept behavior can later use the real RPC. |
| Decline Application | **GROUNDED** | Canonical `decline_campaign_application` exists. | Approved Decline behavior can later use the real RPC. |
| Hold Application | **MOCK-ONLY / BACKEND GAP** | Current backend authority has no Hold system. Pending Application does not reserve capacity. | Keep approved Hold V1 semantics in the mock; do not claim production support. Backend contract required before production integration. |
| Invite talent | **GROUNDED** | Canonical `invite_creator_to_campaign` exists; no Deal/Offer/Conversation prerequisite. | Current Invite talent flow is directionally production-ready. |
| Sent Campaign Invitations | **GROUNDED** | Campaign Invitation read/state exists, including respond-by and terminal states. | Current sent-invitation management is grounded. |
| Cancel pending Campaign Invitation | **GROUNDED** | Canonical `cancel_campaign_invitation` is an authorized Hotel/property action. | Current cancel behavior is grounded. |
| Collaboration | **GROUNDED** | Collaboration is the committed Property + Creator + Campaign relationship and is the canonical participation spine. | Hotel pages should continue treating accepted participation as Collaboration, not resurrect Deal/Offer workflow. |
| Stay operational surface | **GROUNDED CONCEPT** | Collaboration plus Campaign Window provides creator, property, campaign and stay-date context. | Current Stay UX is valid as an operational collaboration view, not a booking/PMS object. |
| Assign room reference | **MOCK-ONLY / BACKEND GAP** | No canonical simple Hotel-owned room-reference field/write path is established. Partout explicitly does not introduce PMS/room inventory. | Keep approved `Assign room = simple reference` mock semantics. Backend contract required; do not create Room/PMS concepts. |
| Agreed content plan | **GROUNDED** | Canonical `content_expectations` records immutable agreed platform, format, quantity and due date/provenance. | Hotel may show what was agreed. |
| Published / observed content progress | **GROUNDED** | Content association / observation / metrics infrastructure exists and Hotel reporting already reads Collaboration-linked content. | Hotel may show promised versus published/observed progress. |
| Deliverable approval/rejection queue | **NOT PART OF PRODUCT** | Canonical Content model deliberately has no Hotel approval/rejection/revision state. | Do not introduce submit-for-approval, approve, reject or changes-requested workflow. |
| Relationship | **GROUNDED** | Relationship persists across Collaborations; history compounds rather than resetting. | Keep creator relationship continuity visible beyond a single Stay/Campaign. |
| Messages | **GROUNDED** | Relationship conversation infrastructure and `send_relationship_message` are canonical. | Current relationship-first Messages direction is production-aligned. |
| Hotel profile | **GROUNDED** | Real property profile read/edit path exists. | Current Hotel profile surface is grounded. |
| Hotel Gallery | **GROUNDED** | Durable Hotel-owned gallery rows/storage policies exist. | Current Gallery surface is grounded. |
| Account settings | **GROUNDED ROUTE** | Real Hotel settings include an Account route. | Keep current Settings V1 scope; do not invent generic SaaS settings. |
| Insights — Campaign/content performance | **PROTOTYPE / PARTIAL** | Real campaign reporting, connected-content metrics, tracking links and canonical campaign metrics exist. | Current Campaign/Content Insights direction is grounded, but mock figures remain prototype data until wired. |
| Insights — audience | **PROTOTYPE / PARTIAL** | Creator/audience evidence exists in parts of the real product, but the mock aggregate experience is not yet fully mapped to one production read model. | Keep as prototype; production mapping must be audited field-by-field before wiring. |
| Insights — bookings | **PROTOTYPE / PARTIAL** | Tracking/conversion attribution foundations exist, but Hotel-side booking attribution integration is not complete. | Keep the explicit prototype disclosure. Do not present mock booking figures as live Partout truth. |
| Today — Applications need review | **GROUNDED** | Pending Applications are a real Hotel read model. | Existing Today destination is valid. |
| Today — Stays check-in today | **GROUNDED CONCEPT** | Collaboration + Campaign Window dates support arrival/departure context. | Existing Stays destination is valid. |
| Today — Underperforming campaign | **PROTOTYPE / PARTIAL** | Real campaign/content metrics exist, but the mock alert threshold/observation is not yet a locked production rule. | Keep route to Campaign Insights; do not pretend the alert calculation is canonical until defined. |
| Today — Campaign deliverable due | **FOUNDER DECISION REQUIRED** | Backend truth is agreed Content Expectations versus observed/published content; no Deliverable approval-task workflow. | Leave visible but unwired until founder approves its exact meaning and wording. |
| Today — View all tasks | **FOUNDER DECISION REQUIRED** | No canonical Hotel Tasks domain is established. | Leave visible but unwired until founder decides whether a Tasks concept belongs in Partout at all. |

---

## Immediate convergence plan

### 1. Campaign creation truth parity

Keep the approved five-step mock experience. Add only the real creation constraints needed to stop the mock from demonstrating impossible Campaigns:

- valid stay date window;
- at least one agreed content item in total;
- usage rights selected;
- exchange/compensation selected.

Do **not** automatically expose every real backend Campaign field. This slice is validation parity, not a redesign.

### 2. Hold V1 backend contract

Backend architecture work is required before production integration.

Locked product meaning:

- Hold means: Hotel is interested but not ready to decide;
- Hotel-only;
- Creator remains pending and receives no new status/notification;
- no Collaboration;
- no capacity/room/inventory reservation;
- no timer/waitlist semantics;
- reversible back to normal pending;
- later Accept or Decline remains possible.

### 3. Room reference V1 backend contract

Backend architecture work is required before production integration.

Locked product meaning:

- a simple Hotel-provided reference on an existing Stay/Collaboration context, e.g. `Room 312`;
- no Room entity;
- no PMS;
- no inventory/availability semantics;
- no booking object.

### 4. Founder decisions for Today

Discuss before changing code:

- what `Campaign deliverable due` should mean in the planned-vs-observed Content model;
- whether `View all tasks` represents a real Partout product concept or should ultimately be replaced/removed only after explicit founder approval.

### 5. Production implementation map

After mock truth and backend contracts converge, map approved Hotel surfaces to real reads/writes in small slices:

1. Campaigns
2. Applications
3. Campaign Invitations
4. Collaboration / Stay
5. Messages / Relationship
6. Hotel Profile / Gallery / Account
7. Insights

The mock remains the approved UX reference. Production integration must not use the legacy production UI as permission to redesign the approved Hotel experience.

### 6. Shared-test Hotel journey proof

Final convergence gate:

```text
Hotel creates Campaign
→ Creator applies
→ Hotel reviews Application
→ Hotel accepts
→ Collaboration / Stay exists
→ Hotel messages Creator
→ agreed Content is visible
→ observed/published Content progresses
→ Hotel completes Collaboration
→ Relationship/history remains
```

Add Hold and room reference to the proof only after their backend contracts exist.

---

## Known non-goals

This audit does **not** authorize:

- direct Supabase wiring in the mock;
- redesign of approved Hotel pages;
- adding/removing/relabeling visible controls without founder approval;
- a Deliverable approval process;
- a generic Tasks system;
- Room inventory/PMS/booking management;
- production database changes;
- backend changes from the Hotel mock repository.

Any backend gap must be handed to `jddnd/curated-stay-craft` as its own architecture/implementation slice.