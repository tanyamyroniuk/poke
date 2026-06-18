"use client"

import { useEffect, useState } from "react"
import { CardScreenShell } from "@/components/card-screen/card-screen-shell"
import { OriginalCardSheet } from "@/components/original-card/original-card-sheet"
import { FakeCardSheet } from "@/components/fake-card/fake-card-sheet"
import type { CardAnalysisResult } from "@/lib/types/card-analysis"
import pokecardMock from "@/app/assets/mocks/pokecard2.jpg"

type Card = {
  id: string
  pokemonName: string
  isOriginal: boolean
  imageUrl: string | null
  estimatedValue: number | null
  authenticityScore: number | null
  analysisJson: string | null
  collectionId: string | null
  scannedAt: string
}

export default function CardProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [card, setCard] = useState<Card | null>(null)

  useEffect(() => {
    params.then(({ id }) => {
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

  const analysis: Partial<CardAnalysisResult> = card.analysisJson ? JSON.parse(card.analysisJson) : {}

  const backHref = card.collectionId ? `/collections/${card.collectionId}` : "/collections"
  const imageSrc = card.imageUrl ?? pokecardMock
  const heroObjectFit = card.imageUrl ? "cover" : "contain"

  const scoreLabel = card.authenticityScore !== null
    ? `${card.isOriginal ? "Original" : "Fake"} – ${card.authenticityScore}%`
    : card.isOriginal ? "Original" : "Fake"

  const setLine = analysis.setName && analysis.setName !== "unknown" ? analysis.setName : undefined
  const aboutText = analysis.funFact && analysis.funFact !== "unknown" ? analysis.funFact : undefined
  const collectorPrice = analysis.estimatedValueRange && analysis.estimatedValueRange !== "unknown"
    ? analysis.estimatedValueRange
    : card.estimatedValue
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(card.estimatedValue)
      : undefined
  const discrepancies = analysis.suspiciousIndicators?.length
    ? analysis.suspiciousIndicators.map((s) => ({ title: s, description: "" }))
    : undefined

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
            cardName={analysis.cardName && analysis.cardName !== "unknown" ? analysis.cardName : card.pokemonName}
            verdictLabel={scoreLabel}
            setLine={setLine}
            collectorPrice={collectorPrice}
            aboutText={aboutText}
            viewOnly
          />
        ) : (
          <FakeCardSheet
            cardName={analysis.cardName && analysis.cardName !== "unknown" ? analysis.cardName : card.pokemonName}
            verdictLabel={scoreLabel}
            setLine={setLine}
            discrepancies={discrepancies}
            viewOnly
          />
        )
      }
    />
  )
}
