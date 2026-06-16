# @cp-research/muses-ui

CPR Automation Design System — React + Tailwind v4 component library.
The Storybook is the visual source of truth.

## Install

This package is published to **GitHub Packages** (private). Point the
`@cp-research` scope at the GitHub registry in your project's `.npmrc`:

```ini
# .npmrc
@cp-research:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` must be a GitHub personal access token with the `read:packages`
scope (export it in your shell / CI env). Then:

```bash
npm install @cp-research/muses-ui
```

Peer deps: `react >=18`, `react-dom >=18`. Tailwind v4 must be set up in the consuming app.

## Setup (Tailwind v4 app)

```css
/* app.css */
@import "tailwindcss";
@import "@cp-research/muses-ui/theme.css";
@source "../node_modules/@cp-research/muses-ui/dist";
```

Load the brand font in your HTML `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

## Usage

```tsx
import { Sidebar, Header, Card, Button, Badge, Input } from "@cp-research/muses-ui";
```

## Components

- **Foundations**: design tokens (`theme.css`), typography scale
- **Components**: `Button`, `Badge`, `Input`, `Card` (+ `CardHeader/Title/Description/Content/Footer`)
- **Layout**: `Sidebar`, `Header`, `Breadcrumb`

## Develop

```bash
npm install
npm run storybook        # local dev at :6006
npm run build-storybook  # static site → storybook-static/
npm run build            # library build → dist/
```
