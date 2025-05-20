## Getting Started

### Install Dependencies

```bash
pnpm i
```

### Create `.env` File

```bash
cp .env.example .env
```

After creating the file, refer to `.env.example` and fill in the required values.

### Set Up Local SQLite Database

```bash
pnpm db:generate # Generate SQL files in the `drizzle/` folder
pnpm db:migrate  # Run SQL files in the `drizzle/` folder
```

## Run Development Server

```bash
pnpm dev
```

## Build & Run Locally

```bash
pnpm build
pnpm start
```
