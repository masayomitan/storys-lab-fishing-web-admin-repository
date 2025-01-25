'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'

import {
  Box,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react'

import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

const SetImages = ({
	images,
	onSelect
}) => {
	const [selectedImages, setSelectedImages] = useState<number[]>([])

  const handleImageClick = useCallback((imageId: number) => {
			if (selectedImages.includes(imageId)) {
				const updatedImages = selectedImages.filter((id) => id !== imageId)
				setSelectedImages(updatedImages)
				onSelect(updatedImages)
			} else {
				const updatedImages = [...selectedImages, imageId]
				setSelectedImages(updatedImages)
				onSelect(updatedImages)
			}
		},
		[selectedImages, onSelect]
	)	

	return (
		<Box>
			<DialogRoot>
				<DialogTrigger asChild>
					<Button variant='outline' size='sm'>
						画像を選択
					</Button>
				</DialogTrigger>
				<DialogContent
					position='fixed'
					top='50%'
					left='50%'
					transform='translate(-50%, -50%)'
					bg='white'
					borderRadius='md'
					boxShadow='lg'
					width={{
						base: '90%',
						md: '600px',
					}}
					maxWidth='90%'
					p={6}
				>
					<DialogCloseTrigger />
					<DialogHeader>
						<DialogTitle>画像を選択</DialogTitle>
					</DialogHeader>
					<DialogBody>
						<Grid
							templateColumns={{
								base: 'repeat(2, 1fr)',
								md: 'repeat(3, 1fr)',
								lg: 'repeat(4, 1fr)',
							}}
							gap={4}
						>
							{images.map((image) => (
								<GridItem key={image.id}>
									<Box
										position='relative'
										border='1px solid'
										borderColor='gray.300'
										borderRadius='md'
										overflow='hidden'
										cursor='pointer'
										onClick={() => handleImageClick(image.id)}
									>
										<Image
											src={image.image_url}
											alt={image.name}
											width={150}
											height={120}
											style={{
												objectFit: 'cover',
												width: '100%',
												height: '100%',
											}}
										/>
									</Box>
								</GridItem>
							))}
						</Grid>
					</DialogBody>
					<DialogFooter>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		</Box>
	)
}

export default SetImages
