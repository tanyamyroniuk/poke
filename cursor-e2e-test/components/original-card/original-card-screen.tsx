"use client"

import { useEffect, useState } from "react"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { OriginalCardSheet } from "@/components/original-card/original-card-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/** Original card authentication result — green verdict (Figma 27029:33496). */
export function OriginalCardScreen() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)
  }, [])

  return (
    <CardScreenShell
      data-name="Original card"
      imageSrc={capturedImage ?? pokecardMock}
      imageAlt="Card submitted for verification"
      heroObjectFit={capturedImage ? "cover" : "contain"}
      sheet={<OriginalCardSheet />}
      backHref="/home"
      backLabel="Back to home"
      heroHeightPx={200}
    />
  )
}
