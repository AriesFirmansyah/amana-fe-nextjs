# Whistleblowing & Case Management Platform — Frontend

Web application frontend for the **Whistleblowing & Case Management Platform**, allowing employees (**Reporter**) to securely report workplace incidents and administrators (**Admin**) to review, investigate, and resolve cases.

---

## 1. Technology Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & UI Components:** Tailwind CSS, Radix UI Dialog & Dropdown Menu primitives, Lucide React Icons
- **State Management & Data Fetching:** TanStack React Query v5, Redux Toolkit + Redux Persist, Axios (with request signature & auth interceptors)
- **Forms & Validation:** React Hook Form + `@hookform/resolvers/zod` + `zod`
- **Security:** AES password/cookie encryption (`crypto-js`), HMAC-SHA256 request signing, Next.js Edge Middleware route protection

---

## 2. Features & Role-Based Access Control

1. **Authentication & Protected Routes**
   - Sign-in page (`/authentication/sign-in`) with email and password validation.
   - Next.js Middleware (`src/middleware.ts`) protects `/`, `/reports/*`, and `/admin/*`. Unauthenticated users are redirected to `/authentication/sign-in`, and non-admin users are prevented from accessing `/admin/*`.

2. **Reporting Dashboard (`/`)**
   - Real-time summary metrics fetched from the backend:
     - **Total Reports**
     - **Draft** (visible to `REPORTER`)
     - **Submitted Reports**
     - **Under Review**
     - **Resolved Reports**

3. **Incident Report Management (CRUD + Search & Filter)**
   - **Create Report (`REPORTER`):** Modal dialog (`ReportFormDialog`) with fields for **Incident Title**, **Category** (custom core `DropdownMenu`), **Date of Incident**, and **Detailed Description**. Reporters can choose **Save as Draft** (`DRAFT`) or **Submit Report** (`SUBMITTED`).
   - **Read & Detailed View (`REPORTER` & `ADMIN`):**
     - Paginated table displaying Reference Number (`WBP-YYYYMMDD-XXXXX`), Title, Category, Reporter Name/Email (for Admin), Incident Date, Status Badge, and contextual Actions.
     - Detailed modal (`ReportDetailDialog`) displaying full incident description, metadata, and Admin Investigation Notes.
   - **Update (`REPORTER` & `ADMIN`):**
     - **Reporter:** Can edit their own `DRAFT` reports or click **Submit** to transition a draft to `SUBMITTED`.
     - **Admin:** Can update the **Investigation Status** (`Submitted` → `Under Review` → `Resolved`) via the core `DropdownMenu` and save **Admin / Investigation Notes** inside `ReportDetailDialog`.
   - **Delete (`REPORTER`):** Reporters can delete their own `DRAFT` reports with a confirmation prompt (`DeleteReportDialog`).
   - **Search & Filter:** Real-time debounced search by title or reference number, status filter tabs (`All`, `Draft`, `Submitted`, `Under Review`, `Resolved`), and category filter dropdown.

4. **Admin User Management (`/admin/users`)**
   - Accessible exclusively by `ADMIN` users from the dashboard header (`Manage Users`).
   - Displays user role statistics (`Users`, `Reporter`, `Admin`), role filter tabs, search by name, paginated user table, and an **Add User** modal dialog.

---

## 3. Test Accounts (Both Roles)

Ensure the backend database has been seeded (`npm run db-seed` in the backend repository). All test accounts use the password: **`Password123!`**

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Reporter** (`REPORTER`) | Budi Santoso | `reporter@amana.id` | `Password123!` |
| **Reporter 2** (`REPORTER`) | Siti Aminah | `siti@amana.id` | `Password123!` |
| **Administrator** (`ADMIN`) | Amana Administrator | `admin@amana.id` | `Password123!` |

---

## 4. Environment Configuration (`.env`)

Configure `.env` (and `.env.local` / `.env.development` if used) in the root of `amana-fe-nextjs`. Make sure `API_KEY`, `API_BASE_URL`, and `ENCRYPTION_SECRET_KEY` match the Backend `.env`:

```env
APP_ENV="development"

# API (Matched with Backend)
API_KEY="amana_whistleblowing_api_key_9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c"
API_BASE_URL="http://localhost:4100"

# COOKIE & HOSTNAME
COOKIE_DOMAIN=""
HOSTNAME_DOMAIN="http://localhost:3000"

# REQUEST SIGNATURE
SIGNATURE_IV="amana_wbp_iv_16b"
SIGNATURE_KEY="amana_wbp_signature_key_2026_sec"

# ENCRYPTION (Matched with Backend)
ENCRYPTION_SECRET_KEY="amana_aes_secret_key_2026_whistleblowing_case_management_8f9e0d1c2b3a4f5e"
```

---

## 5. Setup Instructions

1. **Ensure the Backend API is running** on `http://localhost:4100` (see the Backend `README.md` for database setup and seeding instructions).

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Next.js development server (runs on `http://localhost:3000`):**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Expected Workflow

```text
Login → Create Report → Save Draft → Edit Report → Submit → Admin Review → Update Status → Resolved
```

1. **Login as Reporter:** On `/authentication/sign-in`, enter `reporter@amana.id` and password `Password123!`, then click **Sign In**.
2. **Create Report & Save as Draft:** Click **+ New Incident Report**, fill in the title, category, incident date, and description (min 20 chars), then click **Save as Draft**.
3. **Edit Draft / Delete Draft:** In the reports table, locate the `Draft` report. Click the **Edit** (pencil) icon to modify details, or the **Delete** (trash) icon to test the delete confirmation modal.
4. **Submit Report:** Click the **Submit** (send) button on the draft row (or inside the edit dialog) to submit the report. Its status changes to **Submitted** (`SUBMITTED`), and edit/delete actions are locked.
5. **Logout & Login as Admin:** Click **Sign Out** in the top-right header. On the sign-in page, sign in with `admin@amana.id` and password `Password123!`.
6. **Admin Review & Status Update:**
   - Observe the **Case Management Dashboard** showing all submitted reports across all reporters (drafts remain private to their creators).
   - Click **Review** on a report to open the detail dialog.
   - Change **Investigation Status** from `Submitted` to `Under Review` or `Resolved`, add **Admin / Investigation Notes**, and click **Update Case Status**.
7. **Verify Resolution as Reporter:** Sign back in as `reporter@amana.id` to see the updated status (`Under Review` / `Resolved`) and read the Admin's investigation notes in the report details.
