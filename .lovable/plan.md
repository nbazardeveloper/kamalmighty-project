
## KAM Almighty Property Services — Build Plan

### Stack
TanStack Start (existing), Tailwind v4, Lovable Cloud (Supabase) for DB/auth, server functions for form + notifications, Resend + Telegram scaffolded with placeholder secrets.

### Design system (`src/styles.css`)
- Background `#FFFFFF`, foreground `#111111`, accent `#FFCC00` (yellow, used only for CTAs/badges/icons/accent lines).
- Fonts: Archivo (display, headings) + Inter (body) via `@fontsource/archivo` and `@fontsource/inter`, imported in root.
- Semantic tokens added: `--brand-yellow`, `--brand-charcoal`, `--brand-charcoal-foreground` + Tailwind mappings.
- Pulse animation utility for hero CTA.

### Routes
- `/` — marketing page (all sections below)
- `/admin` — login screen + dashboard (protected by `_authenticated` layout + admin role check)
- `/_authenticated/admin` — leads table + projects manager
- `/auth` — email/password sign-in for admin

### Marketing page sections (`src/routes/index.tsx` + components in `src/components/site/`)
1. **Header** — transparent overlay: shield "KA" logo (inline SVG), nav (Services, Service Area, About, Contacts as hash links), "Licensed, Bonded & Insured" badge, yellow phone CTA `(564) 888-0755`, utility strip "Mon–Sat 7:00am–7:00pm".
2. **Hero** — true edge-to-edge (`w-screen min-h-screen relative`, no parent padding); Unsplash heavy-machinery bg with 30% black overlay; left-aligned copy exactly as specified; pulsating yellow "Get a Free Estimate" that smooth-scrolls to `#contact`.
3. **Trust bar** — black strip, 4 columns with lucide icons (Shield, Calendar, Tag, HardHat) in yellow.
4. **Services** — 4 accordion cards (shadcn Accordion) with the 14 sub-services grouped as specified; yellow border on hover.
5. **Service Area** — split grid: WA/OR city lists left; Google Maps embed iframe right (no API key needed; standard `google.com/maps?q=` embed for `6168 NE Highway 99 Ste 201, Vancouver, WA 98665`).
6. **Dynamic Projects** — fetched from Supabase `projects` table via a public server fn; card grid with image, title, category, location.
7. **Why Choose Us** — big number stats (6 specialists, 10+ years, Free assessment).
8. **Lead form (`#contact`)** — Name/Phone/Email/Project Description (Select of 4 categories); zod validation; posts to `submitLead` server fn.
9. **Footer** — charcoal, address, `kamalmighty@gmail.com`, phone link, © 2026.

### SEO / metadata (`__root.tsx` + `/` head())
- Title: "KAM ALMIGHTY PROPERTY SERVICES | Licensed General Contractor WA & OR"
- Meta description, OG title/description/type/url, twitter card.
- JSON-LD `LocalBusiness` script with name, phone, address, `areaServed` list of WA + OR cities.
- Proper H1 (hero), H2 per section, H3 per card.

### Backend (Lovable Cloud / Supabase)
Migration creates:
- `app_role` enum (`admin`, `user`), `user_roles` table + `has_role()` SECURITY DEFINER + grants + RLS.
- `leads` (id uuid, name, phone, email, project_description, status text default 'new', created_at) — RLS: insert allowed to `anon`+`authenticated`; select/update only admins.
- `projects` (id, title, category, description, image_url, location, created_at) — RLS: select to `anon`; insert/update/delete admin only.
- All required GRANTs.
- Trigger to auto-grant admin role to a specific verified email domain — replaced with a simple bootstrap: first signed-up user with email `kamalmighty@gmail.com` (verified) gets admin. Others can be promoted via SQL later.

### Server functions (`src/lib/*.functions.ts`)
- `submitLead` (public, POST, zod-validated): inserts into `leads` via publishable client, then fires Resend email + Telegram webhook in parallel; failures logged but do not fail the user.
- `listLeads`, `updateLeadStatus`, `listProjectsAdmin`, `createProject`, `deleteProject` — `requireSupabaseAuth` + admin role check.
- `listProjectsPublic` — publishable client, safe columns only.

### Notifications (scaffolded, non-blocking)
- `src/lib/notifications.server.ts` reads `RESEND_API_KEY`, `NOTIFICATION_TO_EMAIL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` from `process.env`. If missing, logs a warning and no-ops. From: `help@kamalmighty.com`, To: `kamalmighty@gmail.com`.
- Secrets requested via `add_secret` at build time (user can fill later).

### Admin dashboard
- `/auth` route: email/password sign-in (Supabase). After success, redirect to `/admin`.
- `_authenticated/route.tsx` — already managed; provides gate.
- `_authenticated/admin.tsx` — checks `has_role(admin)`; if not, shows "Not authorized"; else renders:
  - Leads table (shadcn Table) with status filter (new / contacted / closed) and status toggle (Select) that calls `updateLeadStatus`.
  - Projects manager: form (title, category, description, image_url, location) + list with delete.

### Technical notes for reviewer
- Hero full-width achieved by keeping `<main>` unpadded; sections handle their own container widths.
- All Tailwind color usage goes through semantic tokens (`bg-brand-yellow`, `text-brand-charcoal`), no raw hex in JSX.
- Google Maps uses embed iframe (`https://www.google.com/maps?q=...&output=embed`); no key/connector needed.
- Unsplash hero URL: `https://images.unsplash.com/photo-1504307651254-35680f356dfd` (industrial machinery); referenced as bg image.
- `react-helmet` not used — TanStack `head()` is the native equivalent and is what the SEO scanner reads.

### File list (new)
- `src/components/site/{Header,Hero,TrustBar,Services,ServiceArea,Projects,WhyUs,LeadForm,Footer,Logo}.tsx`
- `src/routes/auth.tsx`, `src/routes/_authenticated/admin.tsx`
- `src/lib/{leads,projects,notifications}.functions.ts`, `src/lib/notifications.server.ts`, `src/lib/validators.ts`
- Supabase migration for enum/tables/roles/RLS/grants
- Secrets: `RESEND_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (requested after Cloud is enabled)
