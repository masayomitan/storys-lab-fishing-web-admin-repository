import { Box } from '@chakra-ui/react'
import DishUpdate from '@/components/pages/dish/update'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/dishes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
    })
    if (!res.ok) {
        return []
    }

    const dishes = await res.json()

    return dishes.map((category: { id: number }) => ({
        id: category.id.toString(),
    }))
}

interface DishUpdatePageProps {
    params: Promise<{
        id: string 
    }>
}

const DishUpdatePage = async ({ params }: DishUpdatePageProps) => {
    const { id } = await params

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const dish = await apiClient.get<any[]>(`/admin/dishes/${id}`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const dishImages = await apiClient.get<any[]>(`/admin/images?type=5`)

    return (
        <Layout>
            <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
                <DishUpdate 
                    dish={dish}
                    dishImages={dishImages}
                />
            </Box>
        </Layout>
    )
}

export default DishUpdatePage
