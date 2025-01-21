import { Box } from '@chakra-ui/react'
import Fishes from '@/components/pages/fish/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

const FishPage = async () => {

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const fishes = await apiClient.get<any[]>('/admin/fishes', {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})

	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<Fishes fishes={fishes} />
			</Box>
		</Layout>
	)
}

export default FishPage
