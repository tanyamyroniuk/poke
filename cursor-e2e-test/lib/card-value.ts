/**
 * Helpers for turning the LLM's estimated value range (a string like "$5 - $15"
 * or "$0.10 - $0.50") into numbers for storage and aggregation.
 */

/** Parse the lower-bound dollar amount from an LLM value range. Handles decimals and commas. */
export function lowerBoundFromRange(range?: string | null): number | null {
  if (!range || range.trim().toLowerCase() === "unknown") return null
  const match = range.match(/\$?\s*([\d,]+(?:\.\d+)?)/)
  if (!match) return null
  const value = parseFloat(match[1].replace(/,/g, ""))
  return Number.isFinite(value) ? value : null
}

/** Read the estimatedValueRange string out of a persisted analysisJson blob. */
export function rangeFromAnalysisJson(analysisJson?: string | null): string | null {
  if (!analysisJson) return null
  try {
    const range = (JSON.parse(analysisJson) as { estimatedValueRange?: string }).estimatedValueRange
    if (typeof range === "string" && range.trim() && range.trim().toLowerCase() !== "unknown") {
      return range.trim()
    }
  } catch {
    // ignore malformed analysis JSON
  }
  return null
}

/**
 * Numeric value to count for a stored card. Prefers the LLM range's lower bound
 * (parsed from analysisJson), falls back to the stored estimatedValue, else 0.
 */
export function cardNumericValue(
  estimatedValue: number | null | undefined,
  analysisJson: string | null | undefined,
): number {
  const fromRange = lowerBoundFromRange(rangeFromAnalysisJson(analysisJson))
  return fromRange ?? estimatedValue ?? 0
}
