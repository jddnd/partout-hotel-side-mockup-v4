# HOTEL BACKEND AUDIT V1 — DECISION GUARD

This companion note exists to make one rule impossible to miss:

**The audit classifies truth. It does not itself authorize product changes.**

A row marked `GROUNDED` means the real backend can support that approved Hotel capability. It does not authorize changing the approved mock to mirror the current production UI.

A row marked `MOCK-ONLY / BACKEND GAP` means the approved Hotel behavior may remain in the mock while backend work is planned. It does not authorize pretending production support exists.

A row marked `FOUNDER DECISION REQUIRED` must remain unchanged until the founder explicitly approves the behavior/wording/destination.
