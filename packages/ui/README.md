## Usage

How to use in each project

<br />

### Add to a Next.js Project

> Tailwind CSS must be set up in advance.

Install the package within the workspace:

```bash
pnpm add --workspace @monorepo-starter/ui
```

Edit `tsconfig.json`:

```diff
{
  "compilerOptions": {
    ...
    "paths": {
-     "~/*": ["./src/*"]
+     "~/*": ["./src/*"],
+     "@monorepo-starter/ui/*": ["../../packages/ui/src/*"]
    }
  },
  ...
}
```

Edit `next.config.ts`:

```diff
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
+ transpilePackages: ['@monorepo-starter/ui'],
};

export default nextConfig;
```

Edit `src/app/layout.tsx`:

```diff
import type { Metadata } from 'next';
import './globals.css';

// Import after globals.css
+import '@monorepo-starter/ui/globals.css';
...
```

<br />

### Add to a React Router Project

> Tailwind CSS must be set up in advance.

Install the package within the workspace:

```bash
pnpm add --workspace @monorepo-starter/ui
```

Edit `tsconfig.json` or `tsconfig.app.json`:

```diff
{
  "compilerOptions": {
    ...
    "paths": {
-     "~/*": ["./src/*"]
+     "~/*": ["./src/*"],
+     "@monorepo-starter/ui/*": ["../../packages/ui/src/*"]
    }
  },
  ...
}
```

Edit `app/root.tsx` or `src/main.tsx`:

```diff
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import './app.css';

// Import after globals.css
+import '@monorepo-starter/ui/globals.css';
...
```

<br />
<br />

## Update

Update shadcn/ui components to the latest version:

```bash
# Install the latest version
pnpm dlx shadcn@canary add -a -o -y

# Handle calendar component separately (restore if needed)
git restore src/components/calendar.tsx

# Update cmdk and react-day-picker to the latest version
pnpm rm cmdk react-day-picker
pnpm add cmdk react-day-picker

# Formatting
pnpm -w run format "packages/ui/**/*.*"
```

## Re-initialize

Re-initialize `package.json`:

```bash
cat <<'EOF' > package.json
{
  "name": "@monorepo-starter/ui",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./postcss.config": "./postcss.config.mjs",
    "./components/*": "./src/components/*.tsx",
    "./composites/*": "./src/composites/*.tsx",
    "./hooks/*": "./src/hooks/*.ts",
    "./lib/*": "./src/lib/*.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit",
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {},
  "devDependencies": {}
}
EOF
```

### Basic Setup

Install dependencies:

```bash
pnpm install

# Workspace dependencies
pnpm add --workspace -D @monorepo-starter/eslint-config @monorepo-starter/typescript-config
# Basic dependencies
pnpm add react react-dom
# Basic dev dependencies
pnpm add -D @types/node @types/react @types/react-dom
```

Create `eslint.config.mjs`, `tsconfig.json`, and `tsconfig.lint.json`:

```bash
cat <<'EOF' > eslint.config.mjs
import { config } from '@monorepo-starter/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
EOF

cat <<'EOF' > tsconfig.json
{
  "extends": "@monorepo-starter/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "rootDir": "src",
    "paths": {
      "@monorepo-starter/ui/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF

cat <<'EOF' > tsconfig.lint.json
{
  "extends": "@monorepo-starter/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src", "turbo"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

### Tailwind CSS

> Reference: https://tailwindcss.com/docs/installation/using-postcss

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

Create `postcss.config.mjs`:

```bash
cat <<'EOF' > postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
EOF
```

Create `src/styles/globals.css`:

```bash
mkdir -p src/styles && cat <<'EOF' > src/styles/globals.css
@import 'tailwindcss';
EOF
```

### Shadcn UI

> Reference: https://ui.shadcn.com/docs/installation/manual

```bash
pnpm add class-variance-authority clsx lucide-react
pnpm add -D tailwind-merge tw-animate-css
```

Add the contents of `src/styles/*.css` from the reference documentation:

```bash
curl -o src/styles/globals.css https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/app/globals.css
curl -o src/styles/themes.css https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/app/themes.css
```

Add to `src/styles/globals.css`:

```diff
...
-@import './themes.css';
+@source "../../../apps/**/*.{ts,tsx}";
+@source "../../../components/**/*.{ts,tsx}";
+@source "../**/*.{ts,tsx}";
```

Add `src/lib/utils.ts`:

```bash
mkdir -p src/lib && cat <<'EOF' > src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF
```

Add `components.json`:

```bash
cat <<'EOF' > components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@monorepo-starter/ui/components",
    "utils": "@monorepo-starter/ui/lib/utils",
    "ui": "@monorepo-starter/ui/components",
    "lib": "@monorepo-starter/ui/lib",
    "hooks": "@monorepo-starter/ui/hooks"
  },
  "iconLibrary": "lucide"
}
EOF
```

Run the following commands:

```bash
# Add all components
pnpm dlx shadcn@canary add -a -o -y

# Add improved calendar
curl -o src/components/calendar.tsx https://raw.githubusercontent.com/origin-space/originui/refs/heads/main/registry/default/ui/calendar.tsx
curl -o src/components/select-native.tsx https://raw.githubusercontent.com/origin-space/originui/refs/heads/main/registry/default/ui/select-native.tsx
https://raw.githubusercontent.com/origin-space/originui/refs/heads/main/registry/default/ui/multiselect.tsx

# Reinstall react-day-picker
pnpm rm react-day-picker
pnpm add react-day-picker
```
