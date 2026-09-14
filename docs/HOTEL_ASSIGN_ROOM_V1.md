# Hotel Assign room V1

## Founder-approved meaning

`Assign room` records a simple Hotel-provided room reference on an existing Stay.

Examples: `Sea View 214`, `Harbour 118`, `Spa Suite 305`.

## V1 rules

- The Hotel chooses an existing Stay and sets or updates its room reference.
- The value is operational Stay context only.
- The room reference follows that Stay wherever the Hotel workspace already displays the Stay room.
- An empty room reference is not saved.
- No Room entity, room catalog, inventory state, availability calculation or reservation is created.
- No booking, PMS, rate, room-type, waitlist or capacity behavior is implied.
- Changing a room reference does not change the Collaboration, Campaign, creator relationship or Stay dates/status.

## Mockup boundary

The Hotel mock persists room-reference updates browser-locally. This demonstrates the approved Hotel workflow only; it does not claim that the production Partout backend currently exposes a canonical room-assignment write path.
