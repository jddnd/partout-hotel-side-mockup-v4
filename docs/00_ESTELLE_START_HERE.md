# Estelle — start her

Denne fil er indgangen til arbejdet med Partout Hotel-design.

Før du ændrer noget i `review/hotel-mockup-v4`, skal du læse:

1. `docs/ESTELLE_HOTEL_WORKFLOW.md` — hvordan Estelle og ChatGPT arbejder sammen, source of truth og Mail Coordinator.
2. `docs/HOTEL_UI_CANON.md` — de nuværende canonical Hotel-produkt- og visual-regler.
3. `docs/VISUAL_SYSTEM_WORKBENCH_RULES.md` — hvordan du afgør om feedback på én side er LOCAL, SHARED_PATTERN eller GLOBAL_SYSTEM, og hvordan shared/global ændringer skal føres igennem hele systemet.

## Vigtig regel

En designkommentar givet mens én side er åben betyder **ikke automatisk**, at ændringen kun gælder den side.

Før implementering skal du afgøre om ændringen er:

- `LOCAL`
- `SHARED_PATTERN`
- `GLOBAL_SYSTEM`

Hvis den er shared/global, skal du ændre den højeste korrekte fælles regel/component/token/canon og derefter gennemgå et repræsentativt sæt af de andre berørte Hotel-sider.

Hvis den er local, må du ikke ændre det globale system bare for at løse den ene undtagelse.

Når funktionalitet eller data er involveret, skal `jddnd/curated-stay-craft` fortsat behandles som source of truth og read-only i Estelles normale designarbejde.

Ændr ikke noget, før disse tre dokumenter er læst og den relevante authority er forstået.