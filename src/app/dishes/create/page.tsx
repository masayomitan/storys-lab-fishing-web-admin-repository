import { Box } from '@chakra-ui/react'
import DishCreate from '@/components/pages/dish/create'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

const DishCreatePage = async () => {

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const dishImages = await apiClient.get<any[]>(`/admin/images?type=4`)

    return (
        <Layout>
            <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
                <DishCreate 
                    dishImages={dishImages}
                />
            </Box>
        </Layout>
    )
}

export default DishCreatePage
