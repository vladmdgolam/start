"use client"

import { useThree } from "@react-three/fiber"
import { useCallback } from "react"

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function useScreenshot() {
  const { gl } = useThree()

  const getScreenshotDataUrl = useCallback((): string | null => {
    if (!gl?.domElement) return null
    return gl.domElement.toDataURL("image/png")
  }, [gl])

  const takeScreenshot = useCallback(
    (filename = "screenshot.png") => {
      const dataUrl = getScreenshotDataUrl()
      if (dataUrl) {
        downloadDataUrl(dataUrl, filename)
      }
    },
    [getScreenshotDataUrl]
  )

  return { getScreenshotDataUrl, takeScreenshot }
}
