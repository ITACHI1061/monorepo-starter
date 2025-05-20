## Getting Started

Install Dependencies

```bash
pnpm i
```

Create `.env` file (Optional)

```bash
cp .env.example .env
```

Create Local SQLite

```bash
pnpm db:generate # Create sql files in `drizzle/` folder
pnpm db:migrate  # Run sql files in `drizzle/` folder
```

Run Development Server

```bash
pnpm dev
```

## Build & Run in Local

```bash
pnpm build
pnpm start
```

## Open Drizzle-kit Studio

```bash
pnpm studio
```
