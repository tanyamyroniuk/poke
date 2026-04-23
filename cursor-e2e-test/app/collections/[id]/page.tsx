import { CollectionDetailScreen } from "@/components/collections/collection-detail-screen"

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CollectionDetailScreen collectionId={id} />
}
