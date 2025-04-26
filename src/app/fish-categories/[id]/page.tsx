import { Box } from '@chakra-ui/react'
import FishCategoryUpdate from '@/components/pages/fishCategory/update/index'
import Layout from '@/components/parts/Layout'

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
    params: Promise<{
        id: string 
    }>
}

const FishCategoryUpdatePage = async ({ params }: FishCategoryPageProps) => {
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
        <Layout>
            <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
                <FishCategoryUpdate fishCategory={fishCategory} />
            </Box>
        </Layout>
    )
}

export default FishCategoryUpdatePage
