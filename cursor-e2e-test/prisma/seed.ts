import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const original = await prisma.collection.upsert({
    where: { id: "original-cards" },
    update: {},
    create: { id: "original-cards", name: "Original Cards Collection" },
  })

  const fake = await prisma.collection.upsert({
    where: { id: "fake-cards" },
    update: {},
    create: { id: "fake-cards", name: "Fake Cards Collection" },
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
    console.log("Seeded original cards")
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
    console.log("Seeded fake cards")
  }

  console.log("Seed complete")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
