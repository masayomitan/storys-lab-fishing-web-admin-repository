import { Box } from '@chakra-ui/react'
import FishCategories from '@/components/pages/fishCategory/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

const FishCategoryPage = async () => {
  console.log('FishCategoryPage Start')

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fishCategories = await apiClient.get<any[]>(`/admin/fish-categories`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
  console.log('FishCategoryPage')
  console.log(fishCategories)

  return (
    <Layout>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <FishCategories fishCategories={fishCategories} />
      </Box>
    </Layout>
  )
}

export default FishCategoryPage
