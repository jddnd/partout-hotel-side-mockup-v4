# Hotel Mockup Performance Budget

These are engineering gates, not claims about current measured performance. Record real measurements as routes mature.

## Loading strategy

- Keep the Hotel shell small and persistent.
- Let TanStack route boundaries split Today, Applications, Campaigns, Stays, Messages and Insights.
- Do not import chart libraries before Insights requires them.
- Prefer server/route loading for initial useful data when the real backend is connected.
- Render useful shell/content before secondary data where possible.

## Budget targets

- No route may import another feature's page bundle merely for a small shared primitive.
- No uncompressed original photography in initial route payloads.
- Above-the-fold images must have explicit dimensions and appropriately sized sources.
- Below-the-fold media should lazy load.
- Avoid adding a dependency when the same behavior can be achieved with platform APIs or an existing dependency.
- Long lists should be measured before virtualization is introduced.
- Memoization is evidence-driven, not automatic.

## Verification for material UI slices

Run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

For deployed previews also inspect the network waterfall, route chunks, image transfer sizes, LCP, CLS and INP before calling a performance-sensitive slice complete.
