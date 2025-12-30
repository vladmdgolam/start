"use client"

import type { ReactNode, ButtonHTMLAttributes } from "react"

export interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: "primary" | "secondary"
}

export function FloatingActionButton({
  icon,
  variant = "primary",
  ...props
}: FloatingActionButtonProps) {
  const bgColor = variant === "primary" ? "#000" : "#333"

  return (
    <button
      type="button"
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
      }}
      {...props}
    >
      {icon}
    </button>
  )
}
