# CFTA — Project Overview & Interview Briefing

This document is a concise, interview-ready explanation of the CFTA project: what it is, why it exists, how it works, the tech stack, architecture, development choices, challenges, and future improvements. Use this to answer technical and product questions during your interview.

---

**Project name:** CFTA

**Short elevator pitch:** CFTA is a transport-focused carbon emissions tracking platform that helps users estimate, monitor, and reduce CO₂ emissions from vehicles and trips. It combines a Laravel-based backend API, a web front-end, and a native Android mobile app to collect trip data, calculate emissions, and present insights and recommendations.

---

**Why it exists (Purpose & Problem Statement)**
- Many commuters and fleet operators lack actionable, easy-to-understand insights about the carbon impact of everyday travel.
- CFTA aims to bridge that gap by providing low-friction collection (mobile + web), reliable emissions calculations based on vehicle and fuel types, and insight-driven suggestions to reduce emissions.
- It’s valuable for individuals tracking personal footprint, companies monitoring fleet emissions, and researchers/municipalities evaluating transport policy impact.

**How it stands out**
- Multi-platform: native Android app for on-device trip capture + Laravel API for centralized processing and storage.
- Domain-focused model layer (cars, fuel types, travel modes) allowing granular emissions calculations.
- Designed for extensibility: data model and modular API enable later features like route-optimization, machine-learning predictions, and carbon-offset integration.

---

**Tech stack (why each was chosen)**
- Backend: Laravel (PHP) — Rapid API development, expressive Eloquent ORM for models like `car`, `fuel_type`, `travel`.
  - See model files in [web/app/Models](web/app/Models).
- Frontend: Vite-based web scaffold (fast dev builds, modern toolchain) for admin/insights dashboards.
  - See [web/resources](web/resources) and `vite.config.js` where applicable.
- Mobile: Android (Gradle / Kotlin) — offline-capable, direct access to device sensors/GPS; project uses the Gradle Kotlin DSL.
  - See [Mobile/build.gradle.kts](Mobile/build.gradle.kts).
- Database: MySQL (common choice for Laravel apps) — robust relational modeling for trips, vehicles, and users.
- Auth: Laravel Passport / Sanctum present in config — supports API token or SPA/mobile auth flows.
- Dev & Deployment: Docker configs and composer/npm scripts for reproducible development environment.

---

**High-level architecture**
- Mobile app collects trip events (start/stop, GPS path, distance) and vehicle metadata.
- Mobile sends trip summaries (or full tracks) to the Laravel API over authenticated requests.
- Backend persists trips and related models (`travel`, `travelusage`, `car`, `fuel_type`) and runs emissions calculation logic.
- Web frontend / admin dashboard and mobile UI present aggregated statistics, history, and recommendations.

Data flow (user perspective):
- User opens mobile app → starts trip → app records distance / mode / vehicle → user stops trip → app computes or forwards trip to API → backend stores trip and computes emissions → user sees trip CO₂ and weekly/monthly summaries.

---

**Key domain models (what they represent)**
- `car.php` — vehicle attributes (make, model, fuel type, efficiency profile).
- `fuel_type.php` — fuel-specific emission factors used in calculations.
- `travel.php` & `travelusage.php` — trip records and usage metadata (mode of transportation, timestamps, distances).
- `modeoftranspotation.php` — categorical modes (car, bus, train, walking), enabling different calculation strategies.

Find these under [web/app/Models](web/app/Models).

---

**Core implementation highlights**
- Emissions calculation uses per-fuel emission factors and per-vehicle efficiency (distance × factor).
- API routes and controllers accept authenticated POSTs from the mobile client and run server-side validation and persistence.
  - See [web/routes/api.php](web/routes/api.php) for endpoint layout.
- Laravel Eloquent provides relationships between users, vehicles, and trip records, enabling efficient aggregation queries for dashboards.

---

**How I built it (process & decisions)**
1. Defined product goals: accurate, easy-to-use transport carbon tracking with minimal friction for end users.
2. Designed domain model focusing on vehicles, fuel types, and trips so calculations stay auditable and extensible.
3. Implemented a RESTful Laravel API with token-based auth to support both mobile and web clients.
4. Built a native Android client (Kotlin) for reliable GPS capture and background recording.
5. Iterated on UX: keep trip start/stop minimal, allow manual corrections for distance/mode.

Design tradeoffs and rationale:
- Chose native Android for reliability and sensor access over hybrid frameworks.
- Used Laravel for fast API development and rich ORM support.
- Kept early calculations simple (deterministic emission factors) to remain transparent and explainable in interviews.

---

**Challenges faced and how I solved them**
- GPS accuracy & trip segmentation: noisy GPS leads to inflated distances.
  - Mitigation: smoothing heuristics, minimum movement thresholds, and optional manual edit of a trip's distance.
- Vehicle identification & variability in efficiencies:
  - Mitigation: support user-entered vehicle profiles with default emission factors per fuel type; allow users to override.
- Auth & syncing of offline data:
  - Mitigation: mobile queues outgoing trips when offline and syncs on network availability. Server-side idempotency handled via unique trip IDs.
- Data privacy & storage:
  - Mitigation: store only necessary trip metadata (timestamps, distance); optionally anonymize coordinates before upload.

---

**Areas to improve / roadmap**
- Improve distance accuracy with map-matching (snap GPS track to road network) and remove GPS drift.
- Add multi-modal trip segmentation and automatic mode detection (machine learning) to better classify public transport vs. car.
- Add per-user personalized efficiency using historical fuel/consumption data.
- Integrate with mapping APIs to compute route CO₂ and suggest lower-carbon routes.
- Add corporate features: fleet dashboards, exportable reports, user management, and compliance metrics.
- Add tests: unit tests for emission calculations and end-to-end tests for API endpoints.

---

**How to explain this in an interview (talking points)**
- Problem & user: Describe who benefits (commuters, fleets), and why transport emissions matter.
- Data model: Explain `car`, `fuel_type`, `travel` and how emission = distance × factor (and how vehicle efficiency factors in).
- Architecture: Mobile → API (Laravel) → DB → Dashboard. Mention offline sync and authentication choices.
- Core tradeoffs: Accuracy vs battery life; explain why native Android was chosen.
- Results & next steps: Summarize what works today and a few immediate improvements you plan to deliver.

---

**Quick local dev notes**
- Backend: run `composer install`, copy `.env.example` to `.env`, run migrations and seeders.
- Mobile: open the `Mobile` module in Android Studio and run on a device or emulator.
- Web frontend: run `npm install` then `npm run dev` (Vite) for the dashboard.

Refer to these files for entry points: [Mobile/build.gradle.kts](Mobile/build.gradle.kts) and [web/routes/api.php](web/routes/api.php).

---

If you'd like, I can:
- produce a short slide deck based on this file, or
- prepare a 2–3 minute spoken script you can rehearse for your interview, or
- run quick edits to emphasize particular features you'd like to highlight.

Good luck in your interview — tell me which option you want next.
