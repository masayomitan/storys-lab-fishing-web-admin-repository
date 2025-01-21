import { Box } from '@chakra-ui/react'
import FishCategoryCreate from '@/components/pages/fishCategory/create'
import Layout from '@/components/parts/Layout'

const FishCategoryCreatePage = () => {
  return (
    <Layout>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <FishCategoryCreate />
      </Box>
    </Layout>
  )
}

export default FishCategoryCreatePage
