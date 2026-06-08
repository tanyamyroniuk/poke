"use client"

import { useEffect, useState } from "react"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { SaveToCollectionSheet } from "@/components/save-to-collection/save-to-collection-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/** Save-to-Collection flow — 4 interactive states in one screen (Figma 27065:114034). */
export function SaveToCollectionScreen() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [backHref, setBackHref] = useState("/home")
  const [initialSheetState, setInitialSheetState] = useState<"idle" | "creating">("idle")

  useEffect(() => {
    const stored = sessionStorage.getItem("capturedCardImage")
    if (stored) setCapturedImage(stored)

    const origin = sessionStorage.getItem("saveOrigin")
    const mode = sessionStorage.getItem("saveMode")

    if (origin === "collections") {
      setBackHref("/collections")
    } else {
      const resultType = sessionStorage.getItem("cardResultType")
      if (resultType === "original") setBackHref("/original-card")
      else if (resultType === "fake") setBackHref("/fake-card")
    }

    if (mode === "create") {
      setInitialSheetState("creating")
      sessionStorage.removeItem("saveMode")
      sessionStorage.removeItem("saveOrigin")
    }
  }, [])

  return (
    <CardScreenShell
      data-name="Save to Collection"
      imageSrc={capturedImage ?? pokecardMock}
      imageAlt="Card being saved to collection"
      heroObjectFit={capturedImage ? "cover" : "contain"}
      heroHeightPx={280}
      sheet={<SaveToCollectionSheet initialState={initialSheetState} />}
      backHref={backHref}
      backLabel="Back"
    />
  )
}
