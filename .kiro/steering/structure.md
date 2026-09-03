# Project Structure

```
src/
  App.tsx                   # Root component — renders <Homepage /> only
  main.tsx                  # React entry point
  index.css                 # Global resets / base styles
  App.css                   # (mostly unused)
  components/
    Homepage.tsx            # Single-page layout with all sections
    constats.ts             # Static data arrays (services, processSteps, reasons, audienceList, initialForm)
  styles/
    homepage.css            # All component-level styles for Homepage
  assets/
    react.svg               # (default Vite asset, not used in UI)

public/
  myLogo.png                # Brand logo — referenced as public/myLogo.png in JSX
  vite.svg
```

## Conventions

- **One component per file**; component files use `.tsx`, pure data/logic files use `.ts`.
- **Static data lives in `constats.ts`** (note the typo — keep it consistent). Add new content arrays there rather than inline in JSX.
- **Styles are co-located** in `src/styles/` as plain CSS files imported directly into the component. No CSS Modules, no styled-components.
- **CSS custom properties** are declared on `.possible-page` and used throughout `homepage.css`. Extend the palette by adding variables there.
- All layout uses **CSS Grid and Flexbox** — no utility-class layouts.
- Responsive breakpoints: `960px` (tablet) and `680px` (mobile).
- The entire page uses **RTL direction** (`dir="rtl"` on `<main>`). Keep all new sections RTL-aware.
- Image paths use `public/myLogo.png` (relative, not absolute `/myLogo.png`) inside JSX — be consistent when adding new images.
