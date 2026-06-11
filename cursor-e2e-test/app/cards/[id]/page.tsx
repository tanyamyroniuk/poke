"use client"

import { useEffect, useState } from "react"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { OriginalCardSheet } from "@/components/original-card/original-card-sheet"
import { FakeCardSheet } from "@/components/fake-card/fake-card-sheet"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

type Card = {
  id: string
  pokemonName: string
  isOriginal: boolean
  imageUrl: string | null
  estimatedValue: number | null
  authenticityScore: number | null
  collectionId: string | null
  scannedAt: string
}

export default function CardProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [card, setCard] = useState<Card | null>(null)
  const [cardId, setCardId] = useState<string>("")

  useEffect(() => {
    params.then(({ id }) => {
      setCardId(id)
      fetch(`/api/cards/${id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then(setCard)
    })
  }, [params])

  if (!card) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
      </div>
    )
  }

  const backHref = card.collectionId ? `/collections/${card.collectionId}` : "/collections"
  const imageSrc = card.imageUrl ?? pokecardMock
  const heroObjectFit = card.imageUrl ? "cover" : "contain"

  const scoreLabel = card.authenticityScore !== null
    ? `${card.isOriginal ? "Original" : "Fake"} – ${card.authenticityScore}%`
    : card.isOriginal ? "Original" : "Fake"

  const collectorPrice = card.estimatedValue
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(card.estimatedValue)
    : "N/A"

  return (
    <CardScreenShell
      imageSrc={imageSrc}
      imageAlt={card.pokemonName}
      heroObjectFit={heroObjectFit}
      heroHeightPercent={50}
      backHref={backHref}
      backLabel="Back to collection"
      sheet={
        card.isOriginal ? (
          <OriginalCardSheet
            cardName={card.pokemonName}
            verdictLabel={scoreLabel}
            collectorPrice={collectorPrice}
            viewOnly
          />
        ) : (
          <FakeCardSheet
            cardName={card.pokemonName}
            verdictLabel={scoreLabel}
            viewOnly
          />
        )
      }
    />
  )
}
