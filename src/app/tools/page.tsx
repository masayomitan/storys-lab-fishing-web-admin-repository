import { Box } from '@chakra-ui/react'
import Tools from '@/components/pages/tool/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0

const ToolAdminPage = async () => {

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tools = await apiClient.get<any[]>('/admin/tools')

    return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<Tools tools={tools} />
			</Box>
		</Layout>
    )
}

export default ToolAdminPage
