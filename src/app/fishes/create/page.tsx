// app/fish-categories/page.tsx
import { Box } from '@chakra-ui/react'
import FishCreate from '@/components/pages/fish/create'

const FishCreatePage = () => {
  return (
    <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
      <FishCreate />
    </Box>
  )
}

export default FishCreatePage
