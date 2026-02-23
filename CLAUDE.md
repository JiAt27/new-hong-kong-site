# NEW HONG KONG Landing Page

## Project Overview

Single-page landing site for **NEW HONG KONG** (新香港), an artisanal frozen dumpling brand in Puebla, Mexico. The site drives WhatsApp orders and serves as the brand's primary online presence.

## Tech Stack

- **React 19** + TypeScript 5.9
- **Vite 7** (dev server + build)
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin, `@theme` block syntax in `globals.css`)
- **Framer Motion 12** (Hero animations only; simpler effects use CSS)
- **react-i18next** (bilingual ES/EN, Spanish is default)
- **Embla Carousel 8.6** + Autoplay (testimonials)

## Commands

```bash
npm run dev       # Start dev server (default: localhost:5173)
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build locally
npx tsc --noEmit  # Type-check only (no emit)
```

## Key Architecture Decisions

### Tailwind v4
Uses the new `@theme` block in `src/styles/globals.css` for custom tokens (colors, fonts). No `tailwind.config.ts` file — all config is CSS-native.

### i18n
- Translation files: `src/i18n/es.json` (Spanish) and `src/i18n/en.json` (English)
- All user-facing text MUST go through `t('key')` — never hardcode strings
- Spanish is the primary language; English is secondary

### Images
- Food photos in `src/assets/images/products/`
- Packaging labels in `src/assets/images/packaging/`
- Logo: `src/assets/images/logo.png`
- Images are imported as modules (Vite handles optimization)

### Map Data
- Real coastline data generated from Natural Earth 110m via `scripts/generate-map-paths.mjs`
- Output: `src/data/mapPaths.ts` (auto-generated, do not edit manually)
- To regenerate: `node scripts/generate-map-paths.mjs`

### Legal Pages
- `public/privacy.html` — Aviso de Privacidad (LFPDPPP compliance)
- `public/terms.html` — Terminos y Condiciones (LFPC compliance)
- These are static HTML, not React routes

## File Structure

```
src/
  components/
    layout/     — Navbar, Footer, WhatsAppFAB, LanguageToggle, SectionWrapper
    sections/   — Hero, Products, WhySpecial, HowToOrder, Testimonials,
                  OurStory, HowToCook, FAQ, WhereToBuy
    ui/         — ProductCard, TestimonialCard, Badge, AccordionItem,
                  CloudPattern, JourneyMap, VideoEmbed, etc.
  hooks/        — useScrollAnimation, useMediaQuery, useReducedMotion
  i18n/         — Translation config + JSON files
  data/         — products.ts, testimonials.ts, stores.ts, faq.ts, mapPaths.ts
  assets/       — Images (products, packaging, branding)
  styles/       — globals.css (Tailwind v4 theme)
public/         — Static files (privacy.html, terms.html, favicon)
scripts/        — Build-time generation scripts (map paths)
```

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#1B365D` | Primary brand, backgrounds |
| Red | `#C8102E` | Logo, CTAs, accents |
| Green | `#2D6A4F` | Vegano product |
| Purple | `#6B3FA0` | Korean Chicken product |
| Orange | `#E07C24` | Soup Dumplings product |
| Off-white | `#FFF9F0` | Warm section backgrounds |

## WhatsApp Links

All order CTAs link to `https://wa.me/522216534481` with pre-filled messages. The phone number is **+52 221-653-4481**.

## Accessibility

- `useReducedMotion` hook respects `prefers-reduced-motion`
- Carousel has visible pause button (WCAG 2.2.2)
- All interactive elements have visible focus styles
- Minimum 44x44px touch targets
- Color contrast meets WCAG AA

## Adding Content

### New product
1. Add food photo to `src/assets/images/products/`
2. Add packaging label to `src/assets/images/packaging/`
3. Add product data to `src/data/products.ts`
4. Add translations to both `es.json` and `en.json` under `products.items`

### New testimonial
1. Add entry to `src/data/testimonials.ts`

### New FAQ
1. Add entry to `src/data/faq.ts`
2. Add translations to both `es.json` and `en.json` under `faq.items`

### New store location
1. Add entry to `src/data/stores.ts`
