"use client"

import type { ReactNode } from "react"

interface FloatingActionsProps {
  children: ReactNode
  position?: "bottom-left" | "bottom-right"
}

export function FloatingActions({
  children,
  position = "bottom-left",
}: FloatingActionsProps) {
  const positionStyles =
    position === "bottom-left"
      ? { left: 24, right: "auto" }
      : { right: 24, left: "auto" }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        ...positionStyles,
        zIndex: 9999,
        display: "flex",
        gap: 12,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {children}
    </div>
  )
}
