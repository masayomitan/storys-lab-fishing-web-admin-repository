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
import { fishingSpotSchema } from './constant'
import { useUpdateFishingSpot } from './logic'
import SetImages from '@/components/parts/Modal/setImages'

type FishingSpotFormData = z.infer<typeof fishingSpotSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const FishingSpotUpdate = ({ fishingSpot, areas, tags, fishingSpotImages }: any) => {
    // 初期値がある場合はそのまま useState にセット
    const [selectedImages, setSelectedImages] = useState(fishingSpot.Images || [])
    console.log(fishingSpot.Images)
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FishingSpotFormData>({
        resolver: zodResolver(fishingSpotSchema),
        defaultValues: {
            name: fishingSpot.name || '',
            area_id: fishingSpot.area_id || 0,
            description: fishingSpot.description || '',
            recommended_fishing_methods: fishingSpot.recommended_fishing_methods || 0,
            tags: fishingSpot.Tags || [],
            images: fishingSpot.Images || [],
        },
    })

    const {
        handleUpdateRequest,
    } = useUpdateFishingSpot()

    // TODO 選択動作がおかしい
    const handleImageSelect = (imageIds: number[]) => {
        const selected = fishingSpotImages.filter((image: any) => imageIds.includes(image.id))
        setSelectedImages(selected)
        setValue('images', selected)
    }

    const mappedAreas = createListCollection({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        items: areas.map((area: any) => ({
            label: area.name,
            value: area.id.toString(),
        })),
    })

    const mappedTags = createListCollection({
        items: tags.map((tag: any) => ({
            label: tag.name,
            value: tag.id.toString(),
        })),
    })

    return (
        <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
            <Text fontSize='xl' fontWeight='bold' mb={4}>
                釣り場 更新
            </Text>

            <form onSubmit={handleSubmit((data) => handleUpdateRequest(fishingSpot.id, data))}>
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
                                    onValueChange={(value) =>
                                    field.onChange(parseInt(value.value[0]))
                                    }
                                    // 初期値として、area_id を文字列に変換して渡す
                                    defaultValue={[field.value.toString()]}
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
                                        // 初期値として、既に選択されているタグの id を文字列の配列で渡す
                                        defaultValue={
                                        field.value && field.value.length
                                            ? field.value.map((tag: any) => tag.id.toString())
                                            : []
                                        }
                                        collection={mappedTags}
                                    >
                                    <SelectTrigger>
                                        <SelectValueText placeholder='タグを選択してください' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tags.map((tag: any) => (
                                    <SelectItem key={tag.id} item={tag.id.toString()}>
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

                        {/* 画像 */}
                        <SetImages images={fishingSpotImages} onSelect={handleImageSelect} />

                        {/* Selected Images */}
                        <Field label='選択された画像'>
                        <Stack direction='row' flexWrap='wrap' gap={2}>
                            {selectedImages.map((selectedImage: any) => (
                            <Box
                                key={selectedImage.id}
                                borderRadius='full'
                                colorScheme='blue'
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
                    更新
                </Button>
            </form>
            <Toaster />
        </Box>
    )
}
export default FishingSpotUpdate
