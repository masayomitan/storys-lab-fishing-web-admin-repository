// app/fish-categories/page.tsx
import { Box } from '@chakra-ui/react'
import FishCategories from '@/components/pages/fishCategory/index'
import apiClient from '@/app/lib/apiClient'
import Layout from '@/components/parts/Layout'

const FishCategoryPage = async () => {

  const fishCategories = await apiClient.get<any[]>(`/admin/fish-categories`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

    // データが空の場合は何も表示しない
    if (!fishCategories || fishCategories.length === 0) {
      return <Box p={4}>No data found</Box>
    }

  return (
    <Layout>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <FishCategories fishCategories={fishCategories} />
      </Box>
    </Layout>
  )
}

export default FishCategoryPage
