# Hotel Hold V1

## Founder-approved meaning

`Hold` is a private Hotel decision state for a pending Application.

It means the Hotel is interested, but is not ready to Accept or Decline yet.

## V1 rules

- Hold is Hotel-only. The creator is not notified and does not receive a new creator-facing status.
- Hold does not create a Collaboration.
- Hold does not reserve campaign capacity, stay capacity, a room, or any other inventory.
- Hold has no timer and does not expire automatically.
- Hold is reversible back to ordinary pending review.
- A held Application can later be Accepted or Declined.
- Accepting or Declining clears any Hotel-side Hold state.
- Hold is valid only while the Application is genuinely pending. Already-approved or declined Applications remain non-holdable.

## Mockup boundary

The Hotel mockup stores Hold browser-locally only to exercise the approved product behavior. This does not claim production/backend support. Canonical backend support is a separate architecture capability request.
