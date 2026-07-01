"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, MoreVertical, Trash2 } from "lucide-react"
import { BottomNav } from "@/components/home/bottom-nav"
import { NewCollectionForm } from "@/components/save-to-collection/new-collection-form"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Collection = {
  id: string
  name: string
  cardCount: number
  totalValue: number
  isOriginalCollection: boolean
  coverImageUrl: string | null
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatValue(value: number) {
  if (value === 0) return "No value estimated"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// ---------------------------------------------------------------------------
// Collection card
// ---------------------------------------------------------------------------

function CollectionCard({
  collection,
  onDelete,
}: {
  collection: Collection
  onDelete: (id: string) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const grayscale = !collection.isOriginalCollection

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    await fetch(`/api/collections/${collection.id}`, { method: "DELETE" })
    onDelete(collection.id)
  }

  function toggleMenu(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen((v) => !v)
  }

  return (
    <div className="relative rounded-xl bg-slate-50 transition-shadow hover:shadow-md">
      {menuOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} aria-hidden />
      )}

      <Link href={`/collections/${collection.id}`} className="block overflow-hidden rounded-xl">
        {/* Image hero */}
        <div className="relative h-48 w-full bg-slate-200">
          {collection.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={collection.coverImageUrl}
              alt={collection.name}
              className={`absolute inset-0 size-full object-cover ${grayscale ? "grayscale" : ""}`}
            />
          ) : null}
          <div className="absolute inset-x-0 top-1/2 bottom-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-4 left-4 right-12 text-xl font-semibold leading-7 text-white">
            {collection.name}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-start justify-between p-5">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24px] text-gray-400">Estimated Value</p>
            <p className="text-xl font-semibold leading-7 text-[#191c1d]">{formatValue(collection.totalValue)}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24px] text-gray-400">Progress</p>
            <p className="text-sm font-medium leading-5 text-[#191c1d]">{collection.cardCount} Cards</p>
          </div>
        </div>
      </Link>

      {/* Ellipsis button — floats over top-right of image */}
      <button
        type="button"
        onClick={toggleMenu}
        className="absolute top-3 right-3 z-30 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
        aria-label="Collection options"
      >
        <MoreVertical className="size-4" strokeWidth={2} />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute top-12 right-3 z-30 min-w-[160px] rounded-xl border border-neutral-100 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="size-4" strokeWidth={2} />
            Delete collection
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export function CollectionsScreen() {
  const router = useRouter()
  const [collections, setCollections] = useState<Collection[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState("")

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then(setCollections)
  }, [])

  function handleNewCollection() {
    setNewName("")
    setShowModal(true)
  }

  async function handleCreate() {
    const trimmed = newName.trim()
    if (!trimmed) return
    const res = await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    })
    const newCollection = await res.json()
    setShowModal(false)
    router.push(`/collections/${newCollection.id}`)
  }

  function handleDeleteCollection(id: string) {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  const totalValue = collections.reduce((sum, c) => sum + c.totalValue, 0)

  return (
    <main className="relative flex min-h-full flex-col bg-white">
      <div className="mx-auto flex w-full flex-1 flex-col px-8 pb-8 pt-14">

        <h1 className="text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-[#171717]">
          Collections
        </h1>

        <div className="mt-8 rounded-xl bg-slate-50 px-6 py-4">
          <p className="text-xs text-slate-600">Total Card Collection Value</p>
          <div className="mt-1.5 flex items-end gap-2">
            <p className="text-[30px] font-medium leading-none text-black">
              {formatValue(totalValue)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} onDelete={handleDeleteCollection} />
          ))}
        </div>
      </div>
      <BottomNav activeTab="collections" />

      <button
        type="button"
        aria-label="Create new collection"
        onClick={handleNewCollection}
        className="fixed bottom-[100px] right-8 flex size-14 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0px_10px_30px_-5px_rgba(169,50,0,0.4)] transition-opacity hover:opacity-90"
      >
        <Plus className="size-[18px]" strokeWidth={2.5} />
      </button>

      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} aria-hidden />
          <div className="fixed inset-x-6 top-1/3 z-50 -translate-y-1/2 rounded-xl bg-white shadow-xl">
            <NewCollectionForm
              value={newName}
              onChange={setNewName}
              onCancel={() => setShowModal(false)}
              onSubmit={handleCreate}
            />
          </div>
        </>
      )}
    </main>
  )
}
