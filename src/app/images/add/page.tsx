'use client'

import { Box } from '@chakra-ui/react'
import ImageAdd from '@/components/pages/image/create/index'
import Layout from '@/components/parts/Layout/index'

const ImageAddPage = () => {
	return (
		<Layout>
			<Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
					<ImageAdd />
			</Box>
		</Layout>
	)
}

export default ImageAddPage
