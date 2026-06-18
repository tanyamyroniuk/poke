"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CircleCheck, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardsStackIcon } from "@/components/save-to-collection/cards-stack-icon"
import {
  type Collection,
  CollectionPickerTrigger,
  CollectionDropdown,
} from "@/components/save-to-collection/collection-picker"
import { NewCollectionForm } from "@/components/save-to-collection/new-collection-form"
import type { CardAnalysisResult } from "@/lib/types/card-analysis"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseEstimatedValue(range: string | undefined): number | null {
  if (!range || range === "unknown") return null
  const match = range.match(/\$?([\d,]+)/)
  if (!match) return null
  return parseInt(match[1].replace(/,/g, ""), 10)
}

function compressImage(dataUrl: string, maxPx = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => {
      const ratio = Math.min(maxPx / img.width, maxPx / img.height, 1)
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(img.width * ratio)
      canvas.height = Math.round(img.height * ratio)
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL("image/jpeg", quality))
    }
    img.src = dataUrl
  })
}

// ---------------------------------------------------------------------------
// Types & defaults
// ---------------------------------------------------------------------------

type SheetState = "idle" | "selecting" | "creating" | "created"

export type SaveToCollectionSheetProps = {
  /** Pre-populate collections (useful for Storybook). If omitted, fetched from API. */
  initialCollections?: Collection[]
  /** Stub for Storybook / testing — fires instead of router.push. */
  onSave?: (collectionId: string) => void
  onBack?: () => void
  /** Force a specific state (useful for Storybook). */
  initialState?: SheetState
}

// ---------------------------------------------------------------------------
// Sheet
// ---------------------------------------------------------------------------

export function SaveToCollectionSheet({
  initialCollections,
  onSave,
  onBack,
  initialState = "idle",
}: SaveToCollectionSheetProps) {
  const [sheetState, setSheetState] = useState<SheetState>(initialState)
  const [collections, setCollections] = useState<Collection[]>(initialCollections ?? [])
  const [selectedId, setSelectedId] = useState<string>("")
  const [newName, setNewName] = useState("")
  const [saving, setSaving] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Fetch collections from API (skip if initialCollections provided for Storybook)
  useEffect(() => {
    if (initialCollections && initialCollections.length > 0) return
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data: Collection[]) => {
        setCollections(data)
        // Pre-select based on card result type
        const type = typeof window !== "undefined" ? sessionStorage.getItem("cardResultType") : null
        const preferred = type === "fake" ? "fake-cards" : "original-cards"
        const found = data.find((c) => c.id === preferred)
        setSelectedId(found?.id ?? data[0]?.id ?? "")
      })
  }, [initialCollections])

  // Set initial selectedId when initialCollections provided
  useEffect(() => {
    if (!initialCollections || initialCollections.length === 0) return
    const type = typeof window !== "undefined" ? sessionStorage.getItem("cardResultType") : null
    if (type === "original") setSelectedId("original-cards")
    else if (type === "fake") setSelectedId("fake-cards")
    else setSelectedId(initialCollections[0]?.id ?? "")
  }, [initialCollections])

  const selectedCollection = collections.find((c) => c.id === selectedId) ?? collections[0]

  function handleTriggerClick() {
    setSheetState((s) => (s === "selecting" ? "idle" : "selecting"))
  }

  function handleSelect(id: string) {
    setSelectedId(id)
    setSheetState("idle")
  }

  function openCreateForm() {
    setNewName("")
    setSheetState("creating")
  }

  function cancelCreate() {
    setNewName("")
    setSheetState("idle")
  }

  async function confirmCreate() {
    if (!newName.trim()) return
    const res = await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    })
    const newCollection = await res.json()
    setCollections((prev) => [...prev, { id: newCollection.id, name: newCollection.name }])
    setSelectedId(newCollection.id)
    setNewName("")
    setSheetState("created")
  }

  async function handleSave() {
    setSaving(true)
    const isOriginal = sessionStorage.getItem("cardResultType") !== "fake"
    const raw = sessionStorage.getItem("capturedCardImage")
    const imageUrl = raw ? await compressImage(raw) : null
    const storedAnalysis = sessionStorage.getItem("cardAnalysisResult")
    const analysis: Partial<CardAnalysisResult> = storedAnalysis ? JSON.parse(storedAnalysis) : {}
    const estimatedValue = parseEstimatedValue(analysis.estimatedValueRange)
    await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pokemonName: analysis.pokemonName && analysis.pokemonName !== "unknown" ? analysis.pokemonName : "Scanned Card",
        isOriginal,
        collectionId: selectedId || null,
        imageUrl,
        estimatedValue,
        authenticityScore: analysis.authenticityScore ?? null,
        analysisJson: storedAnalysis ?? null,
      }),
    })
    setSaving(false)
    if (onSave) { onSave(selectedId); return }
    router.push(`/collections/${selectedId}`)
  }

  function handleDismiss() {
    if (onBack) { onBack(); return }
    router.back()
  }

  const isSaveDisabled = sheetState === "creating" || saving || !selectedCollection

  return (
    <div className="flex h-full min-h-0 flex-col">
      {sheetState === "selecting" && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-10"
          onClick={() => setSheetState("idle")}
          aria-hidden
        />
      )}

      <div className="shrink-0 flex flex-col items-center gap-3 px-6 pt-6 text-center">
        <CardsStackIcon size={90} />
        <h1 className="text-[30px] font-medium leading-9 text-black">Save to Collection</h1>
        <p className="text-base font-normal leading-6 text-slate-500">
          Select existing collection to save or create new
        </p>
      </div>

      <div className="min-h-0 flex-1 px-6 pt-8">
        <p className="font-mono text-xs font-medium uppercase leading-none tracking-normal text-gray-500">
          Select Collection
        </p>

        {sheetState === "creating" ? (
          <div className="mt-4">
            <NewCollectionForm
              value={newName}
              onChange={setNewName}
              onCancel={cancelCreate}
              onSubmit={confirmCreate}
            />
          </div>
        ) : (
          <div className="relative mt-4">
            {selectedCollection ? (
              <>
                <CollectionPickerTrigger
                  collection={selectedCollection}
                  open={sheetState === "selecting"}
                  onClick={handleTriggerClick}
                />
                {sheetState === "selecting" && (
                  <CollectionDropdown
                    collections={collections}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                )}
              </>
            ) : (
              <div className="flex h-16 w-full items-center rounded-lg border border-neutral-200 bg-slate-50 px-3 text-sm text-slate-400">
                Loading collections…
              </div>
            )}
          </div>
        )}

        {sheetState !== "creating" && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-slate-500">or</p>
            <button
              type="button"
              onClick={openCreateForm}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-neutral-50"
            >
              <Plus className="size-4" strokeWidth={2} />
              Create New Collection
            </button>
          </div>
        )}
      </div>

      <div className="shrink-0 space-y-3 px-6 pt-4 pb-10">
        {sheetState === "created" && (
          <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <CircleCheck className="size-4 shrink-0 text-green-600" strokeWidth={2} />
            <p className="text-sm font-medium text-[#0a0a0a]">New collection created</p>
          </div>
        )}

        <Button
          type="button"
          disabled={isSaveDisabled}
          onClick={handleSave}
          className="h-16 w-full rounded-2xl border-0 bg-[#dc2626] text-lg font-medium text-white hover:bg-[#b91c1c] disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save Card"}
        </Button>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex h-10 w-full items-center justify-center text-lg font-semibold text-gray-400 hover:text-gray-600"
        >
          Discard Result
        </button>
      </div>
    </div>
  )
}
