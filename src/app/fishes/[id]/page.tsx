import { Box } from '@chakra-ui/react'
import FishUpdate from '@/components/pages/fish/update'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'

export const revalidate = 0

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/fish-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
    })
    if (!res.ok) {
        return []
    }

    const fishCategories = await res.json()

    return fishCategories.map((category: { id: number }) => ({
        id: category.id.toString(),
    }))
}

interface FishUpdatePageProps {
    params: Promise<{
        id: string 
    }>
}

const FishUpdatePage = async ({ params }: FishUpdatePageProps) => {
    const { id } = await params

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const fishCategories = await apiClient.get<any[]>('/admin/fish-categories',)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const fish = await apiClient.get<any[]>(`/admin/fishes/${id}`)

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const dishes = await apiClient.get<any[]>(`/admin/dishes`)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const fishImages = await apiClient.get<any[]>(`/admin/images?type=1`)

	return (
		<Layout>
			<Box p={4} bg="white" borderRadius="md" boxShadow="sm">
				<FishUpdate 
					fish={fish}
					fishCategories={fishCategories}
					fishImages={fishImages}
					dishes={dishes}
				/>
			</Box>
		</Layout>
	)
}

export default FishUpdatePage
