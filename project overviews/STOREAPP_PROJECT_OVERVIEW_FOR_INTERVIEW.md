# Store Management System - Interview Brief

## What This Project Is

This workspace contains a two-part store management platform:

1. A Next.js frontend for the people-facing dashboards and login experience.
2. A FastAPI backend that owns the business logic, persistence, integrations, and scheduled workflows.

The product is not just a CRUD app. It is a store operations and compliance system with role-based access, OTP login, compliance tracking, stock verification, task execution, legal document tracking, complaint handling, and third-party system integration.

If you need a one-line interview summary, use this:

> This is a role-based store operations platform where Admin, Manager, and Operations users authenticate through OTP and interact with dashboards powered by a FastAPI backend that handles compliance, stock verification, task workflows, and external inventory integrations.

## High-Level Architecture

The codebase is split into two applications:

- [store-application](store-application) is the frontend.
- [store-microservice](store-microservice) is the backend API.

The frontend focuses on:

- Authentication UI
- Role-based routing
- Dashboard views for Admin, Manager, and Operations
- Data fetching from the backend API
- Rich UI interactions and animations

The backend focuses on:

- Authentication and user-role access
- Store, employee, asset, complaint, and legal document domains
- Stock verification generation and submission
- Notifications and task execution tracking
- Integrations with external systems such as Zoho, Freshivores catalog APIs, and GoFrugal stock lookup
- Scheduled jobs and operational persistence

## Technology Stack

### Frontend

- Framework: Next.js 16 with App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI System: Shadcn UI built on Radix primitives
- Animation: Framer Motion
- Charts: Recharts
- Notifications: Sonner
- Icons: Lucide React
- i18n: react-i18next and i18next
- Theme/Auth utilities: next-themes, js-cookie, local storage session handling

### Backend

- Framework: FastAPI
- Language: Python
- ORM: SQLAlchemy
- Validation: Pydantic schemas
- Static files: FastAPI StaticFiles for uploads
- Observability: Sentry SDK
- Database: PostgreSQL in production, with environment-based configuration
- External integrations: Zoho, Freshivores, GoFrugal, SMS provider

## Frontend Structure

The frontend is organized by route groups:

- `(auth)` contains the OTP login screen.
- `(admin)` contains the admin console.
- `(manager)` contains the manager portal.
- `(operations)` contains the operations portal.

The root app also has shared providers and reusable UI components.

### Authentication Flow

Authentication is intentionally simple from the user’s perspective:

1. The user enters a phone number.
2. The app sends an OTP request to the backend.
3. The user enters the OTP.
4. The backend verifies the OTP and returns the user profile and role.
5. The frontend routes the user to the correct dashboard based on the role.

The login screen is built in [store-application/app/(auth)/page.tsx](store-application/app/%28auth%29/page.tsx) and the session logic lives in [store-application/components/providers/AuthProvider.tsx](store-application/components/providers/AuthProvider.tsx).

Important behavior:

- OTP login is the main path.
- The frontend has a fallback mock-auth path if the backend is unavailable or rejects the request.
- The route after login depends on the role: `admin`, `manager`, or `operations`.
- The app stores the active user locally so refreshes preserve the session.

### Role-Based Dashboards

The route groups reflect different responsibilities:

- Admin: system-wide oversight, master data, stock verification review, manual stock audit, legal docs, complaints, permissions, integrations.
- Manager: day-to-day store compliance, task completion, assets, employees, complaint requests, and stock verification submission.
- Operations: delivery and order-related workspace, kept intentionally lighter.

The admin shell in [store-application/app/(admin)/admin/layout.tsx](store-application/app/%28admin%29/admin/layout.tsx) enforces admin-only access and shows a sidebar-driven workflow. The manager home page in [store-application/app/(manager)/manager/page.tsx](store-application/app/%28manager%29/manager/page.tsx) pulls live store status, assets, tasks, and complaint counts. The operations page in [store-application/app/(operations)/operations/page.tsx](store-application/app/%28operations%29/operations/page.tsx) is a narrower dashboard for operations users.

### UI/UX Characteristics

The frontend is designed as a polished internal tool rather than a plain CRUD admin panel:

- Glassmorphism-style login experience
- Motion-based transitions for forms and cards
- White and green theme styling
- Responsive sidebar navigation for admin
- Small dashboard widgets and grids instead of dense tables everywhere
- Strong permission-based visibility for actions and routes

## Backend Structure

The backend is a FastAPI application with a clear domain split:

- `core/` for config and database setup
- `models/` for SQLAlchemy entities
- `schemas/` for Pydantic request/response contracts
- `services/` for business logic
- `routes/` for API endpoints
- `integrations/` for third-party client wrappers
- `jobs/` for scheduled background tasks
- `utils/` for shared helpers

The application entry point is [store-microservice/app/main.py](store-microservice/app/main.py).

### Runtime Behavior

At startup, the backend:

- Initializes Sentry
- Enables CORS for the configured frontend origins
- Mounts the `uploads` directory as static content
- Starts the stock verification scheduler during application lifespan
- Exposes `/health` and `/` for operational checks

It also has custom exception handlers so response validation failures and generic exceptions are captured in Sentry and converted to safe JSON responses.

## API Domain Areas

The main API router in [store-microservice/app/routes/v1/__init__.py](store-microservice/app/routes/v1/__init__.py) exposes these modules:

- Authentication
- Stores
- Employees
- Integrations
- Users
- Roles and permissions
- Assets
- Compliance
- Tasks
- Complaints
- Complaint requests
- Notifications
- Legal documents
- Stock verification
- Document expiry alerts
- Store types

That means the system is broader than stock checking. Stock verification is one feature inside a larger store governance platform.

## Authentication Model

Authentication is OTP-based and role-aware.

The backend auth flow in [store-microservice/app/routes/v1/auth.py](store-microservice/app/routes/v1/auth.py) does the following:

- Normalizes phone numbers
- Enforces an OTP cooldown
- Looks up the user by phone number
- Generates or reuses OTP behavior depending on configured numbers
- Returns the user’s role and permissions

The frontend then maps the role to the correct dashboard.

This setup is useful in interviews because it shows a practical balance:

- Simple enough for store staff
- Secure enough for production workflows
- Flexible enough to support different roles and permissions

## Stock Verification Workflow

This is the most distinctive subsystem in the project.

The stock verification feature is implemented across the backend route [store-microservice/app/routes/v1/stock_verification.py](store-microservice/app/routes/v1/stock_verification.py) and the service layer in [store-microservice/app/services/stock_verification_service.py](store-microservice/app/services/stock_verification_service.py).

### What the Workflow Tries To Solve

The business problem is: stores need a daily, structured way to compare physical stock against system stock, catch mismatches quickly, and push unresolved discrepancies into the next cycle.

### Core Building Blocks

- Settings: sample size, tolerance percentage, run time, verification deadline, carryover flag, and whether all stores share the same item set.
- Stock verification batch: one generated assignment per store and date.
- Stock verification items: the individual SKUs the manager must count.
- Manual audit: admin fallback for explicit stock audits outside the daily assignment flow.
- Notifications: used when mismatches appear.
- Task execution records: used to connect verification work to the broader task system.

### How Daily Samples Are Generated

When the scheduler or an admin triggers generation, the backend:

1. Reads the active stock verification settings.
2. Pulls active stores.
3. Skips stores without an outlet mapping.
4. Looks for an existing batch for that store and date.
5. If a valid batch already exists, it reconciles it instead of blindly rebuilding it.
6. Builds the item list from two sources:
   - Carryover mismatches from the previous day
   - Random catalog items from the Freshivores product catalog

The service has protections to avoid repeated samples too often, and it falls back to historical items if the live catalog is too narrow.

### Why Carryover Exists

Carryover means unresolved mismatches from the previous day are re-added to the next day’s verification batch.

That matters because it prevents missed problems from disappearing after one failed day. In interview terms, this is a continuity control: unresolved discrepancies stay visible until they are actually handled.

### How Random Items Are Chosen

Random items are not truly arbitrary. They are chosen from the Freshivores catalog with constraints:

- Items are normalized from multiple possible API field names
- Variants are expanded when a product has multiple pack sizes or SKUs
- Loose packing products are treated differently from variant-based products
- Images are resolved to a usable URL
- The service caches catalog results for performance

This makes the generated sample realistic and operationally useful rather than just random database rows.

### Manager Submission Flow

When the manager submits physical counts, the backend:

1. Loads the active batch for the store and business date.
2. Resolves the current system quantity from GoFrugal.
3. Falls back to legacy SKU mapping or the latest known system quantity if needed.
4. Calculates variance against the tolerance percentage.
5. Marks each row as matched, mismatched, or unverified.
6. Creates notifications when mismatches exist.
7. Adds a task execution record so the stock verification is tracked in the broader workflow system.

This is the main operational loop of the product.

### What Happens When There Is a Mismatch

If a row is mismatched:

- It is recorded with physical quantity, system quantity, and variance.
- A critical notification is created.
- The mismatch can be appended to the next day’s batch if that batch already exists.

That design creates a real audit trail and supports recurring remediation instead of one-off alerts.

### Admin Review and Manual Audit

Admins can review:

- Generated batches
- Mismatches and summaries
- Catalog products used for item edits
- Manual stock audits

Manual stock audit support exists so admins can create a custom audit list, resolve SKU snapshots from GoFrugal, save drafts, and persist full audit records. That gives the system a fallback when the automated daily sample needs human-driven correction or a special inspection.

## Other Business Modules

Beyond stock verification, the backend and frontend support several adjacent workflows:

- Stores: store master data and store detail views
- Employees: staff management and Zoho synchronization
- Assets: store asset tracking and compliance status
- Compliance: task completion status, proof uploads, and daily progress
- Complaints: complaint records and complaint requests
- Legal documents: document tracking and visibility on the admin side
- Integrations: especially Zoho connection handling
- Notifications: alerts used for missed deadlines and stock mismatches
- Roles and permissions: granular access control, including a master access path

## Important Interview Talking Points

If you are asked “what makes this project interesting?”, focus on these points:

1. It is a real operational system, not just a demo CRUD app.
2. It has three distinct user roles with different responsibilities.
3. It combines frontend route protection with backend business rules.
4. It has a daily stock verification pipeline with carryover, tolerance, and mismatch handling.
5. It integrates with external systems instead of relying only on internal mock data.
6. It uses scheduled jobs, notifications, task execution logging, and draft saving, which makes it closer to a production workflow engine.

## Suggested Interview Explanation

If you need a short spoken explanation, say this:

> I worked on a store operations platform split into a Next.js frontend and a FastAPI backend. The frontend provides OTP login and role-based dashboards for admin, manager, and operations users. The backend owns the business logic for stores, employees, compliance, complaints, legal documents, and a more advanced stock-verification workflow. The most important feature is the stock verification engine, which generates daily samples from the Freshivores catalog, carries unresolved mismatches into the next day, compares physical stock against GoFrugal system stock, and creates notifications and task records when mismatches occur.

## Files To Mention In An Interview

- [store-application/app/(auth)/page.tsx](store-application/app/%28auth%29/page.tsx)
- [store-application/components/providers/AuthProvider.tsx](store-application/components/providers/AuthProvider.tsx)
- [store-application/app/(admin)/admin/layout.tsx](store-application/app/%28admin%29/admin/layout.tsx)
- [store-application/app/(manager)/manager/page.tsx](store-application/app/%28manager%29/manager/page.tsx)
- [store-microservice/app/main.py](store-microservice/app/main.py)
- [store-microservice/app/routes/v1/__init__.py](store-microservice/app/routes/v1/__init__.py)
- [store-microservice/app/routes/v1/auth.py](store-microservice/app/routes/v1/auth.py)
- [store-microservice/app/routes/v1/stock_verification.py](store-microservice/app/routes/v1/stock_verification.py)
- [store-microservice/app/services/stock_verification_service.py](store-microservice/app/services/stock_verification_service.py)

## One-Liner Closing

This project is a role-based store compliance and operations platform where the frontend handles user experience and routing, while the backend orchestrates stock verification, compliance, and business workflows across multiple store roles.