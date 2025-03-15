import { Box } from '@chakra-ui/react'
import FishingSpotUpdate from '@/components/pages/fishingSpot/update'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/fishing-spots`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  })
  if (!res.ok) {
    return []
  }

  const fishingSpot = await res.json()

  return fishingSpot.map((category: { id: number }) => ({
    id: category.id.toString(),
  }))
}

interface FishUpdatePageProps {
  params: Promise<{
    id: string 
  }>
}

const FishingSpotUpdatePage = async ({ params }: FishUpdatePageProps) => {
  const { id } = await params

  // 魚カテゴリデータを取得
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fishingSpot = await apiClient.get<any[]>(`/admin/fishing-spots/${id}`)

  // 指定された魚データを取得
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const areas = await apiClient.get<any[]>(`/admin/areas`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tags = await apiClient.get<any[]>(`/admin/tags`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const fishingSpotImages = await apiClient.get<any[]>(`/admin/images?type=3`)

  return (
    <Layout>
      <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
        <FishingSpotUpdate 
          fishingSpot={fishingSpot}
          areas={areas}
          tags={tags}
          fishingSpotImages={fishingSpotImages}
        />
      </Box>
    </Layout>
  )
}

export default FishingSpotUpdatePage
