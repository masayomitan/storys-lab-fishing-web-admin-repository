// app/fish/page.tsx
import { Box } from '@chakra-ui/react'
import Fishes from '@/components/pages/fish/index'
import apiClient from '@/app/lib/apiClient'

const FishPage = async () => {

    // APIクライアントからデータを取得
    const fishes = await apiClient.get<any[]>('/admin/fishes', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    // データが空の場合は何も表示しない
    if (!fishes || fishes.length === 0) {
      return <Box p={4}>No data found</Box>
    }

    return (
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <Fishes fishes={fishes} />
      </Box>
    )
}

export default FishPage
