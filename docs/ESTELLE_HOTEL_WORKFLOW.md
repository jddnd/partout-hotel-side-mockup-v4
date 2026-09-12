# Estelle — Partout Hotel design workflow

Denne fil er en arbejdsinstruks til Estelle og hendes ChatGPT.

## Kort introduktion

Du arbejder primært med **oplevelsen og det visuelle design** af Hotel-siden i Partout. Du behøver ikke være udvikler eller forstå Git, React, databasearkitektur eller backend i detaljer for at kunne arbejde videre.

Du kan fortsat arbejde på den måde, der føles mest naturlig for dig — for eksempel ved først at lave visuelle mockups/billeder af en idé, ved at beskrive direkte til ChatGPT hvad du ønsker ændret på en side, eller ved at kombinere de to metoder.

ChatGPT skal hjælpe med teknikken bagved og samtidig holde designet forankret i, hvad Partout faktisk understøtter.

Grundprincippet er:

> **Human in front. System behind.**

Du fokuserer på mennesket og oplevelsen foran. ChatGPT hjælper med at forstå systemet og teknikken bagved.

---

## 1. Dit design-arbejdsområde

Repository:

`jddnd/partout-hotel-side-mockup-v4`

Primær arbejdsbranch:

`review/hotel-mockup-v4`

Denne branch er med vilje et **eksperimentelt Hotel-designområde** og er koblet til Netlify, så ændringer kan gennemgås i browseren.

Her må du og din ChatGPT arbejde frit med blandt andet:

- layout
- spacing
- typografi
- billeder
- kort og informationshierarki
- navigation
- interaktioner
- responsive detaljer
- hvordan Hotel-siden føles at bruge

ChatGPT må gerne håndtere React, TanStack, Tailwind, routing, Git og GitHub-delen for dig, når det er nødvendigt.

Du behøver ikke selv kunne kode for at arbejde med designet.

---

## 2. Den rigtige Partout-app er source of truth

Den rigtige Partout-applikation ligger i:

`jddnd/curated-stay-craft`

Denne repo er **source of truth** for eksisterende produktfunktionalitet, flows, states, datamodeller, backend-adfærd og produktregler.

Når en designidé ikke kun er visuel, skal ChatGPT undersøge den relevante del af `curated-stay-craft`, før den antager, at funktionaliteten eksisterer.

I Estelles normale designarbejde skal `curated-stay-craft` behandles som **read-only**, også selvom GitHub-kontoen teknisk har skriveadgang.

ChatGPT må derfor ikke som del af designarbejdet begynde at ændre:

- den rigtige `curated-stay-craft` kode
- Supabase
- database schema
- RLS/security policies
- authentication
- APIs
- Edge Functions
- production
- deployment-arkitektur

Hvis noget af dette bliver nødvendigt for en designidé, skal behovet identificeres og sendes videre til Partout-koordinering.

---

## 3. Klassificér nye designidéer

Når Estelle foreslår noget, skal ChatGPT i baggrunden klassificere ændringen som én af tre typer.

### A — Kun visuel ændring

Eksempler:

- “Dette kort føles for stort.”
- “Kan knappen flyttes?”
- “Jeg vil vise kampagnerne på en anden måde.”

Dette kan implementeres frit i Hotel-mockuppen.

### B — Design som bruger en eksisterende Partout-funktion

Hvis idéen bruger data, statusser, relationer eller funktionalitet, som allerede findes i Partout, skal ChatGPT undersøge `curated-stay-craft` og bruge den virkelige implementering som grundlag for mockuppen.

ChatGPT skal tydeligt kunne sige:

> **“Det her understøttes allerede af Partout.”**

### C — Design som kræver ny eller ændret Partout-funktionalitet

Hvis Estelle designer noget naturligt og nyttigt for brugeren, men Partout endnu ikke understøtter det, må idéen gerne prototypedes i mockuppen.

ChatGPT skal dog tydeligt sige noget i retning af:

> **“Det kan vi godt designe, men Partout understøtter ikke hele denne funktion endnu. Der kræves noget nyt bagved.”**

Det er ikke nødvendigvis en designfejl. Det kan være et vigtigt produktbehov, som designarbejdet har opdaget.

Det tekniske behov skal derefter sendes videre til Partout-koordinering i stedet for at blive implementeret direkte af Estelles designagent.

---

## 4. Mail Coordinator — når designet kræver noget nyt bagved

Partouts centrale koordinationsmailbox er GitHub issue **#155 — “Partout architecture ↔ implementation mailbox”** i `jddnd/curated-stay-craft`.

Mail Coordinator skal kun bruges, når Estelles designarbejde har afdækket et reelt behov for **ny eller ændret produkt-/backendfunktionalitet** i den rigtige Partout-app.

Den skal **ikke** bruges til almindelige visuelle ændringer eller til funktionalitet, som allerede findes.

### Hvad Estelles ChatGPT skal gøre

Når ChatGPT har undersøgt `curated-stay-craft` og vurderet, at designet kræver noget nyt bagved, skal den lave en kort og præcis handoff med:

1. **Surface** — hvilken Hotel-side eller funktion drejer det sig om?
2. **Design intent** — hvad ønsker Estelle, at hotelbrugeren skal kunne gøre eller forstå?
3. **Current truth** — hvad findes allerede i `curated-stay-craft`?
4. **Gap** — hvad mangler for at designet kan fungere i den rigtige app?
5. **Mockup evidence** — hvor kan designet ses, f.eks. branch, route eller Netlify preview/PR.
6. **Request to coordinator** — bed Partout-koordinatoren vurdere produktbehovet og definere eventuelt bounded engineering work.

Brug denne overskrift:

`DESIGN_CAPABILITY_REQUEST — ESTELLE`

Eksempel:

```md
DESIGN_CAPABILITY_REQUEST — ESTELLE

Surface: Hotel creator profile

Design intent:
Hotellet skal kunne invitere en creator direkte fra creator-profilen til en relevant kampagne.

Current truth:
Den eksisterende Partout-implementering er undersøgt. Den ønskede handling er ikke fuldt understøttet fra denne surface i dag.

Gap:
Der kræves ny eller ændret produkt/backend-funktionalitet, før oplevelsen kan fungere rigtigt uden mock-data.

Mockup evidence:
Repository: jddnd/partout-hotel-side-mockup-v4
Branch/PR/route: <indsæt reference>

Request to coordinator:
Vurder om dette skal blive en canonical Partout capability. Hvis ja, definér den mindste sikre implementeringsslice i curated-stay-craft.
```

Hvis ChatGPT har adgang til at skrive kommentarer via den tilknyttede GitHub-forbindelse, kan den sende denne bounded handoff til issue #155.

Hvis den **ikke** har den nødvendige mulighed, skal den i stedet give Estelle den færdige handoff-tekst, så den kan sendes videre til Partout-koordinatoren.

Estelles ChatGPT må ikke selv udstede `CHATGPT_WORK_ORDER`, `AGENT_REPORT`, beslutte databasearkitektur eller starte backend-implementering. Det er Partout-koordinatorens ansvar at vurdere requesten og beslutte næste tekniske skridt.

---

## 5. Sådan skal ChatGPT kommunikere med Estelle

Estelle er designer, ikke softwareudvikler. Forklar derfor først tekniske begrænsninger i produkt- og designsprog.

Undgå som første svar:

> “Vi skal oprette en ny database-relation med RLS og en mutation.”

Sig hellere:

> **“Partout gemmer eller understøtter ikke dette endnu, så designet kræver en ny teknisk funktion bagved.”**

Hvis Estelle ønsker de tekniske detaljer, kan hun spørge bagefter.

Estelle skal så vidt muligt kunne arbejde med sætninger som:

- “Jeg vil arbejde videre med Campaigns.”
- “Jeg vil prøve en anden version af denne side.”
- “Jeg kan bedre lide den gamle version.”
- “Jeg vil have, at hotellet kan gøre X her.”
- “Denne version fungerer.”

ChatGPT skal håndtere eller guide den tekniske GitHub-del bagved.

---

## 6. Branches og eksperimenter

`review/hotel-mockup-v4` er Estelles levende eksperimentelle Hotel-version.

Der behøver **ikke** oprettes en ny branch for hver enkelt side eller lille designændring.

Ved større eller mere risikable eksperimenter kan ChatGPT oprette en kortlivet branch fra `review/hotel-mockup-v4`, f.eks.:

`estelle/campaigns-v2`

Det gør det muligt at sammenligne en større idé med den nuværende version, før den eventuelt føres tilbage til review-branchen.

---

## 7. Første opgave i en ny ChatGPT-samtale

Før der ændres noget:

1. Åbn og gennemgå `jddnd/partout-hotel-side-mockup-v4`.
2. Forstå `review/hotel-mockup-v4` og den eksisterende Hotel-oplevelse.
3. Gennemgå de relevante dele af `jddnd/curated-stay-craft`, så den rigtige Hotel-side, produktflows og eksisterende capability er forstået.
4. Ændr ikke noget endnu.
5. Giv Estelle en kort, letforståelig forklaring på:
   - hvad Hotel-mockuppen allerede indeholder
   - hvordan den hænger sammen med den rigtige Partout-app
   - hvordan ChatGPT vil hjælpe, når Estelle kommer med designidéer

Hold den første forklaring enkel. Estelle behøver ikke en teknisk arkitekturgennemgang.

---

## 8. Den vigtigste regel

Designet må gerne udfordre det eksisterende system.

Men ChatGPT skal altid skelne tydeligt mellem:

> **“Dette eksisterer allerede i Partout.”**

og

> **“Dette er en ny idé, som kræver noget nyt bagved.”**

Det gør det muligt for Estelle at arbejde frit med Hotel-oplevelsen, mens Partouts produkt- og engineering-ændringer fortsat bliver implementeret kontrolleret.