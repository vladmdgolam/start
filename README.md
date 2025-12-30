# R3F Starter Template

Next.js + React Three Fiber template with reusable UI patterns for 3D projects.

## Features

- React Three Fiber + Drei setup
- Full-screen screenshot capture
- Floating circular action buttons (iOS safe area aware)
- Extensible component architecture

## Quick Start

```bash
pnpm install
pnpm dev
```

## Project Structure

```
app/
  page.tsx          # Main scene with R3F Canvas
components/
  FloatingActions.tsx       # Container for floating buttons
  FloatingActionButton.tsx  # Circular action button
hooks/
  useScreenshot.ts          # Full-screen canvas capture hook
```

## Adding Actions

```tsx
import { FloatingActions } from '@/components/FloatingActions'
import { FloatingActionButton } from '@/components/FloatingActionButton'
import { Camera, Dices } from 'lucide-react'

<FloatingActions position="bottom-left">
  <FloatingActionButton icon={<Camera className="h-6 w-6" />} onClick={handleScreenshot} />
  <FloatingActionButton icon={<Dices className="h-6 w-6" />} onClick={randomize} variant="secondary" />
</FloatingActions>
```

## Screenshot Usage

The screenshot captures full canvas dimensions (not cropped). Requires `preserveDrawingBuffer: true` on Canvas:

```tsx
<Canvas gl={{ preserveDrawingBuffer: true }}>
```
