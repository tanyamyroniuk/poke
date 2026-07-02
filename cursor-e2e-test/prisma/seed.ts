import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const USERS = ["tanya", "michal", "demo"]

async function main() {
  for (const userId of USERS) {
    const original = await prisma.collection.upsert({
      where: { id: `${userId}-original-cards` },
      update: {},
      create: { id: `${userId}-original-cards`, name: "Original Cards Collection", userId },
    })

    const fake = await prisma.collection.upsert({
      where: { id: `${userId}-fake-cards` },
      update: {},
      create: { id: `${userId}-fake-cards`, name: "Fake Cards Collection", userId },
    })

    const existingOriginal = await prisma.card.count({ where: { collectionId: original.id } })
    if (existingOriginal === 0) {
      await prisma.card.createMany({
        data: [
          { pokemonName: "Charizard", isOriginal: true, estimatedValue: 3500, authenticityScore: 98.2, imageUrl: "/images/card-charizard.jpg", collectionId: original.id },
          { pokemonName: "Gyarados",  isOriginal: true, estimatedValue: 1500, authenticityScore: 99.5, imageUrl: "/images/card-gyarados.jpg",  collectionId: original.id },
          { pokemonName: "Skitty",    isOriginal: true, estimatedValue: 1500, authenticityScore: 84.9, imageUrl: "/images/card-skitty.jpg",    collectionId: original.id },
          { pokemonName: "Mew",       isOriginal: true, estimatedValue: 1500, authenticityScore: 84.9, imageUrl: "/images/card-mew.jpg",       collectionId: original.id },
        ],
      })
      console.log(`Seeded original cards for ${userId}`)
    }

    const existingFake = await prisma.card.count({ where: { collectionId: fake.id } })
    if (existingFake === 0) {
      await prisma.card.createMany({
        data: [
          { pokemonName: "Charizard", isOriginal: false, estimatedValue: 12, authenticityScore: 14.3, imageUrl: "/images/card-charizard.jpg", collectionId: fake.id },
          { pokemonName: "Gyarados",  isOriginal: false, estimatedValue: 8,  authenticityScore: 22.1, imageUrl: "/images/card-gyarados.jpg",  collectionId: fake.id },
          { pokemonName: "Mew",       isOriginal: false, estimatedValue: 5,  authenticityScore: 11.7, imageUrl: "/images/card-mew.jpg",       collectionId: fake.id },
        ],
      })
      console.log(`Seeded fake cards for ${userId}`)
    }
  }

  console.log("Seed complete")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
