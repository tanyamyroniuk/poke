export type CardAnalysisResultType =
  | "not_pokemon_card"
  | "pokemon_original"
  | "pokemon_fake"
  | "unknown"

export type VerificationStatus = "verified" | "not_verified" | "inconclusive"

export type CardAnalysisResult = {
  resultType: CardAnalysisResultType
  cardName: string
  pokemonName: string
  setName: string
  cardNumber: string
  rarity: string
  hp: string
  cardType: string
  authenticityScore: number
  confidenceScore: number
  conditionScore: number
  estimatedValueRange: string
  positiveIndicators: string[]
  suspiciousIndicators: string[]
  cardIntro: string
  funFact: string
  userMessage: string
  verificationStatus?: VerificationStatus
  verificationNotes?: string
  sourcesUsed?: string[]
}

/** Map a 0–100 conditionScore to a human-readable grade label. */
export function conditionLabelFromScore(score?: number | null): string {
  if (score == null || score <= 0) return "Unknown"
  if (score >= 90) return "Gem Mint"
  if (score >= 75) return "Near Mint"
  if (score >= 55) return "Excellent"
  if (score >= 35) return "Good"
  return "Poor"
}

export const FALLBACK_RESULT: CardAnalysisResult = {
  resultType: "unknown",
  cardName: "unknown",
  pokemonName: "unknown",
  setName: "unknown",
  cardNumber: "unknown",
  rarity: "unknown",
  hp: "unknown",
  cardType: "unknown",
  authenticityScore: 0,
  confidenceScore: 0,
  conditionScore: 0,
  estimatedValueRange: "unknown",
  positiveIndicators: [],
  suspiciousIndicators: [],
  cardIntro: "",
  funFact: "unknown",
  userMessage: "We could not confidently verify this card.",
}
