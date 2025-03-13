import { Box } from '@chakra-ui/react'
import FishingSpotCreate from '@/components/pages/fishingSpot/create'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0

const FishingSpotPage = async () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const areas = await apiClient.get<any[]>(`/admin/areas`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tags = await apiClient.get<any[]>(`/admin/tags`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const fishingSpotImages = await apiClient.get<any[]>(`/admin/images?type=3`)

    return (
        <Layout>
        <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
            <FishingSpotCreate 
                areas={areas}
                tags={tags}
                fishingSpotImages={fishingSpotImages}
            />
        </Box>
        </Layout>
    )
}

export default FishingSpotPage
