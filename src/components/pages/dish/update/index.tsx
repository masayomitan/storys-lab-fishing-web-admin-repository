'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, useFieldArray } from 'react-hook-form'
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
	Flex,
	IconButton,
} from '@chakra-ui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { Field } from '@/components/ui/field'

import { dishSchema, ImageType } from './constant'
import { useUpdateDish } from './logic'
import SetImages from '@/components/parts/Modal/setImages'

type DishFormData = z.infer<typeof dishSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const DishUpdate = ({ dish, dishImages }: any) => {
    const [selectedImages, setSelectedImages] = useState<[]>([])
	const [removedIngredients, setRemovedIngredients] = useState<DishFormData['ingredients']>([])

    const {
        register,
        handleSubmit,
        control,
        setValue,
		getValues,
        formState: { errors },
    } = useForm<DishFormData>({
        resolver: zodResolver(dishSchema),
		defaultValues: {
			name: dish.name || '',
			description: dish?.description || '',
			ingredients: dish?.ingredients || [],
			kind: dish?.kind || '',
			level: dish?.level || 0,
			images: dish.images || []
		}
    })

    const { handleUpdateRequest } = useUpdateDish()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'ingredients',
	})

    const handleImageSelect = (imageIds: number[]) => {
        const selectedImages = dishImages.filter((image: any) => imageIds.includes(image.id))
        setSelectedImages(selectedImages)
        setValue('images', selectedImages)
    }

	const handleRemove = (index: number) => {
		const current = getValues('ingredients')[index]
		setRemovedIngredients((prev) => [...prev, current])
		remove(index)
	}

	const handleRestore = () => {
		const last = removedIngredients[removedIngredients.length - 1]
		if (!last) return
		setRemovedIngredients((prev) => prev.slice(0, -1))
		append(last)
	}

	return (
		<Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
			<Text fontSize='xl' fontWeight='bold' mb={4}>
				料理登録フォーム
			</Text>

			<form onSubmit={handleSubmit((data) => handleUpdateRequest(dish.id, data))}>
				<Fieldset.Root>
					<Stack>
						<Fieldset.Legend>料理の情報</Fieldset.Legend>
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

						{/* 説明 */}
						<Field label='説明'>
							<Textarea
								placeholder='説明を入力してください'
								{...register('description')}
							/>
						</Field>

						{/* 材料（複数行入力） */}
						<Field label="材料">
							<Stack>
								{fields.map((field, index) => (
									<Flex key={field.id} align="center">
										<Text mr={2}>{index + 1}</Text>
										<Input
											flex={1}
											mr={2}
											placeholder="材料名"
											{...register(`ingredients.${index}.material` as const)}
										/>
										<Input
											flex={1}
											mr={2}
											placeholder="分量"
											{...register(`ingredients.${index}.amount` as const)}
										/>
										<IconButton
											aria-label="削除"
											size="sm"
											onClick={() => handleRemove(index)}
										>
											<AiOutlineClose />
										</IconButton>
									</Flex>
								))}
								<Button
									onClick={() => append({ material: '', amount: '' })}
									size="sm"
								>
									追加
								</Button>
								{removedIngredients.length > 0 && (
									<Button onClick={handleRestore} size="sm" colorScheme="gray">
										直前の削除を元に戻す
									</Button>
								)}
							</Stack>
						</Field>

						{/* 種類 */}
						<Field label='種類'>
							<Input
								type='number'
								placeholder=''
								{...register('kind')}
							/>
						</Field>

						{/* 難易度 */}
						<Field label='難易度'>
							<Input
								type='number'
								placeholder=''
								{...register('level')}
							/>
						</Field>

						<SetImages 
							images={dishImages}
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

export default DishUpdate
	