import { Box } from '@chakra-ui/react'
import ToolCategories from '@/components/pages/toolCategory/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0

const ToolCategoryPage = async () => {

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const toolCategories = await apiClient.get<any[]>('/admin/tool-categories')

	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<ToolCategories toolCategories={toolCategories} />
			</Box>
		</Layout>
	)
}

export default ToolCategoryPage
