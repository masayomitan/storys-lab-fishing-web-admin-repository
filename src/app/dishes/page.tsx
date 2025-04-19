import { Box } from '@chakra-ui/react'
import Dishes from '@/components/pages/dish/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0

const ToolAdminPage = async () => {

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const dishes = await apiClient.get<any[]>('/admin/dishes')

    return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<Dishes dishes={dishes} />
			</Box>
		</Layout>
    )
}

export default ToolAdminPage
