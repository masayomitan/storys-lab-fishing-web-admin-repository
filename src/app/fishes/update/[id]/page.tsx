import { Box } from '@chakra-ui/react'
import FishUpdate from '@/components/pages/fish/update'
import apiClient from '@/app/lib/apiClient'
import Layout from '@/components/parts/Layout'

interface FishUpdatePageProps {
  params: Promise<{
    id: string 
  }>
}

const FishUpdatePage = async ({ params }: FishUpdatePageProps) => {
  const { id } = await params

  // 魚カテゴリデータを取得
  const fishCategories = await apiClient.get<any[]>('/admin/fish-categories', {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  // 指定された魚データを取得
  const fish = await apiClient.get<any[]>(`/admin/fishes/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  return (
    <Layout>
      <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
        <FishUpdate fishCategories={fishCategories} fish={fish} />
      </Box>
    </Layout>
  )
}

export default FishUpdatePage
