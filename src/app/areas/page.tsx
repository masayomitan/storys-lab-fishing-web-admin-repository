import { Box } from '@chakra-ui/react'
import Areas from '@/components/pages/area/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0
const AreaPage = async () => {

  /* eslint-disable @typescript-eslint/no-explicit-any */
	const areas = await apiClient.get<any[]>('/admin/areas', {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})

	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<Areas areas={areas} />
			</Box>
		</Layout>
	)
}

export default AreaPage
