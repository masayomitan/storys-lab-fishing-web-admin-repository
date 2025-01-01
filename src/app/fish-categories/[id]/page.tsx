// app/fish-categories/page.tsx
import { Box } from '@chakra-ui/react'
import FishCategories from '@/components/pages/fishCategory/index'

export const generateStaticParams = async () => {
  console.log('Fetching from:', process.env.NEXT_PUBLIC_API_ENDPOINT)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/mc/fish-categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  console.log(res)
  if (!res.ok) {
    console.log('no!')
    return false
  }

  const fishCategories = await res.json()
  
  // 動的ルートが必要な場合は以下を返します
  return fishCategories.map((category: { id: number }) => ({
    id: category.id.toString(),
  }))
}

type FishCategoryPageProps = {
  params: {
    id?: string
  }
}

const FishCategoryPage = async ({ params }: FishCategoryPageProps) => {
  const { id } = params
  console.log(id)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/mc/fish-categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  console.log(res)

  if (!res.ok) {
    console.log('no!')
    return false
  }

  const fishCategories = await res.json()

  return (
    <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
      <FishCategories fishCategories={fishCategories} />
    </Box>
  )
}

export default FishCategoryPage
