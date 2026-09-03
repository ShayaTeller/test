# Design Document — website-redesign

## Overview

The goal is to transform the current monolithic `Homepage.tsx` (≈ 300 lines of mixed markup, state, and logic) into a composable, maintainable component tree, while simultaneously upgrading the visual design system to a more polished, professional aesthetic.

Two concerns are addressed in parallel:

1. **Structural decomposition** — `Homepage.tsx` is reduced to a thin layout shell that imports and composes 12 focused section components, each living in `src/components/sections/`.
2. **Design system upgrade** — `homepage.css` gains named accent tokens, a fluid `clamp()` typographic scale, logical RTL CSS properties, and spacing tokens so every section shares a consistent visual rhythm.

No routing, no third-party state management, and no new dependencies are introduced. All static content stays in `constats.ts`; interactive state stays local to the component that owns it.

---

## Architecture

### Component Tree

```
App.tsx
└── Homepage.tsx          ← layout shell: <main dir="rtl" className="possible-page">
    ├── TopbarSection
    ├── HeroSection
    ├── ServicesSection
    ├── IdeaSection
    ├── ProcessSection
    ├── WhyUsSection
    ├── BannerSection
    ├── AudienceSection
    ├── AboutSection
    ├── PreFormSection
    ├── ContactSection     ← owns form state (useState)
    └── FooterSection
```

`Homepage.tsx` retains only its `<main>` wrapper and the 12 component imports. All JSX content lives inside the section components.

### Data Flow

```
constats.ts
  ├── services        → ServicesSection (props-free; direct import)
  ├── processSteps    → ProcessSection  (props-free; direct import)
  ├── reasons         → WhyUsSection    (props-free; direct import)
  ├── audienceList    → AudienceSection (props-free; direct import)
  └── initialForm     → ContactSection  (props-free; direct import + useState initialiser)
```

Each section component imports only the arrays it needs directly from `constats.ts`. No props are threaded through `Homepage.tsx` — the layout shell acts purely as a compositor, not a data provider.

### State

Only `ContactSection` holds local state:

```ts
const [formData, setFormData] = useState(initialForm);
const [isSubmitted, setIsSubmitted] = useState(false);
```

All other sections are stateless functional components.

---

## Components and Interfaces

All section components are **default exports** from `src/components/sections/`. They accept no props (unless noted) and import data directly.

### `TopbarSection`

- Renders the topbar nav bar with the brand logo (`public/myLogo.png`).
- Logo: `width: 160px` desktop, `width: 120px` at `≤ 680px`.
- No interactive state.

### `HeroSection`

- Eyebrow label, `<h1>`, lead paragraph, CTA row (two anchors).
- Orbit visual: two rings, four emoji nodes, `orbit-core` containing `<img src="public/myLogo.png" alt="" />`.
- Two-column grid collapses to single column at `960px`.
- CTA row stacks vertically at `680px`.

### `ServicesSection`

- Imports `services` from `constats.ts`.
- Maps to `<article>` cards in a 3-col / 2-col / 1-col responsive grid.

### `IdeaSection`

- Static: idea headline + four `step-pill` elements.
- Two-column grid collapses at `960px`.

### `ProcessSection`

- Imports `processSteps` from `constats.ts`.
- Renders a vertical timeline. Connector line hidden at `680px`.

### `WhyUsSection`

- Imports `reasons` from `constats.ts`.
- 3-col grid collapses to 2-col at `960px`, 1-col at `680px`.

### `BannerSection`

- Fully static CTA banner with gradient backdrop.

### `AudienceSection`

- Imports `audienceList` from `constats.ts`.
- 2-col checklist grid collapses to 1-col at `680px`.

### `AboutSection`

- Static copy + three `mini-stat` cards in right panel.
- Two-column grid collapses at `960px`.

### `PreFormSection`

- Static pre-form CTA box.

### `ContactSection`

- Owns form state (`formData`, `isSubmitted`).
- On submit: sets `isSubmitted = true`, resets `formData` to `initialForm`.
- Success message: `role="status"` and `aria-live="polite"`.
- All four fields (`fullName`, `phone`, `email`, `message`) marked `required`.

**Internal interface:**
```ts
type FormData = typeof initialForm;
// { fullName: string; phone: string; email: string; projectType: string; message: string }
```

### `FooterSection`

- Logo: `width: 170px` desktop, `width: 130px` at `≤ 680px`.
- Logo alt text: `"POSSIBLE"` (sole brand identifier in footer).
- Nav links + copyright.

---

## Data Models

### `Service` (from `constats.ts`)

```ts
type Service = {
  icon: string;      // emoji
  title: string;
  description: string;
};
```

### `ProcessStep`

```ts
type ProcessStep = {
  step: string;   // "שלב 01" … "שלב 07"
  title: string;
  text: string;
};
```

### `Reason`

```ts
type Reason = {
  icon: string;
  title: string;
  text: string;
};
```

### `FormData`

```ts
type FormData = {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
};
```

`initialForm` in `constats.ts` serves as the canonical default and the reset target after submission.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The following properties cover the two areas where universal, input-varying logic exists in this feature: the contact form state machine and the data-driven rendering loops. The remaining invariants (logo alt text, RTL attribute, reduced-motion CSS rule) are fixed structural checks that do not vary with input; they are captured as example-based tests in the Testing Strategy instead.

---

### Property 1: Form reset round-trip

*For any* valid set of user-entered form values, submitting the contact form SHALL result in every field of `formData` equalling the corresponding field in `initialForm`.

**Validates: Requirements 6.2**

---

### Property 2: Success message lifecycle

*For any* valid form submission followed by *any* `onChange` event on any field, `isSubmitted` SHALL be `true` immediately after submission and SHALL become `false` after the first `onChange` event fires.

**Validates: Requirements 6.2**

---

### Property 3: Services card count invariant

*For any* non-empty array of `Service` objects passed as the `services` data, the number of `<article>` elements rendered by `ServicesSection` SHALL equal `services.length`.

**Validates: Requirements 4.1**

---

### Property 4: Process step count invariant

*For any* array of `ProcessStep` objects passed as the `processSteps` data, the number of timeline item elements rendered by `ProcessSection` SHALL equal `processSteps.length`.

**Validates: Requirements 5.1**

---

## Design System (`homepage.css`)

### Colour Palette — CSS Custom Properties on `.possible-page`

```css
.possible-page {
  /* Base */
  --navy:        #071426;
  --navy-soft:   #101f34;

  /* Surfaces */
  --card:        rgba(15, 27, 42, 0.8);
  --card-strong: #101c2d;

  /* Borders */
  --line:        rgba(148, 163, 184, 0.18);

  /* Text */
  --text:        #ecf3ff;
  --muted:       #aab8d1;
  --white:       #f6f9ff;

  /* Accent (replaces cyan-to-purple gradient on primary CTA) */
  --accent:      #2563eb;        /* single named accent token */
  --accent-glow: rgba(37, 99, 235, 0.35);

  /* Legacy palette tokens (kept for orbit, card tops, etc.) */
  --blue:        #2563eb;
  --cyan:        #06b6d4;
  --purple:      #7c3aed;

  /* Elevation */
  --shadow:      0 25px 60px rgba(5, 12, 24, 0.45);

  /* Spacing tokens */
  --section-padding: 100px 0;
  --card-gap:        22px;
}
```

The primary CTA button replaces the `linear-gradient(135deg, var(--cyan), var(--blue) 40%, var(--purple))` background with `background: var(--accent)` so it reads as a confident, solid action colour.

### Typography Scale

All heading and body sizes use `clamp()` for fluid scaling between mobile and desktop:

| Token / selector | Formula | Range |
|---|---|---|
| `h1` (hero) | `clamp(3rem, 5vw, 5.6rem)` | 48 px → 89.6 px |
| `h2` (section heading) | `clamp(2.1rem, 4vw, 3.2rem)` | 33.6 px → 51.2 px |
| `h3` (card title) | `clamp(1.3rem, 2vw, 1.5rem)` | 20.8 px → 24 px |
| `p` body | `1rem` / `line-height: 1.8` | 16 px fixed |
| `.lead` | `1.2rem` / `line-height: 1.8` | 19.2 px |

All headings rendered through `.section-heading h2` pick up the scale automatically.

### Spacing Tokens

```css
--section-padding: 100px 0;   /* .section { padding: var(--section-padding) } */
--card-gap:        22px;       /* used in .services-grid, .benefits-grid gaps */
```

At `≤ 680px` the section padding reduces to `80px 0` via the existing media query.

### Logical CSS Properties

All directional CSS is migrated to logical properties so RTL direction is respected automatically:

| Physical (old) | Logical (new) |
|---|---|
| `padding-right` | `padding-inline-end` |
| `padding-left` | `padding-inline-start` |
| `right` | `inset-inline-end` |
| `left` | `inset-inline-start` |

Specific migration targets:
- `.timeline-item { padding-inline-end: 64px }` (was `padding-right`)
- `.timeline::before` — `inset-inline-end: 26px` (was `right: 26px`)
- `.node-one … .node-four` — `inset-inline-start` / `inset-inline-end` for orbit node positioning

### Primary Button Upgrade

```css
.primary-button {
  background: var(--accent);
  box-shadow: 0 18px 25px var(--accent-glow);
}

.primary-button:hover,
.primary-button:focus-visible {
  filter: brightness(1.12);
  transform: translateY(-2px);
  transition: filter 200ms ease, transform 200ms ease, box-shadow 200ms ease;
}
```

`filter: brightness(1.12)` satisfies the "increases in brightness" hover requirement. The transition completes within `200ms` per the requirement.

### Logo Sizing

```css
/* TopbarSection */
.logo { width: 160px; }

@media (max-width: 680px) {
  .logo { width: 120px; }
}

/* FooterSection */
.footer-logo { width: 170px; }

@media (max-width: 680px) {
  .footer-logo { width: 130px; }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Responsive Layout Strategy

### Breakpoints

| Breakpoint | Target |
|---|---|
| `> 960px` | Desktop — multi-column grids active |
| `≤ 960px` | Tablet — two-column grids, hero/idea/about/footer collapse to 1-col |
| `≤ 680px` | Mobile — all grids collapse to 1-col, CTA stacks, timeline simplifies |

### Grid Collapse Map

```
                     Desktop        Tablet (≤960)   Mobile (≤680)
hero-grid            1.18fr 0.82fr  1fr             1fr
idea-layout          0.9fr 1.1fr    1fr             1fr
about-grid           1.2fr 0.8fr    1fr             1fr
footer-grid          1.1fr 1fr 0.5fr 1fr            1fr
services-grid        repeat(3,1fr)  repeat(2,1fr)   1fr
benefits-grid        repeat(3,1fr)  repeat(2,1fr)   1fr
audience-list        repeat(2,1fr)  repeat(2,1fr)   1fr
form-grid            repeat(2,1fr)  repeat(2,1fr)   1fr
idea-flow-steps      repeat(4,1fr)  repeat(4,1fr)   1fr
timeline-item        120px 1fr      120px 1fr       1fr (connector hidden)
```

### RTL Source Order

In the hero section's two-column grid, the copy column (`hero-copy`) is listed first in source order. At `≤ 960px`, collapsing to a single column naturally renders copy above the visual — matching the requirement without needing `order` overrides.

---

## File Structure

```
src/
  components/
    Homepage.tsx                     ← thin compositor shell
    constats.ts                      ← unchanged; all static data
    sections/
      TopbarSection.tsx
      HeroSection.tsx
      ServicesSection.tsx
      IdeaSection.tsx
      ProcessSection.tsx
      WhyUsSection.tsx
      BannerSection.tsx
      AudienceSection.tsx
      AboutSection.tsx
      PreFormSection.tsx
      ContactSection.tsx
      FooterSection.tsx
  styles/
    homepage.css                     ← updated design system + all component styles
```

All 12 section files are `.tsx`. There is no per-component CSS file — styles remain co-located in `homepage.css` per the project conventions.

### Resulting `Homepage.tsx` Shape

```tsx
import '../styles/homepage.css';
import TopbarSection    from './sections/TopbarSection';
import HeroSection      from './sections/HeroSection';
import ServicesSection  from './sections/ServicesSection';
import IdeaSection      from './sections/IdeaSection';
import ProcessSection   from './sections/ProcessSection';
import WhyUsSection     from './sections/WhyUsSection';
import BannerSection    from './sections/BannerSection';
import AudienceSection  from './sections/AudienceSection';
import AboutSection     from './sections/AboutSection';
import PreFormSection   from './sections/PreFormSection';
import ContactSection   from './sections/ContactSection';
import FooterSection    from './sections/FooterSection';

export default function Homepage() {
  return (
    <main className="possible-page" dir="rtl">
      <TopbarSection />
      <HeroSection />
      <ServicesSection />
      <IdeaSection />
      <ProcessSection />
      <WhyUsSection />
      <BannerSection />
      <AudienceSection />
      <AboutSection />
      <PreFormSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
```

---

## Error Handling

### Contact Form Validation

HTML5 native validation handles the empty-field case (`required` attribute). No custom error UI is added. The browser's built-in constraint validation bubble is sufficient for the MVP and avoids duplicating validation logic.

When submission is successful:
- `isSubmitted` flips to `true` → success message renders with `role="status"` and `aria-live="polite"`.
- `formData` is reset to `initialForm` (including the `projectType` select back to `"אתר תדמית"`).
- `isSubmitted` resets to `false` on the next `onChange` event (user begins a new submission), achieved via:
  ```ts
  const handleChange = (e: React.ChangeEvent<...>) => {
    setIsSubmitted(false);
    setFormData(curr => ({ ...curr, [e.target.name]: e.target.value }));
  };
  ```

### Empty `services` Array

If `services` is empty, `ServicesSection` renders the section container with an empty `<div className="services-grid">` — no error, no placeholder, no crash. Same pattern applies to `processSteps`, `reasons`, and `audienceList`.

---

## Accessibility Patterns

### Section Labels

Every `<section>` that has a visible heading uses that heading as the implicit label. No extra `aria-label` is required unless the heading is hidden. No headings are hidden via `display:none` or `aria-hidden` in this design.

The hero's orbit visual carries `aria-label="תהליך רעיון למציאות"` on its wrapper `<div>` since it has no visible heading.

### Logo Alt Text

| Location | Usage | `alt` |
|---|---|---|
| Topbar | Decorative (brand name visible elsewhere or implied by context) | `""` |
| Hero orbit-core | Purely decorative | `""` |
| Footer | Sole brand identifier in that region | `"POSSIBLE"` |

### Form Accessibility

Each input, select, and textarea is associated with its label via a **wrapping `<label>`** element — the label wraps both the `<span>` and the control, so no explicit `htmlFor`/`id` pairing is required. This satisfies WCAG Success Criterion 1.3.1.

### Success Message

```tsx
{isSubmitted && (
  <div className="success-message" role="status" aria-live="polite">
    <p>קיבלנו את הפרטים שלכם!</p>
    <p>נחזור אליכם בהקדם ונבדוק איך אפשר להפוך את הרעיון שלכם למציאות.</p>
  </div>
)}
```

`role="status"` is an implicit live region. Combined with `aria-live="polite"`, screen readers announce the message after the current interaction completes.

### Keyboard Navigation

- All interactive elements (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`) are natively focusable.
- `focus-visible` pseudo-class is used on all hover/focus rules so keyboard users see the focus ring while mouse users do not.
- `prefers-reduced-motion` media query disables all transitions and animations for users who have enabled the OS preference.

### Contrast

The palette maintains a minimum 4.5:1 contrast ratio (WCAG 2.1 AA SC 1.4.3) for all body text:

| Text token | Background | Approx ratio |
|---|---|---|
| `--text` (#ecf3ff) | `--navy` (#071426) | ≈ 16:1 |
| `--muted` (#aab8d1) | `--navy` (#071426) | ≈ 7.2:1 |
| `--white` (#f6f9ff) | `--accent` (#2563eb) | ≈ 4.6:1 |

Full validation requires manual testing with assistive technologies and expert accessibility review.

---

## Testing Strategy

Property-based testing is **not applicable** to this feature. The work consists entirely of:

- UI rendering (React component decomposition)
- CSS design system changes (visual, not algorithmic)
- A simple controlled form with HTML5 validation

None of these produce pure functions with universal input/output properties suitable for PBT. The appropriate testing strategy is:

### Unit / Integration Tests (Example-Based)

| Area | What to test | How |
|---|---|---|
| `ContactSection` submit | Form resets to `initialForm` after submission | React Testing Library — simulate submit, assert field values match `initialForm` |
| `ContactSection` success message | `role="status"` element appears after submit | RTL — query by role `"status"` |
| `ContactSection` success message hides | Message disappears when user starts typing | RTL — simulate `onChange`, assert element gone |
| `ServicesSection` card count | Renders one `<article>` per `services` entry | RTL — assert `getAllByRole('article').length === services.length` |
| `ServicesSection` empty array | Renders no cards, no crash | RTL — render with empty `services`, assert no articles |
| `ProcessSection` item count | Renders one item per `processSteps` entry | RTL — assert count |
| Logo alt text | Footer logo has `alt="POSSIBLE"` | RTL — `getByAltText('POSSIBLE')` |
| Logo alt text | Topbar logo has `alt=""` | RTL — `getByRole('img', { name: '' })` |

### Visual / Snapshot Tests

Snapshot tests on each section component catch unintended JSX structure regressions during future refactors. These are lightweight and run alongside unit tests.

### Manual Accessibility Check

- Tab through the full page and verify focus ring is visible on all interactive elements.
- Test form submission with a screen reader (NVDA / VoiceOver) to confirm success message is announced.
- Verify logo alt text with browser accessibility tree inspector.
- Run Lighthouse or axe-core DevTools audit for automated contrast and ARIA checks.

### No Test Framework Currently Exists

Per project notes, no test framework is set up. When adding tests, **Vitest** (already compatible with Vite 7) and **React Testing Library** are the natural choices:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/user-event jsdom
```

Tests would live in `src/components/sections/__tests__/`.
