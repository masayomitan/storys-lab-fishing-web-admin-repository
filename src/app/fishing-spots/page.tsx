import { Box } from '@chakra-ui/react'
import FishingSpots from '@/components/pages/fishingSpot/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

const FishingSpotPage = async () => {

  /* eslint-disable @typescript-eslint/no-explicit-any */
	const fishingSpots = await apiClient.get<any[]>('/admin/fishing-spots')

	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<FishingSpots fishingSpots={fishingSpots} />
			</Box>
		</Layout>
	)
}

export default FishingSpotPage
