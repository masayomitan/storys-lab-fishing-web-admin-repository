import { Box } from '@chakra-ui/react'
import ToolCategoryUpdate from '@/components/pages/toolCategory/update/index'

export const revalidate = 60

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/tool-categories`)
    if (!res.ok) {
        return []
    }

    const toolCategories = await res.json()

    return toolCategories.map((category: { id: number }) => ({
        id: category.id.toString(),
    }))
}

type ToolCategoryPageProps = {
    params: Promise<{
        id: string 
    }>
}

const toolCategoryUpdatePage = async ({ params }: ToolCategoryPageProps) => {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/tool-categories/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        return <div>エラーが発生しました。</div>
    }

    const toolCategory = await res.json()
    return (
        <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
            <ToolCategoryUpdate toolCategory={toolCategory} />
        </Box>
    )
}

export default toolCategoryUpdatePage
