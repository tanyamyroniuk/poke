"use client"

import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { OriginalCardSheet } from "@/components/original-card/original-card-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/** Original card authentication result — green verdict (Figma 27029:33496). */
export function OriginalCardScreen() {
  return (
    <CardScreenShell
      data-name="Original card"
      imageSrc={pokecardMock}
      imageAlt="Card submitted for verification"
      sheet={<OriginalCardSheet />}
      backHref="/home"
      backLabel="Back to home"
      sheetHeightPx={820}
      heroHeightPercent={28}
    />
  )
}
