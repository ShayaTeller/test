# Tech Stack

## Core
- **React 19** with TypeScript (`.tsx` / `.ts`)
- **Vite 7** — build tool and dev server
- **Tailwind CSS 4** — installed but not actively used yet; styling is done via plain CSS files
- **PostCSS** with Autoprefixer

## Language & Typing
- TypeScript `~5.9`, strict mode via `tsconfig.app.json`
- `type` imports preferred (`import { type FormEvent }`)

## Linting
- ESLint 9 with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Config: `eslint.config.js` (flat config format)

## Common Commands

```bash
# Start dev server
npm run dev

# Production build (runs tsc then vite build)
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Notes
- No test framework is set up.
- No routing library — single-page, single-component layout.
- No state management library; local `useState` only.
- No form library; forms are handled manually with controlled inputs.
