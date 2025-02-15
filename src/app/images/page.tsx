import {
  Box,
} from '@chakra-ui/react'
import Images from '@/components/pages/image/index'
import apiClient from '@/lib/apiClient'
import Layout from '@/components/parts/Layout'
export const revalidate = 0

const ImagePage = async () => {
	/* eslint-disable @typescript-eslint/no-explicit-any */
  const images = await apiClient.get<any[]>('/admin/images', {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})

	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
				<Images images={images} />
			</Box>
		</Layout>
	)
}

export default ImagePage
