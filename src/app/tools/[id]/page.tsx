import { Box } from '@chakra-ui/react'
import ToolUpdate from '@/components/pages/tool/update'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/tool-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
    })
    if (!res.ok) {
        return []
    }

    const toolCategories = await res.json()

    return toolCategories.map((category: { id: number }) => ({
        id: category.id.toString(),
    }))
}

interface ToolUpdatePageProps {
    params: Promise<{
        id: string 
    }>
}

const ToolUpdatePage = async ({ params }: ToolUpdatePageProps) => {
    const { id } = await params

    // 魚カテゴリデータを取得
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const toolCategories = await apiClient.get<any[]>('/admin/tool-categories',)

    // 指定された魚データを取得
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tool = await apiClient.get<any[]>(`/admin/tools/${id}`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const materials = await apiClient.get<any[]>(`/admin/materials`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const toolImages = await apiClient.get<any[]>(`/admin/images?type=4`)

    return (
        <Layout>
            <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
                <ToolUpdate 
                    tool={tool}
                    toolCategories={toolCategories}
                    materials={materials}
                    toolImages={toolImages}
                />
            </Box>
        </Layout>
    )
}

export default ToolUpdatePage
