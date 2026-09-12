# Hotel Insights — capability map

Status: design-workbench reference for `review/hotel-mockup-v4`.

Purpose: preserve the approved Hotel Insights design while making explicit which parts already exist in Partout, which need read-model/UI wiring, and which require new capability behind the design.

This document does not authorize production, database, Supabase, API or `curated-stay-craft` changes.

## Approved surface

The approved Insights composition remains the baseline:

- Overview
- Audience
- Campaigns
- Content
- Bookings
- summary metrics
- Audience module
- Top campaigns
- Top talent
- Content performance
- `So what?`
- period control
- Export

The completion task is connection and drill-down, not redesign.

## Capability classification

| Insight | Classification | Current product truth |
| --- | --- | --- |
| Reporting period/ranges | B — existing | Hotel Activity already supports report ranges. The mockup period control is still fixed presentation data. |
| Export | B — existing | Production Hotel Activity already supports CSV export. The mockup exports its local prototype dataset only. |
| Reach | B — existing | Synced reach exists in the Hotel reporting read model. |
| Campaign performance | B — existing | Hotel reporting already exposes campaign rows, publication counts and synced reach. |
| Creator contribution | B — existing | Hotel reporting already exposes creator rows and publication/reach information. |
| Content performance | B — existing | Hotel reporting already exposes content rows with platform/type and synced metrics. |
| Tracking clicks | B — existing | Collaboration tracking links and report click counts exist. |
| Audience country/age/gender | B foundation / needs wiring | Canonical `audience_observations` exist as provider-observed facts, but the current Hotel report does not yet aggregate them into this Insights view. |
| Creator audience total | B foundation / definition needed | Creator follower counts exist; the product needs a clear aggregation rule across creators/platforms before the headline total is treated as canonical. |
| Engagement rate | C — derived capability decision | Current Hotel Activity truth exposes interaction counts. A percentage requires an approved denominator and derivation rule. |
| Audience quality score | C — product decision | Authenticity-assessment infrastructure exists, but Partout deliberately has no canonical global creator-quality score. The mockup value remains design data until a product decision exists. |
| EMV | B foundation / activation needed | Canonical EMV methodology/configuration/calculation structures exist. Live display requires an approved active methodology and sufficient inputs. |
| Bookings/revenue attribution | C — new/unfinished integration | This is the main capability gap. The approved Bookings experience remains in the mockup, but real Hotel attribution needs a bounded integration/read-model implementation before those values are live. |
| `So what?` observations | A/B initially | The presentation can be fulfilled from deterministic rules over real report data. An AI-generated interpretation layer is not required for V1. |

## Workbench behavior

The mockup may represent the intended complete experience using deterministic prototype data.

Where the real app already supports the behavior, use that behavior as the target.

Where the real app does not yet support it, keep the mockup useful but do not imply that the production capability already exists.

The governing principle remains:

> Human in front. System behind.
