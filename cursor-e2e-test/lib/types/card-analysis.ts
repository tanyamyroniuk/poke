export type CardAnalysisResultType =
  | "not_pokemon_card"
  | "pokemon_original"
  | "pokemon_fake"
  | "unknown"

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
  funFact: string
  userMessage: string
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
  funFact: "unknown",
  userMessage: "We could not confidently verify this card.",
}
