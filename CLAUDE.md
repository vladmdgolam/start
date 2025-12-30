# CLAUDE.md

## Project Overview

R3F (React Three Fiber) starter template for 3D web projects. Designed as a base for future projects with reusable patterns.

## Tech Stack

- Next.js 16 (App Router)
- React Three Fiber + Drei
- TypeScript
- Tailwind CSS
- lucide-react (icons)

## Key Patterns

### Screenshot Capture
Full-screen capture (not square-cropped). Uses `preserveDrawingBuffer: true` on Canvas. Access via ref pattern since `useThree()` must be inside Canvas context.

### Floating Action Buttons
Circular buttons (56x56, 50% radius) positioned fixed bottom-left with iOS safe area padding. Two variants: `primary` (black) and `secondary` (gray).

## File Conventions

- Components in `components/`
- Hooks in `hooks/`
- Scene components can live in `app/page.tsx` or be extracted to `components/` as complexity grows

## Commands

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm lint     # ESLint
```
