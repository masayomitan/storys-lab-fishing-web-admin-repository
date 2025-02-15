import { Box } from '@chakra-ui/react'
import FishCategories from '@/components/pages/fishCategory/update/index'

export const revalidate = 60

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

type FishCategoryPageProps = {
  params: {
    id: string 
  }
}

const FishCategoryPage = async ({ params }: FishCategoryPageProps) => {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/fish-categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return <div>エラーが発生しました。</div>
  }

  const fishCategory = await res.json()
  return (
    <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
      <FishCategories fishCategory={fishCategory} />
    </Box>
  )
}

export default FishCategoryPage
