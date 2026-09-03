# Requirements Document

## Introduction

Redesign the POSSIBLE landing page to achieve a more professional and serious visual identity, and restructure the codebase so the monolithic `Homepage.tsx` is decomposed into focused, single-responsibility section components. All Hebrew content and RTL layout are preserved. The target audience is Israeli businesses and entrepreneurs looking for a custom software development partner.

---

## Glossary

- **Page**: The full single-page application rendered by `App.tsx`.
- **Section_Component**: A standalone `.tsx` file that renders one section of the Page (e.g. `HeroSection`, `ServicesSection`).
- **Homepage**: The root layout component (`Homepage.tsx`) that composes all Section_Components.
- **Static_Data**: Content arrays and form defaults exported from `src/components/constats.ts`.
- **Design_System**: The set of CSS custom properties, typography scales, spacing tokens, and colour palette defined in `homepage.css`.
- **Logo**: The image file at `public/myLogo.png`, used as the brand mark across the Page.
- **Contact_Form**: The lead-capture form collecting full name, phone, email, project type, and message.
- **RTL**: Right-to-left text direction, enforced via `dir="rtl"` on the root `<main>` element.

---

## Requirements

### Requirement 1: Component Decomposition

**User Story:** As a developer, I want each page section to live in its own component file, so that the codebase is easier to navigate, maintain, and extend.

#### Acceptance Criteria

1. THE Homepage SHALL render exactly one Section_Component per page section: `TopbarSection`, `HeroSection`, `ServicesSection`, `IdeaSection`, `ProcessSection`, `WhyUsSection`, `BannerSection`, `AudienceSection`, `AboutSection`, `PreFormSection`, `ContactSection`, and `FooterSection`.
2. WHEN a Section_Component is created, THE Section_Component SHALL reside in `src/components/sections/` and export a single default React component.
3. THE Homepage SHALL import and compose all Section_Components and may retain exactly one structural wrapper element (the `<main>` with `dir="rtl"` and `className="possible-page"`), but SHALL NOT contain any other inline JSX markup beyond rendering the Section_Components.
4. All content arrays and form defaults SHALL be sourced from `src/components/constats.ts`; Section_Components SHALL import from that file rather than declaring literals or objects inline in JSX or component scope.
5. IF a Section_Component requires local interactive state (e.g. form state), THEN THE Section_Component SHALL manage that state internally using `useState`.

---

### Requirement 2: Professional Visual Redesign

**User Story:** As a business owner visiting the site, I want the design to feel polished, authoritative, and trustworthy, so that I have confidence in the agency before making contact.

#### Acceptance Criteria

1. THE Design_System SHALL define a refined colour palette using CSS custom properties on `.possible-page`, retaining the dark navy base (`#071426`) and introducing at least one named accent token (e.g. `--accent`) that is applied as the background colour of the primary CTA button, replacing the cyan-to-purple gradient.
2. THE Design_System SHALL define a consistent typographic scale using `clamp()` for fluid font sizes, covering at minimum the `h1`, `h2`, `h3`, and body text (`p`) levels.
3. WHEN a section heading is rendered, THE Section_Component SHALL apply a CSS class derived from the Design_System (e.g. `.section-heading h2`) rather than any ad-hoc inline `style` attribute.
4. THE Page SHALL display the Logo in the topbar at a fixed width of `160px` on desktop viewports and at `120px` on viewports narrower than `680px`, using `public/myLogo.png`. THE Page SHALL also display the Logo in the footer at `170px` on desktop and `130px` on viewports narrower than `680px`.
5. THE Design_System SHALL include CSS custom properties for at least section vertical padding (`--section-padding`) and card gap (`--card-gap`) so that all sections share a consistent vertical rhythm.
6. WHEN a user hovers or focuses (via keyboard) the primary button, THE primary button SHALL increase in brightness or translate upward by at least `2px`, with the transition completing within `200ms`.
7. THE Page SHALL maintain a minimum contrast ratio of 4.5:1 between all non-decorative body text colours and their immediate background colours, in accordance with WCAG 2.1 AA Success Criterion 1.4.3.

---

### Requirement 3: Hero Section

**User Story:** As a first-time visitor, I want the hero section to immediately communicate the agency's value proposition, so that I understand what POSSIBLE does within the first few seconds.

#### Acceptance Criteria

1. THE HeroSection SHALL display an eyebrow label, a primary `h1` headline, a supporting lead paragraph, and a call-to-action row containing exactly two links: a primary CTA anchor and a secondary anchor.
2. THE HeroSection SHALL render a decorative `<img src="public/myLogo.png" alt="" />` inside the orbit-core visual element as the brand logo.
3. WHEN the viewport width is less than `960px`, THE HeroSection SHALL collapse its two-column CSS grid to a single column, with the copy column rendered above the visual column in source order.
4. WHEN the viewport width is less than `680px`, THE HeroSection CTA row SHALL stack the two anchor buttons vertically (column direction) so each occupies the full container width.

---

### Requirement 4: Services Section

**User Story:** As a potential client, I want to see a clear overview of the services offered, so that I can quickly assess whether the agency can meet my needs.

#### Acceptance Criteria

1. THE ServicesSection SHALL render exactly one `<article>` card per entry in the `services` array from `constats.ts`, with no duplicate or missing cards.
2. THE ServicesSection SHALL display service cards in a 3-column grid on viewports wider than `960px`, a 2-column grid at viewport widths between `680px` and `960px` (inclusive), and a single-column layout at viewport widths of `680px` and below.
3. WHEN a service card is rendered, THE service card SHALL display the entry's `icon` value, `title` value, and `description` value, each in a separate visible element.
4. IF the `services` array in `constats.ts` is empty, THEN THE ServicesSection SHALL render the section container with no cards and with no error or placeholder text.

---

### Requirement 5: Process Section

**User Story:** As a potential client, I want to understand the agency's end-to-end delivery process, so that I know what to expect when working with them.

#### Acceptance Criteria

1. THE ProcessSection SHALL render exactly one timeline item per entry in the `processSteps` array from `constats.ts`, with no duplicate or missing items.
2. WHEN the viewport width is less than `680px`, THE ProcessSection SHALL set `display: none` (or equivalent) on the `.timeline::before` vertical connector line and SHALL render each `.timeline-item` as a single full-width block with `grid-template-columns: 1fr`.
3. THE ProcessSection SHALL render each step's label in the right-hand column and content in the left-hand column within the RTL flow, using `padding-inline-end` rather than `padding-right` for any inset spacing.
4. WHEN a timeline item is rendered, THE timeline item SHALL display the `step` label and the `title` and `text` values from the corresponding `processSteps` entry, each in a separate visible element.

---

### Requirement 6: Contact Form

**User Story:** As a prospective client, I want to submit my project idea via a simple form, so that the agency can follow up with me.

#### Acceptance Criteria

1. THE ContactSection SHALL render a form with fields for full name (text input), phone (tel input), email (email input), project type (select), and a message (textarea).
2. WHEN the user submits the form with all required fields populated, THE ContactSection SHALL display a Hebrew-language success message confirming that the details were received and that the agency will follow up, reset all fields to the values defined in `initialForm` in `constats.ts`, and keep the success message visible until the user begins a new submission.
3. WHEN the user submits the form with one or more required fields empty, THE ContactSection SHALL rely on the browser's native HTML5 validation to prevent submission and SHALL display no success message.
4. THE Contact_Form fields for full name, phone, email, and message SHALL be marked with the `required` attribute.
5. WHEN the form is reset after submission, THE Contact_Form SHALL restore every field to the exact value defined in `initialForm`, including restoring the project type select to its `initialForm` default option.

---

### Requirement 7: RTL and Responsive Layout

**User Story:** As a Hebrew-speaking user on any device, I want the entire site to read and flow correctly in right-to-left direction, so that the content is natural to read.

#### Acceptance Criteria

1. THE Page SHALL set `dir="rtl"` on the root `<main>` element.
2. THE Page SHALL use logical CSS properties (`padding-inline-start`, `padding-inline-end`, `inset-inline-start`, `inset-inline-end`) in place of physical directional properties (`padding-left`, `padding-right`, `left`, `right`) within all Section_Components and their associated CSS rules, so that RTL direction is respected automatically.
3. IF the viewport width is less than `960px`, THEN the two-column CSS grids for the hero, idea layout, about, and footer sections SHALL collapse to `grid-template-columns: 1fr`.
4. IF the viewport width is `680px` or less, THEN the multi-column CSS grids for the services grid, benefits grid, form grid, audience list, idea flow steps, and timeline items SHALL collapse to `grid-template-columns: 1fr`.

---

### Requirement 8: Accessibility

**User Story:** As a user relying on assistive technology, I want all interactive and decorative elements to be correctly marked up, so that the page is navigable and understandable.

#### Acceptance Criteria

1. THE Page SHALL include an `aria-label` or `aria-labelledby` attribute on every `<section>` element whose visible heading element (`h1`–`h6`) is hidden via `aria-hidden="true"` or `display:none`, so that screen readers can identify the section's purpose.
2. IF the Logo image is used as a purely decorative element (i.e. another text or element on the same page identifies the brand), THEN THE Logo `<img>` SHALL carry `alt=""`.
3. IF the Logo image is the sole brand identifier on a given part of the Page (e.g. the footer when no adjacent brand name text is present), THEN THE Logo `<img>` SHALL carry a descriptive `alt` attribute (e.g. `alt="POSSIBLE"`).
4. THE Contact_Form SHALL associate every input, select, and textarea with its visible label using either a wrapping `<label>` element or matching `htmlFor` and `id` attributes.
5. WHEN a form submission succeeds, THE success message element SHALL carry `role="status"` and `aria-live="polite"` so that screen readers announce the confirmation without interrupting the user.
6. THE Page SHALL include a `prefers-reduced-motion` media query that sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms` on all elements for users who have enabled the reduced-motion preference in their operating system.
