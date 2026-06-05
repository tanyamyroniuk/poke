"use client"

import { useEffect, useState } from "react"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { FakeCardSheet } from "@/components/fake-card/fake-card-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/** Fake card detection result — reuses analysis chrome (Figma 27064:113681). */
export function FakeCardScreen() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)
  }, [])

  return (
    <CardScreenShell
      data-name="Fake card"
      imageSrc={capturedImage ?? pokecardMock}
      imageAlt="Card submitted for verification"
      heroObjectFit={capturedImage ? "cover" : "contain"}
      sheet={<FakeCardSheet />}
      backHref="/home"
      backLabel="Back to home"
      heroHeightPx={200}
    />
  )
}
