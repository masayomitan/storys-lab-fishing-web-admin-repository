import { Box } from '@chakra-ui/react'
import FishCategories from '@/components/pages/fishCategory/index'

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/mc/fish-categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return []
  }

  const fishCategories = await res.json()

  return fishCategories.map((category: { id: number }) => ({
    id: category.id.toString(),
  }))
}

type FishCategoryPageProps = {
  params: Promise<{
    id: string 
  }>
}

const FishCategoryPage = async ({ params }: FishCategoryPageProps) => {
  const { id } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/mc/fish-categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return <div>エラーが発生しました。</div>
  }

  const fishCategories = await res.json()

  return (
    <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
      <FishCategories fishCategories={fishCategories} />
    </Box>
  )
}

export default FishCategoryPage
