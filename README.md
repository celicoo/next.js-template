# My Next.js Template

This repository contains a **Next.js** starter template pre-configured with a variety of tools and best practices, including:

- **TypeScript** for type safety  
- **NextAuth.js** for authentication  
- **tRPC** for API calls  
- **Prisma** for database ORM  
- **TinaCMS** for content management  
- **Tailwind CSS** and **Radix UI** for styling and UI components  
- **Docker Compose** setup for a local PostgreSQL database  
- **Biome** for linting and formatting  

All of these features come together to provide a **solid, extensible foundation** for building production-ready web applications. The code in this repository is licensed under the **MIT License**, giving you the flexibility to use it for any personal or commercial projects.

---

## Table of Contents

1. [Legal Notice, Disclaimer, and Intellectual Property](#legal-notice-disclaimer-and-intellectual-property)  
2. [Getting Started](#getting-started)  
3. [Directory Structure](#directory-structure)  
   - [.vscode](#vscode-directory)  
   - [app/ (Auth, Dashboard, Website, API)](#app-directory)  
   - [assets](#assets-directory)  
   - [components](#components-directory)  
   - [auth](#auth-directory)  
   - [website](#website-directory)  
   - [favicon.tsx](#favicontsx)  
   - [icons.tsx](#iconstsx)  
   - [effects](#effects-directory)  
   - [form.tsx](#formtsx)  
   - [configs](#configs-directory)  
   - [content](#content-directory)  
   - [contexts](#contexts-directory)  
   - [emails](#emails-directory)  
   - [hooks](#hooks-directory)  
   - [libs](#libs-directory)  
   - [prisma](#prisma-directory)  
   - [scripts](#scripts-directory)  
   - [styles](#styles-directory)  
   - [tina](#tina-directory)  
   - [trpc](#trpc-directory)  
   - [types](#types-directory)  
4. [Root Files](#root-directory)  
5. [License](#license)

---

## Legal Notice, Disclaimer, and Intellectual Property

<details>
  <summary><strong>Legal Notice</strong></summary>

  This repository and all of its foundational/template components are released under the [MIT License](LICENSE). The code is provided "as is," without any warranty—express or implied. The MIT License grants you the right to use, modify, and distribute this code in both personal and commercial projects, provided that you include the original copyright notice.
</details>

<details>
  <summary><strong>Disclaimer</strong></summary>

  This repository is provided "as is" without any warranty. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of this repository.
</details>

---

## Getting Started

1. **Clone or Fork** this repository.  
2. **Install Dependencies** (requires [pnpm](https://pnpm.io/)):  
   ```bash
   pnpm install
   ```
3. **Set Up Environment Variables**  
   - Copy `.env.example` to `.env` (adjust as needed).  
   - Make sure to fill in database credentials, NextAuth secrets, etc.  
4. **Run Docker-Compose** (Optional)  
   - To spin up a local PostgreSQL database quickly:  
     ```bash
     docker-compose up -d
     ```
5. **Database Setup**  
   - Ensure your `.env` points to the correct DB (local or remote).  
   - Generate Prisma client & run migrations (usually triggered automatically in `postinstall`):  
     ```bash
     pnpm prisma generate
     pnpm prisma migrate dev
     ```
6. **Development**  
   - Start the dev server (with TinaCMS):  
     ```bash
     pnpm dev
     ```
   - The app typically runs on [http://localhost:3000](http://localhost:3000).  
7. **Production Build**  
   ```bash
   pnpm build
   pnpm start
   ```

---

## Directory Structure

Below is an overview of each top-level directory and key files, with **Purpose** and **Key Features** sections to keep things consistent.

### .vscode Directory

Holds Visual Studio Code configuration for **formatting**, **debugging**, and **editor settings**.

<details>
<summary><strong>settings.json</strong></summary>

**Purpose**  
- Automates **formatting** and **organizes imports** on save via **Biome**.

**Key Settings**  
- `editor.codeActionsOnSave`: Runs Biome quickfixes and import organization.  
- `editor.defaultFormatter`: Sets Biome as the default formatter.  
- `editor.formatOnSave`: Automatically formats on save.  
- `typescript.enablePromptUseWorkspaceTsdk`: Prompts to use this workspace's TypeScript.  
- `typescript.tsdk`: Points to local `node_modules/typescript/lib/`.  
- Git blame configuration for shorter status bar display.
</details>

<details>
<summary><strong>launch.json</strong></summary>

**Purpose**  
- Defines **debugging configurations** for server-side and client-side Next.js.

**Configurations**  
1. **Next.js: debug server-side**  
   - Launches `pnpm dev` in a node-terminal for server debugging.  
2. **Next.js: debug client-side (Chrome/Firefox)**  
   - Opens `[Chrome/Firefox]` to debug client code on `http://localhost:3001`.  
3. **Next.js: debug full stack**  
   - Uses `node` with `--inspect` to debug the entire app.  
   - Skips Node internals and auto-attaches on server-ready events.
</details>

---

### app Directory

The `app` directory follows **Next.js App Router** conventions. It's subdivided into logical route groups: `(auth)`, `(dashboard)`, `(website)`, and `api/`.

#### app/(auth) Directory

Handles **authentication-related** layouts and pages.  
- **signup/layout.tsx**  
- **login/layout.tsx**  
- **layout.tsx** (root auth layout)

<details>
<summary>SignUp &amp; Login Layouts</summary>

**Purpose**  
- Provide consistent structure for Signup/Login pages.

**Key Features**  
- Empty metadata objects for future SEO improvements.  
- Wrap `children` for page content.  
</details>

<details>
<summary>layout.tsx (root auth layout)</summary>

**Purpose**  
- Detects existing sessions (via `auth()` from NextAuth).  
- Redirects authenticated users to `/` if already logged in.  
- Renders shared UI like `AuthHeader` and `AuthFooter`.
</details>

#### app/(dashboard) Directory

Currently contains **.keep** to track the folder in Git.  
- Future dashboard components, layouts, and pages will live here.

#### app/(website) Directory

Manages the **public-facing** part of the site, including layout, homepage, and dynamic legal pages.

<details>
<summary>layout.tsx</summary>

**Purpose**  
- Wraps all website pages with a **header** (`WebsiteHeader`) and **footer** (`WebsiteFooter`).
</details>

<details>
<summary>legal/[slug]/page.tsx</summary>

**Purpose**  
- Dynamically renders legal pages (Terms, Privacy, etc.) from TinaCMS content.  
- Uses `generateMetadata` for SEO, logs errors, and returns `notFound()` if invalid.
</details>

<details>
<summary>page.tsx (homepage)</summary>

**Purpose**  
- Minimal "use client" homepage component, currently blank for further development.
</details>

<details>
<summary>template.tsx</summary>

**Purpose**  
- Root website template (client component)  
- Applies consistent layout and styling (flex container, scroll behavior).
</details>

#### app/api Directory

Implements **API routes** for authentication and tRPC.

<details>
<summary>auth/[...next-auth]/route.ts</summary>

**Purpose**  
- Re-exports NextAuth handlers (`GET`, `POST`) from `~/libs/next-auth`.
</details>

<details>
<summary>trpc/[trpc]/route.ts</summary>

**Purpose**  
- Serves the tRPC endpoint.  
- Uses `fetchRequestHandler` with `createContext`.  
- Handles `GET` (queries) and `POST` (mutations).  
- Logs detailed error info in dev.
</details>

---

### app/apple-icon.tsx & app/icon.tsx

Generate **Apple Touch Icon** (180x180) and **favicon** (32x32) dynamically using `ImageResponse`.  
- Reuse a shared `Favicon` component for consistent branding.

---

### app/global-error.tsx

**Purpose**  
- Global client-side error boundary.  
- Logs errors and provides a `reset` function.  
- Returns a placeholder `<html>` block (expandable later).

---

### app/instrumentation.node.ts & app/instrumentation.ts

OpenTelemetry configuration for **backend monitoring** and **tracing**.  
- `instrumentation.node.ts` sets up `NodeSDK` with an `OTLPTraceExporter`.  
- `instrumentation.ts` dynamically imports the node instrumentation if `NEXT_RUNTIME === "nodejs"`.

---

### app/layout.tsx

**Purpose**  
- Global layout providing session, theme, tRPC, and toast providers.  
- Injects Google Tag Manager in production.  
- Handles dynamic metadata (Open Graph, Twitter, etc.).  
- Applies fonts and `<body>` styling.

---

### app/manifest.ts

**Purpose**  
- Defines the Web App Manifest for PWA support.  
- Sets `name`, `short_name`, `theme_color`, `background_color`, and display mode (`standalone`).

---

### app/robots.ts

**Purpose**  
- Specifies crawl directives for search engines.  
- Allows `*` (all user-agents) full access.

---

## assets Directory

Houses **static assets** such as fonts, images, etc.  
- **fonts/.keep** ensures the folder stays in version control even if empty.

---

## components Directory

Holds reusable UI components.

<details>
<summary>tailwind-indicator.tsx</summary>

**Purpose**  
- **Dev-only** indicator for displaying active Tailwind breakpoints (e.g., `sm`, `md`, `lg`).  
- Fixed at bottom-left (`bottom-1 left-1 z-50`).
</details>

---

## auth Directory

Contains placeholders for **AuthFooter** and **AuthHeader** components.  
- Currently empty, to be enhanced with authentication UI elements.

---

## website Directory

Contains **WebsiteFooter** and **WebsiteHeader** placeholders for the public-facing site layout.

---

## favicon.tsx

A placeholder component for generating **favicons/icons** (used by `apple-icon.tsx` and `icon.tsx`).

---

## icons.tsx

A **base SVG icon** component with size variants.  
- Uses `class-variance-authority (cva)` for small, medium, large.  
- Supports an optional `title` for accessibility.

---

## effects Directory

- **effects/.keep** to ensure the directory is tracked.  
- Future home for **custom UI effects** or complex animations.

---

## form.tsx

A **React Hook Form** helper that exports `FormProvider`, `FormField`, and `FormInput` components.  
- Simplifies building forms with consistent validation, states, and accessibility.

---

## configs Directory

Holds site-wide config files like:

<details>
<summary>site.ts</summary>

**Purpose**  
- Central place for **site name**, **description**, **public URL**, and social links.  
- Used by layout metadata, SEO, and other references.
</details>

---

## content Directory

Stores **markdown-based** legal documents or other text content.

<details>
<summary>legal/privacy.md &amp; legal/terms.md</summary>

**Purpose**  
- Contain the Privacy Policy and Terms of Use.  
- Fetched via TinaCMS in `(website)/legal/[slug]/page.tsx`.

**Key Metadata**  
- `title`, `description`, `updatedAt` for easy versioning.  
- Body is handled as markdown.
</details>

---

## contexts Directory

Houses global React contexts and providers.

<details>
<summary>toast.tsx</summary>

**Purpose**  
- Implements a global **toast notification system** with Radix UI.  
- `ToastProvider`, `useToast()`, automatically closes toasts after 10s.
</details>

<details>
<summary>trpc-react.tsx</summary>

**Purpose**  
- Creates a typed tRPC React client via `createTRPCReact()`.  
- Sets up request links (`loggerLink`, `unstable_httpBatchStreamLink`).  
- Provides `<TRPCReactProvider>` to wrap the app for easy queries/mutations.
</details>

---

## emails Directory

Contains email templates using `@react-email`.

<details>
<summary>magic-link.tsx</summary>

**Purpose**  
- A **Magic Link** email template for passwordless login.  
- Uses `Preview` text, an HTML structure, and custom font styles.
</details>

---

## hooks Directory

- **.keep** file ensures the directory is tracked in Git.  
- Future custom React hooks (e.g. `useSomething.ts`).

---

## libs Directory

Houses various libraries and utilities.

<details>
<summary>prisma.ts</summary>

**Purpose**  
- Creates a singleton `PrismaClient` to avoid multiple DB connections in dev.
</details>

<details>
<summary>query-client.ts</summary>

**Purpose**  
- Configures TanStack Query with `superjson` for serialization and sets `staleTime`.
</details>

<details>
<summary>next-auth.ts</summary>

**Purpose**  
- Central NextAuth.js config with a Prisma adapter.  
- Uses email (Resend) for Magic Link authentication.  
- JWT-based session strategy.
</details>

<details>
<summary>trpc.ts</summary>

**Purpose**  
- Sets up the tRPC server with `superjson` and error formatting.  
- Exports base `router`, `procedure`, and `createCallerFactory`.
</details>

<details>
<summary>resend.ts</summary>

**Purpose**  
- Configures the Resend API client for sending emails.  
- Specifically sends the Magic Link email from `<MagicLinkEmail />`.
</details>

<details>
<summary>react.ts</summary>

**Purpose**  
- Utility to merge multiple React refs into one.
</details>

<details>
<summary>shadcn.ts</summary>

**Purpose**  
- Utility function combining `clsx` with `tailwind-merge` for safe Tailwind class merging.
</details>

---

## prisma Directory

Contains Prisma's **schema** and **migrations**.

<details>
<summary>prisma/schema.prisma</summary>

**Purpose**  
- Defines data models, relationships, and constraints for PostgreSQL.  
- Identifies provider as `"postgresql"`.
</details>

<details>
<summary>prisma/migrations/</summary>

**Purpose**  
- Stores timestamped migration files with SQL changes.  
- Allows consistent DB schema versioning across environments.
</details>

---

## scripts Directory

Executable shell scripts that automate linting, building, development, and deployment workflows.

- **lint** → Runs `biome check --verbose --write .`  
- **postinstall** → Runs `prisma generate`  
- **install** → (Empty placeholder)  
- **start** → `next start` in production  
- **preinstall** → Ensures usage of **pnpm**  
- **dev** → Runs `tinacms dev --command "next dev"`  
- **postbuild** → Generates sitemap, runs `jampack`  
- **build** → `next build` for production

---

## styles Directory

<details>
<summary>globals.css</summary>

**Purpose**  
- Imports Tailwind base, components, and utilities.  
- Sets dark/light theme variables (`bg-background`, `text-foreground`).  
- Tweaks body styles (`flex`, `min-h-dvh`, `overscroll-y-none`, etc.).
</details>

---

## tina Directory

Used for TinaCMS **schema** and config.

<details>
<summary>tina-lock.json</summary>

**Purpose**  
- Stores locked Tina schema settings (version, collections).  
- Currently configures `legalPage` for `content/legal/*`.
</details>

<details>
<summary>config.ts</summary>

**Purpose**  
- Setup for TinaCMS (branch, client ID, media folder).  
- Defines the `legalPage` collection fields and a pre-submit hook to update `updatedAt`.
</details>

---

## trpc Directory

Code specific to **tRPC** server definition.

<details>
<summary>routers/.keep</summary>

**Purpose**  
- Maintains a routers folder for organizational purposes, even if empty.
</details>

<details>
<summary>router.ts</summary>

**Purpose**  
- Main tRPC router (currently empty).  
- Exports `createCaller()` for server-side calls without an HTTP request.
</details>

<details>
<summary>index.ts</summary>

**Purpose**  
- Sets up server-only environment for tRPC hydration with React Server Components.  
- Uses `createHydrationHelpers()` to handle caching.
</details>

---

## types Directory

Holds global or shared TypeScript type definitions.

<details>
<summary>README.md</summary>

**Purpose**  
- Explains that this directory is for project-wide type definitions.
</details>

<details>
<summary>global.d.ts</summary>

**Purpose**  
- Declares a global `Booleanish` type (`boolean | "true" | "false"`).  
- Helps unify boolean usage patterns across the app.
</details>

---

## Root Directory

This section covers top-level config files and scripts you'll find at the root of the project.

<details>
<summary>docker-compose.yaml</summary>

**Purpose**  
- Defines a PostgreSQL service for local dev.  
- Maps port 5432, configures environment variables, and persistent volume.
</details>

<details>
<summary>next-sitemap.config.cjs</summary>

**Purpose**  
- Config for generating a sitemap using `next-sitemap`.  
- Dynamically uses `env.NEXT_PUBLIC_URL`.
</details>

<details>
<summary>postcss.config.mjs</summary>

**Purpose**  
- PostCSS config with **Tailwind CSS** and **Autoprefixer**.
</details>

<details>
<summary>turbo.json</summary>

**Purpose**  
- Turborepo config for caching and parallelizing tasks (`build`, `dev`, `lint`).
</details>

<details>
<summary>.npmrc</summary>

**Purpose**  
- Ensures pre/post-install scripts run.  
- Strict engine checking.
</details>

<details>
<summary>README.md</summary>

**Purpose**  
- This file! Explains the structure, usage, and purpose of each directory.
</details>

<details>
<summary>.nvmrc</summary>

**Purpose**  
- Enforces a consistent Node version (`lts/iron`) for all contributors.
</details>

<details>
<summary>tsconfig.json</summary>

**Purpose**  
- TypeScript config with `strict` mode, `ESNext` modules, and `jsx` support.  
- Path alias `~/*` for cleaner imports.
</details>

<details>
<summary>env.ts</summary>

**Purpose**  
- Uses `@t3-oss/env-nextjs` + **Zod** to validate environment variables.  
- Ensures required variables are present (e.g., `AUTH_SECRET`, `POSTGRES_URL`).
</details>

<details>
<summary>biome.json</strong></summary>

**Purpose**  
- Configuration for **Biome** (lint + format).  
- Ignores unknown files, uses Git as the version control system.
</details>

<details>
<summary>next.config.ts</summary>

**Purpose**  
- Next.js config with console log removal (except `error`, `warn`, `info`).  
- Enables experimental features.  
- Disables build-blocking ESLint.  
- Sets Cloudflare caching directives.
</details>

<details>
<summary>middleware.tsx</summary>

**Purpose**  
- Global middleware for NextAuth-based authentication.  
- Adds security headers (`X-Request-ID`, `X-Nonce`).  
- Allows hooking in a Content Security Policy (CSP) if needed.
</details>

<details>
<summary>tailwind.config.ts</summary>

**Purpose**  
- Tailwind CSS configuration.  
- Dark mode via `"class"`.  
- Extends typography, includes `tailwindcss-animate`.
</details>

<details>
<summary>package.json</summary>

**Purpose**  
- Defines the project’s dependencies, devDependencies, and scripts.  
- Specifies that the project uses **pnpm** as the package manager and enforces a Node version of ^20.  
- Lists scripts for building, development, linting, and deployment tasks.
</details>

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
