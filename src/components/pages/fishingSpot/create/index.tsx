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
import { Toaster } from '@/components/ui/toaster'
import { Field } from '@/components/ui/field'
import { fishingSpotSchema, ImageType } from './constant'
import { useCreateFishCategory } from './logic'
import SetImages from '@/components/parts/Modal/setImages'

type FishingSpotFormData = z.infer<typeof fishingSpotSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const FishingSpotCreate = ({ areas, tags, fishingSpotImages }: any) => {
    const [selectedImages, setSelectedImages] = useState<[]>([])
    // const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FishingSpotFormData>({
        resolver: zodResolver(fishingSpotSchema),
        defaultValues: {
            name: '',
            area_id: 0,
            description: '',
            recommended_fishing_methods: 0,
            tags: [],
            images: [],
        },
    })

    const {
        handleCreateRequest,
    } = useCreateFishCategory()

    const handleImageSelect = (imageIds: number[]) => {
		const selectedImages = fishingSpotImages.filter((image: any) => imageIds.includes(image.id))
		setSelectedImages(selectedImages)
		setValue('images', selectedImages)
	}

    const mappedAreas = createListCollection({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        items: areas.map((prefecture: any) => ({
            label: prefecture.name,
            value: prefecture.id.toString(),
        })),
    })

    const mappedTags = createListCollection({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        items: tags.map((tag: any) => ({
            label: tag.name,
            value: tag.id.toString(),
        })),
    })
    
    
    return (
        <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
            <Text fontSize='xl' fontWeight='bold' mb={4}>
                釣り場 登録
            </Text>

            <form onSubmit={handleSubmit(handleCreateRequest)}>
                <Fieldset.Root>
                    <Fieldset.Content>
                        {/* 名称 */}
                        <Field label='名称' invalid={!!errors.name}>
                            <Input
                                type='text'
                                {...register('name')}
                            />
                            {errors.name && (
                            <Text color='red.500' fontSize='sm'>
                                {errors.name.message}
                            </Text>
                            )}
                        </Field>

                        {/* エリア */}
                        <Field label='エリア' invalid={!!errors.area_id}>
                        <Controller
                            control={control}
                            name='area_id'
                            render={({ field }) => (
                                <SelectRoot
                                    onValueChange={(value) => field.onChange(parseInt(value.value[0]))}
                                    collection={mappedAreas}
                                >
                                    <SelectTrigger>
                                        <SelectValueText placeholder='エリアを選択してください' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area: any) => (
                                            <SelectItem
                                                key={area.id}
                                                item={area.id.toString()}
                                            >
                                                {area.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            )}
                        />
                        {errors.area_id && (
                            <Text color='red.500' fontSize='sm'>
                            {errors.area_id.message}
                            </Text>
                        )}
                        </Field>

                      {/* TODO おすすめ釣りメソッド */}
                      {/* <Field label='エリア' invalid={!!errors.area_id}>
                        <Controller
                            control={control}
                            name='area_id'
                            render={({ field }) => (
                                <SelectRoot
                                    onValueChange={(value) => field.onChange(parseInt(value.value[0]))}
                                    collection={mappedAreas}
                                >
                                    <SelectTrigger>
                                        <SelectValueText placeholder='エリアを選択してください' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area: any) => (
                                            <SelectItem
                                                key={area.id}
                                                item={area.id.toString()}
                                            >
                                                {area.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            )}
                        />
                        {errors.area_id && (
                            <Text color='red.500' fontSize='sm'>
                            {errors.area_id.message}
                            </Text>
                        )}
                        </Field> */}

                        {/* 説明 */}
                        <Field label='説明'>
                            <Textarea
                                placeholder='釣り場の説明を入力してください'
                                {...register('description')}
                            />
                        </Field>

						{/* タグ */}
                        <Field label='タグ' invalid={!!errors.tags}>
                            <Controller
                                control={control}
                                name='tags'
                                render={({ field }) => (
                                    <SelectRoot
                                        multiple
                                        onValueChange={(value) => {
                                            const selectedIds = value.items.map((item: any) => parseInt(item.value))
                                            const selectedTags = tags.filter((tag: any) => selectedIds.includes(tag.id))
                                            if (value.value.length <= 3) {
                                                // field.onChange(value.value.map((v: string) => parseInt(v)))
                                                field.onChange(selectedTags)
                                            }
                                        }}
                                        collection={mappedTags}
                                    >
                                        <SelectTrigger>
                                            <SelectValueText placeholder='エリアを選択してください' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tags.map((tag: any) => (
                                                <SelectItem
                                                    key={tag.id}
                                                    item={tag.id.toString()}
                                                >
                                                    {tag.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectRoot>
                                )}
                            />
                            {errors.tags && (
                                <Text color='red.500' fontSize='sm'>
                                {errors.tags.message}
                                </Text>
                            )}
                        </Field>

                        <SetImages 
                            images={fishingSpotImages}
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
            <Toaster />
        </Box>
        )
    }
export default FishingSpotCreate
