"use client"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, CircleCheck } from "lucide-react"
import charizardImg from "@/app/assets/mocks/card-charizard.jpg"
import gyaradosImg  from "@/app/assets/mocks/card-gyarados.jpg"
import skittyImg    from "@/app/assets/mocks/card-skitty.jpg"
import mewImg       from "@/app/assets/mocks/card-mew.jpg"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CardItem = {
  id: string
  name: string
  year: number
  priceFrom: string
  authenticity: number
  image: StaticImageData
}

type CollectionData = {
  id: string
  name: string
  cards: CardItem[]
}

// ---------------------------------------------------------------------------
// Mock data — replace with real data fetching
// ---------------------------------------------------------------------------

const COLLECTIONS: Record<string, CollectionData> = {
  "original-cards": {
    id: "original-cards",
    name: "Original Cards Collection",
    cards: [
      { id: "c1", name: "Charizard", year: 2010, priceFrom: "$3,500", authenticity: 98.2, image: charizardImg },
      { id: "c2", name: "Gyarados",  year: 2010, priceFrom: "$1,500", authenticity: 99.5, image: gyaradosImg  },
      { id: "c3", name: "Skitty",    year: 2010, priceFrom: "$1,500", authenticity: 84.9, image: skittyImg    },
      { id: "c4", name: "Mew",       year: 2010, priceFrom: "$1,500", authenticity: 84.9, image: mewImg       },
      { id: "c5", name: "Charizard", year: 2010, priceFrom: "$3,500", authenticity: 98.2, image: charizardImg },
      { id: "c6", name: "Gyarados",  year: 2010, priceFrom: "$1,500", authenticity: 99.5, image: gyaradosImg  },
    ],
  },
  "fake-cards": {
    id: "fake-cards",
    name: "Fake Cards Collection",
    cards: [
      { id: "f1", name: "Charizard", year: 2010, priceFrom: "$12",    authenticity: 14.3, image: charizardImg },
      { id: "f2", name: "Gyarados",  year: 2010, priceFrom: "$8",     authenticity: 22.1, image: gyaradosImg  },
      { id: "f3", name: "Mew",       year: 2010, priceFrom: "$5",     authenticity: 11.7, image: mewImg       },
    ],
  },
  "expensive": {
    id: "expensive",
    name: "Expensive Cards",
    cards: [
      { id: "e1", name: "Charizard", year: 2010, priceFrom: "$3,500", authenticity: 99.1, image: charizardImg },
      { id: "e2", name: "Gyarados",  year: 2010, priceFrom: "$1,500", authenticity: 97.8, image: gyaradosImg  },
    ],
  },
}

export function getCollectionData(id: string): CollectionData | null {
  return COLLECTIONS[id] ?? null
}

// ---------------------------------------------------------------------------
// Card tile
// ---------------------------------------------------------------------------

function AuthBadge({ score }: { score: number }) {
  const isHigh = score >= 50
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
      <span
        className={`text-[12px] font-semibold leading-none ${
          isHigh ? "text-green-800" : "text-red-700"
        }`}
      >
        {score}%
      </span>
    </div>
  )
}

function CardTile({ card }: { card: CardItem }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-slate-100 pb-5 pt-2.5 px-2.5">
      {/* Image + badge */}
      <div className="relative h-[145px] w-[160px] overflow-hidden rounded-lg">
        <Image
          src={card.image}
          alt={`${card.name} ${card.year}`}
          fill
          className="object-cover"
          sizes="160px"
        />
        <AuthBadge score={card.authenticity} />
      </div>

      {/* Name + price */}
      <div className="flex w-full flex-col gap-1.5 px-0.5">
        <p className="text-base font-medium leading-normal text-black">
          {card.name}, {card.year}
        </p>
        <p className="text-sm font-medium leading-none text-gray-500">
          from {card.priceFrom}
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export function CollectionDetailScreen({ collectionId }: { collectionId: string }) {
  const collection = getCollectionData(collectionId)

  if (!collection) {
    return (
      <main className="flex min-h-full flex-col items-center justify-center bg-white px-8">
        <p className="text-base text-slate-500">Collection not found.</p>
        <Link href="/collections" className="mt-4 text-sm font-medium text-[#dc2626]">
          ← Back to Collections
        </Link>
      </main>
    )
  }

  return (
    <main className="flex min-h-full flex-col bg-white">
      <div className="mx-auto w-full max-w-[440px] px-8">

        {/* Top bar: back button + search */}
        <div className="flex items-center justify-between pt-8">
          <Link
            href="/collections"
            aria-label="Back to Collections"
            className="flex size-12 items-center justify-center rounded-[14px] bg-slate-100 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-slate-200"
          >
            <ArrowLeft className="size-6 text-[#171717]" strokeWidth={2} />
          </Link>

          <button type="button" aria-label="Search" className="flex size-8 items-center justify-center text-[#171717] transition-opacity hover:opacity-60">
            <Search className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        {/* Collection title */}
        <h1 className="mt-6 text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#171717]">
          {collection.name}
        </h1>

        {/* 2-column card grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 pb-10">
          {collection.cards.map((card) => (
            <CardTile key={card.id} card={card} />
          ))}
        </div>
      </div>
    </main>
  )
}
