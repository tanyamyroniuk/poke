"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { BottomNav } from "@/components/home/bottom-nav"
import collectionThumb from "@/app/assets/mocks/collection-card-thumb.jpg"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Collection = {
  id: string
  name: string
  estimatedValue: string
  cardCount: number
  /** When true the thumbnail is rendered in grayscale (fake / counterfeit set). */
  grayscale?: boolean
}

// ---------------------------------------------------------------------------
// Mock data — replace with real data fetching
// ---------------------------------------------------------------------------

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "original-cards",
    name: "Original Cards Collection",
    estimatedValue: "$12,400 - $18,200",
    cardCount: 38,
  },
  {
    id: "fake-cards",
    name: "Fake Cards Collection",
    estimatedValue: "$115 - $140",
    cardCount: 15,
    grayscale: true,
  },
]

// ---------------------------------------------------------------------------
// Collection card
// ---------------------------------------------------------------------------

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="isolate overflow-clip rounded-xl bg-slate-50 transition-shadow hover:shadow-md"
    >
      {/* Image hero with gradient + name overlay */}
      <div className="relative h-48 w-full">
        <Image
          src={collectionThumb}
          alt={collection.name}
          fill
          className={`object-cover ${collection.grayscale ? "grayscale" : ""}`}
          sizes="376px"
        />
        {/* Bottom-half darkening gradient */}
        <div className="absolute inset-x-0 top-1/2 bottom-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Collection name */}
        <p className="absolute bottom-4 left-4 right-4 text-xl font-semibold leading-7 text-white">
          {collection.name}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex items-start justify-between p-5">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24px] text-gray-400">
            Estimated Value
          </p>
          <p className="text-xl font-semibold leading-7 text-[#191c1d]">
            {collection.estimatedValue}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24px] text-gray-400">
            Progress
          </p>
          <p className="text-sm font-medium leading-5 text-[#191c1d]">
            {collection.cardCount} Cards
          </p>
        </div>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export function CollectionsScreen() {
  return (
    <main className="relative flex min-h-full flex-col bg-white">
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-8 pb-8 pt-14">

        {/* Page title */}
        <h1 className="text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#171717]">
          Collections
        </h1>

        {/* Total value summary card */}
        <div className="mt-8 rounded-xl bg-slate-50 px-6 py-4">
          <p className="text-xs text-slate-600">Total Card Collection Value</p>
          <div className="mt-1.5 flex items-end gap-2">
            <p className="text-[30px] font-medium leading-none text-black">$24,850.00</p>
            <span className="mb-0.5 rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold leading-4 text-green-800">
              +12.4% THIS MONTH
            </span>
          </div>
        </div>

        {/* Collection cards */}
        <div className="mt-8 flex flex-col gap-8">
          {MOCK_COLLECTIONS.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-auto pt-[88px]">
          <BottomNav activeTab="collections" />
        </div>
      </div>

      {/* Floating action button */}
      <button
        type="button"
        aria-label="Create new collection"
        className="fixed bottom-[100px] right-8 flex size-14 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0px_10px_30px_-5px_rgba(169,50,0,0.4)] transition-opacity hover:opacity-90"
      >
        <Plus className="size-[18px]" strokeWidth={2.5} />
      </button>
    </main>
  )
}
