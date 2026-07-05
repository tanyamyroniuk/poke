"use client"

import { useEffect } from "react"

/** Removes the HTML-level page-loader overlay once React has hydrated. */
export function PageLoader() {
  useEffect(() => {
    document.getElementById("page-loader")?.remove()
  }, [])
  return null
}
