"use client"

import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { FakeCardSheet } from "@/components/fake-card/fake-card-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

/** Fake card detection result — reuses analysis chrome (Figma 27064:113681). */
export function FakeCardScreen() {
  return (
    <CardScreenShell
      data-name="Fake card"
      imageSrc={pokecardMock}
      imageAlt="Card submitted for verification"
      sheet={<FakeCardSheet />}
      backHref="/home"
      backLabel="Back to home"
      sheetHeightPx={820}
      heroHeightPercent={28}
    />
  )
}
