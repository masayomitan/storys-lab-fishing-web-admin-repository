import { Box } from '@chakra-ui/react'
import FishCategoryCreate from '@/components/pages/fishCategory/create'

const FishCategoryCreatePage = () => {
  return (
    <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
      <FishCategoryCreate />
    </Box>
  )
}

export default FishCategoryCreatePage
