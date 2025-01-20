import { Box } from '@chakra-ui/react'
import FishCreate from '@/components/pages/fish/create'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

const FishCreatePage = async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fishCategories = await apiClient.get<any[]>(`/admin/fish-categories`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  return (
    <Layout>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <FishCreate 
          fishCategories={fishCategories}
        />
      </Box>
    </Layout>
  )
}

export default FishCreatePage
