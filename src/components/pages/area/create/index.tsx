'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
	Box,
	Button,
	Text,
	Textarea,
	Fieldset,
	Input,
	Stack,
} from '@chakra-ui/react'
import { createListCollection } from '@chakra-ui/react'
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from '@/components/ui/select'
import { Field } from '@/components/ui/field'

import { areaSchema, ImageType } from './constant'
import { useCreateArea } from './logic'
import SetImages from '@/components/parts/Modal/setImages'

type AreaFormData = z.infer<typeof areaSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const AreaCreate = ({ areaImages, prefectures }: any) => {
	const [selectedImages, setSelectedImages] = useState<[]>([])

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<AreaFormData>({
		resolver: zodResolver(areaSchema),
		defaultValues: {
			name: '',
			description: '',
			prefecture_id: 0,
			images: []
		}
	})
	const { handleCreateRequest } = useCreateArea()

	const mappedPrefectures = createListCollection({
		/* eslint-disable @typescript-eslint/no-explicit-any */
		items: prefectures.map((prefecture: any) => ({
			label: prefecture.name,
			value: prefecture.id.toString(),
		})),
	})

	const handleImageSelect = (imageIds: number[]) => {
		const selectedImages = areaImages.filter((image: any) => imageIds.includes(image.id))
		setSelectedImages(selectedImages)
		setValue('images', selectedImages)
	}

	return (
		<Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
			<Text fontSize='xl' fontWeight='bold' mb={4}>
				エリア登録フォーム
			</Text>

			<form onSubmit={handleSubmit(handleCreateRequest)}>
				<Fieldset.Root>
					<Stack>
						<Fieldset.Legend>エリアの情報</Fieldset.Legend>
					</Stack>
					<Fieldset.Content>

						{/* 名称 */}
						<Field label='名称' invalid={!!errors.name}>
						<Input
							type='text'
							placeholder='エリアの名称を入力してください'
							{...register('name')}
						/>
						{errors.name && (
							<Text color='red.500' fontSize='sm'>
								{errors.name.message}
							</Text>
						)}
						</Field>

						{/* 都道府県 */}
						<Field label='都道府県' invalid={!!errors.prefecture_id}>
						<Controller
							control={control}
							name='prefecture_id'
							render={({ field }) => (
							<SelectRoot
								onValueChange={(value) => field.onChange(parseInt(value.value[0]))}
								collection={mappedPrefectures}
							>
								<SelectTrigger>
								<SelectValueText placeholder='都道府県を選択してください' />
								</SelectTrigger>
								<SelectContent>
								{prefectures.map((category: any) => (
									<SelectItem
										key={category.id}
										item={category.id.toString()}
									>
									{category.name}
									</SelectItem>
								))}
								</SelectContent>
							</SelectRoot>
							)}
						/>
						{errors.prefecture_id && (
							<Text color='red.500' fontSize='sm'>
							{errors.prefecture_id.message}
							</Text>
						)}
						</Field>

						{/* 説明 */}
						<Field label='説明'>
						<Textarea
							placeholder='説明を入力してください'
							{...register('description')}
						/>
						</Field>

						<SetImages 
							images={areaImages}
							onSelect={handleImageSelect}
						/>
						{/* Selected Images */}
						<Field label="選択された画像">
						<Stack direction="row" flexWrap="wrap" gap={2}>
							{selectedImages.map((selectedImage: ImageType) => (
							<Box
								key={selectedImage.id}
								borderRadius="full"
								colorScheme="blue"
							>
								<Image
									src={selectedImage.image_url}
									alt={selectedImage.name}
									width={100}
									height={100}
									style={{ objectFit: 'cover' }}
								/>
							</Box>
							))}
						</Stack>
						</Field>
					</Fieldset.Content>
				</Fieldset.Root>

				<Button type='submit' colorScheme='blue' w='full' mt={4}>
					登録
				</Button>
			</form>
		</Box>
	)
}

export default AreaCreate
