import { Box } from '@chakra-ui/react'
import FishUpdate from '@/components/pages/fish/update'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/fish-categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  })
  if (!res.ok) {
    return []
  }

  const fishCategories = await res.json()

  return fishCategories.map((category: { id: number }) => ({
    id: category.id.toString(),
  }))
}

interface FishUpdatePageProps {
  params: {
    id: string 
  }
}

const FishUpdatePage = async ({ params }: FishUpdatePageProps) => {
  const { id } = await params

  // 魚カテゴリデータを取得
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fishCategories = await apiClient.get<any[]>('/admin/fish-categories', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 指定された魚データを取得
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fish = await apiClient.get<any[]>(`/admin/fishes/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <Layout>
      <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
        <FishUpdate 
          fish={fish}
          fishCategories={fishCategories}
        />
      </Box>
    </Layout>
  )
}

export default FishUpdatePage
