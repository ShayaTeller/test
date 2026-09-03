# Implementation Plan: website-redesign

## Overview

Decompose the monolithic `Homepage.tsx` into 12 focused section components, and upgrade `homepage.css` with a refined design system (accent tokens, spacing tokens, fluid typography, logical RTL properties, primary button upgrade, logo sizing, and reduced-motion). The build must pass `tsc + vite build` at the end.

## Tasks

- [x] 1. Upgrade the CSS Design System in `homepage.css`
  - [x] 1.1 Add `--accent`, `--accent-glow`, `--section-padding`, and `--card-gap` CSS custom properties to `.possible-page`
    - Keep all existing palette tokens (`--navy`, `--cyan`, `--blue`, `--purple`, etc.) intact
    - Add `--accent: #2563eb` and `--accent-glow: rgba(37, 99, 235, 0.35)` as named accent tokens
    - Add `--section-padding: 100px 0` and `--card-gap: 22px` spacing tokens
    - _Requirements: 2.1, 2.5_

  - [x] 1.2 Replace gradient on `.primary-button` with `var(--accent)` and update hover/focus styles
    - Set `background: var(--accent)` and `box-shadow: 0 18px 25px var(--accent-glow)` on `.primary-button`
    - Update `.primary-button:hover, .primary-button:focus-visible` to use `filter: brightness(1.12)` and `transform: translateY(-2px)` with a `200ms` transition
    - _Requirements: 2.1, 2.6_

  - [x] 1.3 Apply `clamp()` fluid typography scale to heading and body selectors
    - `h1` (hero): `clamp(3rem, 5vw, 5.6rem)`
    - `.section-heading h2`: `clamp(2.1rem, 4vw, 3.2rem)`
    - `.service-card h3, .benefit-card h3`: `clamp(1.3rem, 2vw, 1.5rem)`
    - `p` body: `1rem` / `line-height: 1.8`
    - _Requirements: 2.2_

  - [x] 1.4 Migrate physical CSS directional properties to logical properties
    - `.timeline-item`: `padding-right` → `padding-inline-end: 64px`
    - `.timeline::before`: `right: 26px` → `inset-inline-end: 26px`
    - `.node-one … .node-four`: replace `left`/`right` with `inset-inline-start`/`inset-inline-end`
    - _Requirements: 7.2_

  - [x] 1.5 Update logo sizing rules and footer background
    - `.logo { width: 160px }` on desktop, `width: 120px` at `≤ 680px`
    - `.footer-logo { width: 170px }` on desktop, `width: 130px` at `≤ 680px`
    - _Requirements: 2.4_

  - [x] 1.6 Ensure `prefers-reduced-motion` media query sets both `animation-duration` and `transition-duration` to `0.01ms`
    - Verify the existing rule covers `transition-duration: 0.01ms !important` in addition to `animation-duration`
    - _Requirements: 8.6_

- [ ] 2. Create the `src/components/sections/` directory and stateless section components
  - [-] 2.1 Create `TopbarSection.tsx`
    - Renders the topbar `<div>` with `.topbar-inner` container and brand logo `<img src="public/myLogo.png" alt="" className="logo" />`
    - Wraps brand in `<a href="#home">` with `aria-label="POSSIBLE home page"`
    - _Requirements: 1.1, 1.2, 8.2_

  - [-] 2.2 Create `HeroSection.tsx`
    - Renders `<section id="home" className="hero section">` with two-column `.hero-grid`
    - Copy column: eyebrow, `<h1>`, `.lead` paragraph, `.cta-row` with two anchor links
    - Visual column: `.logo-orbit` with two rings, `orbit-core` containing `<img src="public/myLogo.png" alt="" />`, and four `.orbit-node` emoji elements
    - _Requirements: 1.1, 1.2, 3.1, 3.2, 8.2_

  - [-] 2.3 Create `ServicesSection.tsx`
    - Imports `services` from `../../components/constats`
    - Renders `<section id="services" className="section">` with `.section-heading` and `.services-grid`
    - Maps each entry to `<article className="service-card">` with icon, title, and description
    - Renders empty `.services-grid` (no crash, no placeholder) when array is empty
    - _Requirements: 1.1, 1.2, 1.4, 4.1, 4.3, 4.4_

  - [-] 2.4 Create `IdeaSection.tsx`
    - Renders fully static `<section className="section idea-section">` with `.idea-layout`
    - Left: `.idea-copy` with `<h2>` and `<p>`; right: `.idea-flow-steps` with four `.step-pill` elements
    - _Requirements: 1.1, 1.2_

  - [-] 2.5 Create `ProcessSection.tsx`
    - Imports `processSteps` from `../../components/constats`
    - Renders `<section id="process" className="section">` with `.timeline`
    - Maps each entry to `<article className="timeline-item">` with `.timeline-marker` (step label) and `.timeline-content` (title + text)
    - Uses `padding-inline-end` for timeline item inset (logical property)
    - _Requirements: 1.1, 1.2, 1.4, 5.1, 5.3, 5.4_

  - [~] 2.6 Create `WhyUsSection.tsx`
    - Imports `reasons` from `../../components/constats`
    - Renders `<section id="why-us" className="section">` with `.section-heading` and `.benefits-grid`
    - Maps each entry to `<article className="benefit-card">` with icon, title, and text
    - _Requirements: 1.1, 1.2, 1.4_

  - [~] 2.7 Create `BannerSection.tsx`
    - Renders fully static `<section className="section banner-section">` with `.banner-box` and `.banner-content`
    - Includes `<h2>`, lead `<p>`, and `.banner-cta` block with span, `<h3>`, and primary CTA anchor
    - _Requirements: 1.1, 1.2_

  - [~] 2.8 Create `AudienceSection.tsx`
    - Imports `audienceList` from `../../components/constats`
    - Renders `<section className="section audience-section">` with `.audience-list`
    - Maps each string to `.audience-item` with checkmark span and `<p>`
    - Includes `.audience-footer` with `<h3>` and secondary CTA anchor
    - _Requirements: 1.1, 1.2, 1.4_

  - [~] 2.9 Create `AboutSection.tsx`
    - Renders fully static `<section id="about" className="section about-section">` with `.about-grid`
    - Left: `.about-copy` with `<h2>`, paragraphs, and `.flow-tag`; right: `.about-panel` with three `.mini-stat` elements
    - _Requirements: 1.1, 1.2_

  - [~] 2.10 Create `PreFormSection.tsx`
    - Renders fully static `<section className="section pre-form-section">` with `.pre-form-box`
    - Contains `<h2>`, three `<p>` elements, and a primary CTA anchor to `#contact`
    - _Requirements: 1.1, 1.2_

  - [~] 2.11 Create `ContactSection.tsx`
    - Imports `{ useState, type FormEvent }` from React and `initialForm` from `../../components/constats`
    - Owns `formData` and `isSubmitted` state
    - `handleChange` sets `isSubmitted` to `false` then merges the changed field into `formData`
    - `handleSubmit` prevents default, sets `isSubmitted` to `true`, resets `formData` to `initialForm`
    - Renders all five fields (`fullName`, `phone`, `email`, `projectType`, `message`) each wrapped in `<label>` with `required` on name/phone/email/message inputs
    - Success message uses `role="status"` and `aria-live="polite"`
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 6.1, 6.2, 6.3, 6.4, 6.5, 8.4, 8.5_

  - [~] 2.12 Create `FooterSection.tsx`
    - Renders `<footer className="site-footer">` with `.footer-grid` (logo, nav links, social placeholder) and `.footer-bottom`
    - Footer logo: `<img src="/myLogo.png" alt="POSSIBLE" className="footer-logo" />`
    - Nav links: home, services, process, about, contact
    - _Requirements: 1.1, 1.2, 8.3_

- [~] 3. Checkpoint — verify all section components compile
  - Ensure all 12 section files are saved, no TypeScript errors, ask the user if questions arise.

- [ ] 4. Refactor `Homepage.tsx` to thin compositor shell
  - [~] 4.1 Replace all inline JSX in `Homepage.tsx` with imports and composition of the 12 section components
    - Remove `useState`, `FormEvent`, `initialForm`, `audienceList`, `processSteps`, `reasons`, `services` imports (they move to section components)
    - Retain only `import '../styles/homepage.css'` and the 12 section imports
    - `Homepage` function body renders only `<main className="possible-page" dir="rtl">` with the 12 section components in order
    - _Requirements: 1.1, 1.2, 1.3, 7.1_

- [~] 5. Final checkpoint — build verification
  - Run `npm run build` (tsc + vite build) and confirm zero TypeScript errors and a successful production bundle.
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- CSS changes in task 1 are self-contained and can be done before any component work
- All 12 section components import data directly from `constats.ts` — no props are threaded through `Homepage.tsx`
- The `sections/` directory path is `src/components/sections/`; import paths from section files back to `constats.ts` are `../../components/constats` — double-check this resolves correctly relative to the new path (`src/components/sections/ComponentName.tsx` → `../constats`)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "2.11", "2.12"] },
    { "id": 2, "tasks": ["4.1"] }
  ]
}
```
