"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, CircleCheck, Layers, MoreVertical, Trash2 } from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CardItem = {
  id: string
  pokemonName: string
  isOriginal: boolean
  imageUrl: string | null
  estimatedValue: number | null
  authenticityScore: number | null
  scannedAt: string
}

type CollectionData = {
  id: string
  name: string
  cards: CardItem[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(value: number | null) {
  if (value === null) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// ---------------------------------------------------------------------------
// Card tile
// ---------------------------------------------------------------------------

function AuthBadge({ score, isOriginal }: { score: number | null; isOriginal: boolean }) {
  const display = score !== null ? `${score}%` : isOriginal ? "Original" : "Fake"
  const isHigh = isOriginal
  return (
    <div
      className={`absolute right-0 top-1 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 ${
        isHigh ? "bg-[#d6f7e7]" : "bg-red-100"
      }`}
    >
      <CircleCheck
        className={`size-3 shrink-0 ${isHigh ? "text-green-700" : "text-red-600"}`}
        strokeWidth={2.5}
      />
      <span className={`text-[12px] font-semibold leading-none ${isHigh ? "text-green-800" : "text-red-700"}`}>
        {display}
      </span>
    </div>
  )
}

function CardTile({ card, onDelete }: { card: CardItem; onDelete: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const year = new Date(card.scannedAt).getFullYear()

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    await fetch(`/api/cards/${card.id}`, { method: "DELETE" })
    onDelete(card.id)
  }

  function toggleMenu(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen((v) => !v)
  }

  return (
    <div className="relative rounded-xl bg-slate-100 transition-shadow hover:shadow-md">
      {menuOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} aria-hidden />
      )}

      <Link href={`/cards/${card.id}`} className="flex flex-col items-center gap-3 pb-8 pt-2.5 px-2.5">
        <div className="relative h-[145px] w-full overflow-hidden rounded-lg">
          {card.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.imageUrl} alt={card.pokemonName} className="absolute inset-0 size-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
              <span className="text-4xl font-bold text-slate-400">{card.pokemonName.charAt(0)}</span>
            </div>
          )}
          <AuthBadge score={card.authenticityScore} isOriginal={card.isOriginal} />
        </div>

        <div className="flex w-full flex-col gap-1.5 px-0.5">
          <p className="text-base font-medium leading-normal text-black">{card.pokemonName}, {year}</p>
          <p className="text-sm font-medium leading-none text-gray-500">from {formatPrice(card.estimatedValue)}</p>
        </div>
      </Link>

      {/* Ellipsis button */}
      <button
        type="button"
        onClick={toggleMenu}
        className="absolute bottom-2 right-2 z-30 flex size-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600"
        aria-label="Card options"
      >
        <MoreVertical className="size-4" strokeWidth={2} />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute bottom-9 right-2 z-30 min-w-[130px] rounded-xl border border-neutral-100 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="size-4" strokeWidth={2} />
            Delete card
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export function CollectionDetailScreen({ collectionId }: { collectionId: string }) {
  const [collection, setCollection] = useState<CollectionData | null | "loading">("loading")

  useEffect(() => {
    fetch(`/api/collections/${collectionId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setCollection)
  }, [collectionId])

  function handleDeleteCard(cardId: string) {
    setCollection((prev) =>
      prev && prev !== "loading"
        ? { ...prev, cards: prev.cards.filter((c) => c.id !== cardId) }
        : prev,
    )
  }

  if (collection === "loading") {
    return (
      <main className="flex min-h-full flex-col bg-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
        </div>
      </main>
    )
  }

  if (!collection) {
    return (
      <main className="flex min-h-full flex-col bg-white">
        <div className="mx-auto w-full px-8">
          <div className="flex items-center justify-between pt-8">
            <Link href="/collections" aria-label="Back to Collections" className="flex size-12 items-center justify-center rounded-[14px] bg-slate-100 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-slate-200">
              <ArrowLeft className="size-6 text-[#171717]" strokeWidth={2} />
            </Link>
          </div>
          <h1 className="mt-6 text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#171717]">Collection</h1>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-16 text-center">
          <Layers className="size-16 text-slate-200" strokeWidth={1.25} />
          <p className="text-lg font-medium text-slate-400">No cards yet</p>
          <p className="text-sm text-slate-400">Scan or upload a card to add it to this collection</p>
          <Link href="/home" className="mt-2 rounded-2xl bg-[#dc2626] px-6 py-3 text-sm font-medium text-white hover:bg-[#b91c1c]">
            Scan a Card
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-full flex-col bg-white">
      <div className="mx-auto w-full px-8">
        <div className="flex items-center justify-between pt-8">
          <Link href="/collections" aria-label="Back to Collections" className="flex size-12 items-center justify-center rounded-[14px] bg-slate-100 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-slate-200">
            <ArrowLeft className="size-6 text-[#171717]" strokeWidth={2} />
          </Link>
          <button type="button" aria-label="Search" className="flex size-8 items-center justify-center text-[#171717] transition-opacity hover:opacity-60">
            <Search className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        <h1 className="mt-6 text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#171717]">
          {collection.name}
        </h1>

        {collection.cards.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
            <Layers className="size-16 text-slate-200" strokeWidth={1.25} />
            <p className="text-lg font-medium text-slate-400">No cards yet</p>
            <p className="text-sm text-slate-400">Scan or upload a card to add it to this collection</p>
            <Link href="/home" className="mt-2 rounded-2xl bg-[#dc2626] px-6 py-3 text-sm font-medium text-white hover:bg-[#b91c1c]">
              Scan a Card
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 pb-10">
            {collection.cards.map((card) => (
              <CardTile key={card.id} card={card} onDelete={handleDeleteCard} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
