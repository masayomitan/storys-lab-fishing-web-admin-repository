// app/fish-categories/page.tsx
'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react'
import ImageAdd from '@/components/pages/image/create/index'
import apiClient from '@/app/lib/apiClient'
import Layout from '@/components/parts/Layout'

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
