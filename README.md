# 📦 Monorepo Starter

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/next.js-15%2B-black?logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" />
  <img alt="License" src="https://img.shields.io/github/license/hyi86/monorepo-starter" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10.10-F69220?logo=pnpm" />
  <img alt="Code Style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" />
</p>

A **monorepo template** designed for modern frontend development using `pnpm` and `Turborepo`.

This project is structured to allow experimentation and operation with various stacks such as `Next.js`, `React SPA`, `Hono API`, and `Vanilla JS` in a unified environment.



<br />

## 🛠️ Features

### Third-Party Dependency

- 📦 **Monorepo**: Efficiently manage projects and packages in a single repository using [`pnpm`](https://pnpm.io) and [`Turborepo`](https://turbo.build).
- 🧩 **Frontend/Backend Frameworks**:
  Includes frontend frameworks like [`Next.js`](https://nextjs.org), [`react-router(Declarative mode)`](https://reactrouter.com/start/declarative/installation), and `Vanilla JS (vite-ts)`, as well as a high-performance, lightweight backend framework [`Hono`](https://hono.dev).
- 🗄️ **Data Layer/ORM**:
  Easily and safely manage data without external APIs using [`Drizzle ORM`](https://orm.drizzle.team) based on [`SQLite`](https://www.sqlite.org).
- 🎨 **Styling**:
  [`Shadcn UI`](https://ui.shadcn.com) with [`Tailwind CSS v4`](https://tailwindcss.com) is set up in the monorepo, providing consistent and scalable styling.
- 🧪 **Testing**: Unit tests with [`Vitest`](https://vitest.dev) and E2E (end-to-end) tests with [`Playwright`](https://playwright.dev).
- 🐳 **Deployment**: Ready-to-run [`Docker`](https://www.docker.com) environment provided.
- 📜 **Code Formatting/Linting**: Integrated [`Prettier`](https://prettier.io) and [`ESLint`](https://eslint.org).
- 🔄 **Data Fetching/State Management**: Efficient data fetching and state management for both client and server environments using libraries like [`TanStack Query`](https://tanstack.com/query/latest), [`Zustand`](https://zustand-demo.pmnd.rs), and [`Nuqs`](https://nuqs.47ng.com).
- 📄 **Logging**: Fast and structured logging with [`Pino`](https://getpino.io).
- 🖍️ **Code Blocks**: Code highlighting with [`Shiki`](https://shiki.style) and real-time code editing with [`Monaco Editor`](https://github.com/microsoft/monaco-editor).
- 📦 **Others**:
  - Date and time operations with [`date-fns`](https://date-fns.org).
  - Added [`@mantine/hooks`](https://mantine.dev/hooks/package) for useful utility hooks.
  - Includes [`WebPush Notification`](https://github.com/web-push-libs/web-push) (can send on `localhost`).
  - Implement drag & drop interactions with [`Dnd Kit`](https://dndkit.com).
  - Table UI with [`TanStack Table`](https://tanstack.com/table/latest) and optimized large lists/virtualization with [`TanStack Virtual`](https://tanstack.com/virtual/latest).
  - Data schema validation with [`Zod`](https://zod.dev) and dummy data generation with [`faker.js`](https://fakerjs.dev) for improved development productivity.
  - Route exploration and AST structure analysis with [`ts-morph`](https://ts-morph.com).

### In-house Implementations

- [`hybrid-api-cache`](./apps/next-ready-stack/src/app/example/experimental/api-cache/page.tsx)
  - Custom API data cache based on the file system and local SQLite DB.
- [`large-file-upload`](./apps/next-ready-stack/src/app/example/experimental/file-upload/page.tsx)
  - Implementation for large, multi, chunked, and streaming uploads of videos and images.
- [`Unused Import Finder`](./packages/cli/src/unused-import.ts)
  - Script to find unused import statements following the `Next.js` convention.
- [`Next Component Devtools`](./apps/next-ready-stack/src/components/command/devtools.tsx)
  - Visualization tool for the `Next.js` component tree structure.
- [`Typesafe Code Generator`](./packages/utils/src/codegen.ts)
  - Whenever `src/app` changes, automatically generate all accessible routes for the app.
  - Automatically type all files in the `src/dictionaries` folder for internationalization.
- [`Authentication`](./apps/next-ready-stack/src/app/example/auth/page.mdx)
  - **Custom-built authentication system** without external libraries like `Next Auth` or `clerk`.
  - Server-only authentication system based on `JWT`.
  - Dual token structure using both `Access Token` and `Refresh Token`, with automatic renewal on token expiration.
  - Security best practices such as `HTTP Only` and `Secure Flag` applied.
- [`Internationalization`](./apps/next-ready-stack/src/app/example/[lang]/page.tsx)
  - **Custom-built** i18n feature without external libraries like `next-intl` or `react-i18next`.
  - Designed for easy internationalization of selected pages.

<br />

## 🚀 Getting Started

```bash
git clone https://github.com/hyi86/monorepo-starter.git
cd monorepo-starter
pnpm install
pnpm run cli init # drizzle-related files that appear after this command are optional to push
pnpm dev
```

<br />

## 📂 Directory Structure

### `apps`
- [`hono-api`](./apps/hono-api/README.md): Mock API server based on Hono
- [`next-ready-stack`](./apps/next-ready-stack/README.md): Web application based on Next.js
- [`single-page-react`](./apps/single-page-react/README.md): SPA (React Router Declarative) web application
- [`vanilla-ts`](./apps/vanilla-ts/README.md): Vanilla JS-based web application

### `packages`
- [`cli`](./packages/cli/README.md): Common CLI scripts
- [`eslint-config`](./packages/eslint-config/README.md): Shared ESLint configuration
- [`typescript-config`](./packages/typescript-config/README.md): Shared TypeScript configuration
- [`ui`](./packages/ui/README.md): Shared UI components
- [`utils`](./packages/utils/README.md): Shared utility functions

<br />

## 📦 Examples

- [`Next.js Caching`](./apps/next-ready-stack/src/app/example/cache/page.mdx)
  - Basic usage examples of `data cache`, `full route cache`, and `ISR`
- [`Code Block and Editor`](./apps/next-ready-stack/src/app/example/code-block/page.mdx)
  - Syntax highlighting with `shiki`: word/line highlight, warning/error display, automatic line numbers, theme support, etc.
  - `MDX` integration: automatic code block highlighting in markdown
  - Code editor implementation based on `Monaco Editor`
  - Filesystem-based panel: real-time code editing, highlighting, copy, open in editor, and more
- [`Local Database`](./apps/next-ready-stack/src/app/example/db/page.mdx)
  - Local database built with `Drizzle ORM` and `Sqlite`
  - Real-time data updates, cache invalidation, and type safety
  - Random data generation with `faker.js`
- [`Drag and Drop Sortable`](./apps/next-ready-stack/src/app/example/dnd/page.mdx)
  - Sortable UI implemented with [`@dnd-kit/sortable`](https://docs.dndkit.com/presets/sortable)
  - Examples for horizontal, vertical, and grid sortable lists
  - Keyboard navigation for accessibility
- [`Server Action & react-hook-form`](./apps/next-ready-stack/src/app/example/form/page.mdx)
  - Various usage examples of `Server Action` and `Server Component`
  - Form validation with `zod`
  - Client-side form state management with `react-hook-form`
  - Example of client-side form state management using `useOptimistic`
  - Examples using various technologies such as `Virtual List`, `Drag and Drop`, `Nested List`, etc.
- [`Nuqs State management`](./apps/next-ready-stack/src/app/example/nuqs/page.mdx)
  - Basic usage and examples of `nuqs`
  - Demo of various query parameter handling methods
  - Query management in client/server/hybrid environments
  - Practical patterns and tips for real-world usage
- [`Web Push Notification`](./apps/next-ready-stack/src/app/example/push/page.mdx)
  - Basic usage and examples of `web-push`
  - Includes `service-worker`
- [`Tanstack Query SSR`](./apps/next-ready-stack/src/app/example/query/page.mdx)
  - Basic usage and examples of `Tanstack Query`
    - **Prefetching**: Fetch query data on the server and deliver it to the client
    - **Streaming**: Example of handling multiple queries in a streaming manner with Suspense
  - Various usage patterns for query options, caching, data fetching, and real-world scenarios
- [`Next.js Advanced Routing`](./apps/next-ready-stack/src/app/example/route/page.mdx)
  - Practical examples of advanced routing features in Next.js
    - **Parallel Routes**: Routing pattern for rendering multiple UI areas in parallel
    - **Intercepting Routes**: Pattern for intercepting existing route flows
- [`Table`](./apps/next-ready-stack/src/app/example/table/page.mdx)
  - Practical examples of various Table UI/UX patterns
  - Utilizes libraries such as `Tanstack Table`, `Shadcn/ui`, and `Nuqs`
    - **Server Basic**: Basic table rendering with server components
    - **Server Controls**: Filtering, sorting, pagination, and other controls with server components
    - **Client Full**: Data grid with client components
      - Includes filtering, sorting, pagination, row/column selection, resizing, fixed rows/columns, virtualization, drag & drop, and more
- [`Virtual List`](./apps/next-ready-stack/src/app/example/virtual/page.mdx)
  - Practical examples of rendering performance optimization for large lists/grids
    - **Fixed Row/Column/Grid**: Virtual scrolling for fixed-size rows/columns/grids
    - **Fixed Masonry (Vertical/Horizontal)**: Fixed-type virtualization for Masonry layouts
    - **Dynamic Row/Column/Grid**: Virtualization for dynamic (variable) size rows/columns/grids
    - **Infinite Scroll**: Infinite scroll-based data loading and virtualization
    - **Sortable Row/Column**: Combination of drag & drop sorting and virtualization for rows/columns
    - **Parallel Route**: Practical examples of rendering performance optimization for large lists/grids
  - Each example includes advanced patterns frequently used in real-world scenarios, such as scroll/render optimization, drag & drop, Masonry, infinite scroll, etc.
- [`Zustand State Management`](./apps/next-ready-stack/src/app/example/zustand/page.mdx)
  - Example of basic usage of `zustand` in server components

<br />

## 🚀 Run Docker in Production

The following applications are configured to run as Docker containers out of the box:

- [`hono-api`](./apps/hono-api/Dockerfile)
- [`next-ready-stack`](./apps/next-ready-stack/Dockerfile)
- [`single-page-react`](./apps/single-page-react/Dockerfile)
```bash
# If using `colima`, allocate memory with `colima start --memory 4` (default is 2GB)
colima start --memory 4

docker network ls | grep base_network # Check network
docker network create base_network # Create network if not exists

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build # Build all
docker-compose up -d # Run
docker-compose down # Stop

# Or to run individually,
docker-compose build ${APP_NAME}
docker-compose up -d ${APP_NAME}

# Access container
# (NOTE: '/bin/bash' assumes the container has bash installed. If not, use '/bin/sh')
docker-compose exec ${APP_NAME} /bin/bash

# View container logs
docker-compose logs -f
```

<br />

## 🌍 Goals

- Test various stack combinations
- Build modular patterns applicable to real projects
- Provide a base for rapid prototyping and validation
- Serve as a starting point for open source or side projects
- Experiment with and validate the latest web development trends and tech stacks
- Design an architecture that is scalable and easy to maintain 
