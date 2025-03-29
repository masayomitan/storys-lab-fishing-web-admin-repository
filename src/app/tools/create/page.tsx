import { Box } from '@chakra-ui/react'
import ToolCreate from '@/components/pages/tool/create'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

const ToolCreatePage = async () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const toolCategories = await apiClient.get<any[]>(`/admin/tool-categories`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const toolImages = await apiClient.get<any[]>(`/admin/images?type=4`)

    return (
        <Layout>
            <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
                <ToolCreate 
                    toolCategories={toolCategories}
                    toolImages={toolImages}
                />
            </Box>
        </Layout>
    )
}

export default ToolCreatePage
