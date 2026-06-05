"use client"

import { useEffect, useState } from "react"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { SaveToCollectionSheet } from "@/components/save-to-collection/save-to-collection-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/** Save-to-Collection flow — 4 interactive states in one screen (Figma 27065:114034). */
export function SaveToCollectionScreen() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [backHref, setBackHref] = useState("/home")

  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)

    const resultType = sessionStorage.getItem("cardResultType")
    if (resultType === "original") setBackHref("/original-card")
    else if (resultType === "fake") setBackHref("/fake-card")
  }, [])

  return (
    <CardScreenShell
      data-name="Save to Collection"
      imageSrc={capturedImage ?? pokecardMock}
      imageAlt="Card being saved to collection"
      heroObjectFit={capturedImage ? "cover" : "contain"}
      heroHeightPx={280}
      sheet={<SaveToCollectionSheet />}
      backHref={backHref}
      backLabel="Back"
    />
  )
}
