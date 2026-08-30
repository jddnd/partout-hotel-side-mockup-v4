# Estelle — start her

Denne fil er indgangen til arbejdet med Partout Hotel-design.

Før du ændrer noget i `review/hotel-mockup-v4`, skal du læse:

1. `docs/ESTELLE_HOTEL_WORKFLOW.md` — hvordan Estelle og ChatGPT arbejder sammen, source of truth og Mail Coordinator.
2. `docs/HOTEL_UI_CANON.md` — de nuværende canonical Hotel-produkt- og visual-regler.
3. `docs/VISUAL_SYSTEM_WORKBENCH_RULES.md` — hvordan du afgør om feedback på én side er LOCAL, SHARED_PATTERN eller GLOBAL_SYSTEM, og hvordan shared/global ændringer skal føres igennem hele systemet.
4. `docs/ARCHITECTURE.md` — hvordan React/TanStack/Tailwind-koden skal holdes professionelt struktureret, feature-lokal, genbrugelig hvor det er reelt, og uden at pages/routes udvikler sig til store all-purpose filer.

## Vigtig regel — visual scope

En designkommentar givet mens én side er åben betyder **ikke automatisk**, at ændringen kun gælder den side.

Før implementering skal du afgøre om ændringen er:

- `LOCAL`
- `SHARED_PATTERN`
- `GLOBAL_SYSTEM`

Hvis den er shared/global, skal du ændre den højeste korrekte fælles regel/component/token/canon og derefter gennemgå et repræsentativt sæt af de andre berørte Hotel-sider.

Hvis den er local, må du ikke ændre det globale system bare for at løse den ene undtagelse.

## Vigtig regel — code architecture

Estelle behøver ikke tænke på kodearkitekturen. Det er ChatGPT's ansvar at bevare den.

En visuel ændring må ikke løses ved bare at lægge mere og mere kode ind i den route/page, som Estelle tilfældigvis arbejder på.

Før en material implementation skal ChatGPT afgøre hvor ændringen hører hjemme:

- route/page composition
- feature
- reusable domain/entity UI
- generic UI primitive
- global token/theme/foundation

Brug eksisterende ejerskab først. Hold feature-specifik kode feature-lokal. Flyt kun noget til shared, når reel semantisk genbrug er bevist.

Bevar projektets dependency direction fra `docs/ARCHITECTURE.md` og undgå blandt andet:

- store all-purpose page components
- giant universal components med mange conditionals
- app-wide state for feature- eller server-data
- backend/API adgang direkte fra presentational components
- tunge route-specifikke dependencies importeret globalt
- lokale Tailwind-overrides for noget, der faktisk er en canonical shared/global regel
- unødvendig abstraction kun for at få filer til at se mindre ud

Strukturel efficiency er et krav, men ChatGPT må ikke påstå at en ændring er en performance-optimering uden måling. Hvis der er en reel performance-problematik, skal den undersøges med baseline → bottleneck → intervention → re-measurement.

## Product/backend boundary

Når funktionalitet eller data er involveret, skal `jddnd/curated-stay-craft` fortsat behandles som source of truth og read-only i Estelles normale designarbejde.

Hvis designet kræver ny rigtig Partout-funktionalitet, følg handoff-reglerne i `docs/ESTELLE_HOTEL_WORKFLOW.md` i stedet for at implementere backend-ændringen direkte.

## Før du kalder en ændring færdig

ChatGPT skal kunne svare på:

1. Var visual intent LOCAL, SHARED_PATTERN eller GLOBAL_SYSTEM?
2. Blev visual rule ændret på det højeste korrekte niveau?
3. Hvilket frontend-lag ejer implementationen?
4. Blev eksisterende feature/component/token genbrugt eller udvidet, hvor det var korrekt?
5. Blev der skabt unødvendig duplication, global state eller heavy dependency leakage?
6. Hvilke andre consumers/surfaces skulle verificeres?
7. Hvis en performance-forbedring påstås, findes der sammenlignelig måling?

Ændr ikke noget, før disse fire dokumenter er læst og den relevante authority er forstået.