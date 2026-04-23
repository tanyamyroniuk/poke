"use client"

import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { SaveToCollectionSheet } from "@/components/save-to-collection/save-to-collection-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"
import pokebackBg from "@/app/assets/mocks/pokeback-bg.png"

/** Save-to-Collection flow — 4 interactive states in one screen (Figma 27065:114034). */
export function SaveToCollectionScreen() {
  return (
    <CardScreenShell
      data-name="Save to Collection"
      imageSrc={pokecardMock}
      imageAlt="Card being saved to collection"
      backgroundImageSrc={pokebackBg}
      sheet={<SaveToCollectionSheet />}
      backHref="/home"
      backLabel="Back"
      sheetHeightPx={814}
      heroHeightPercent={32}
    />
  )
}
