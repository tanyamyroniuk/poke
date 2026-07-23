import type { NotPokemonImageCategory } from "@/lib/types/card-analysis"

export type NotPokemonMessage = {
  header: string
  subtext: string
}

const MESSAGES: Record<NotPokemonImageCategory, NotPokemonMessage[]> = {
  animal: [
    { header: "Stop sending me selfies.", subtext: "Cute, but I still need a real Pokémon card." },
    { header: "Nice Pokémon. Wrong universe.", subtext: "Try again with an actual Pokémon card." },
    { header: "Adorable. Still not a card.", subtext: "Show me something from the Pokémon TCG." },
  ],
  person: [
    { header: "You do look like a Pokémon.", subtext: "Unfortunately, you are still not a Pokémon card." },
    // { header: "Bold submission.", subtext: "Now show me a real Pokémon card." },
    // { header: "I see a human. I need a card.", subtext: "Point the camera at a Pokémon TCG card." },
  ],
  food: [
    { header: "Great snack. Wrong app.", subtext: "Eat it, then scan a real Pokémon card." },
    { header: "Delicious. Completely useless.", subtext: "I'm still waiting for a Pokémon card." },
    { header: "Not on the menu.", subtext: "I only accept Pokémon TCG cards." },
  ],
  object: [
    { header: "I think you're testing my patience.", subtext: "Try again with an actual Pokémon card." },
    { header: "Interesting object. Zero Pokédex value.", subtext: "Send me a real Pokémon card." },
    { header: "Cool thing. Wrong scanner.", subtext: "This app only reads Pokémon TCG cards." },
  ],
  landscape: [
    { header: "Lovely view. Wrong adventure.", subtext: "Come back with a Pokémon card." },
    { header: "Great scenery. Zero Pokédex value.", subtext: "Now scan a real Pokémon card." },
    { header: "Professor Oak wants cards, not tourism.", subtext: "Point the camera at a Pokémon TCG card." },
  ],
  document_or_screen: [
    { header: "That's a screen, not a card.", subtext: "You know what to do. Try again." },
    { header: "Bold idea. Still wrong.", subtext: "Hold a real Pokémon card up to the camera." },
    { header: "I only read Pokémon cards.", subtext: "Not documents, not screens. Just cards." },
  ],
  unreadable: [
    { header: "Even Professor Oak couldn't read this.", subtext: "Take a clearer photo of the card." },
    { header: "I see pixels. I don't see Pokémon.", subtext: "Clean your lens and try again." },
    { header: "Too blurry. Try harder.", subtext: "Hold the camera steady and take a new photo." },
  ],
  other: [
    { header: "Bro, I'm not blind.", subtext: "This is definitely not a Pokémon card." },
    { header: "Nice try.", subtext: "Now send me something from the Pokémon TCG." },
    { header: "I have no idea what that is.", subtext: "But I know it's not a Pokémon card." },
  ],
}

export function pickNotPokemonMessage(category?: string | null): NotPokemonMessage {
  const pool = MESSAGES[(category as NotPokemonImageCategory) ?? "other"] ?? MESSAGES.other
  return pool[Math.floor(Math.random() * pool.length)]
}
