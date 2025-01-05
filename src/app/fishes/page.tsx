import { Box, Flex } from '@chakra-ui/react'
import Fishes from '@/components/pages/fish/index'
import apiClient from '@/app/lib/apiClient'
import Layout from '@/components/parts/Layout'

const FishPage = async () => {

	const fishes = await apiClient.get<any[]>('/admin/fishes', {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})

	// データが空の場合は何も表示しない
	if (!fishes || fishes.length === 0) {
		return <Box p={4}>No data found</Box>
	}

	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<Fishes fishes={fishes} />
			</Box>
		</Layout>
	)
}

export default FishPage
