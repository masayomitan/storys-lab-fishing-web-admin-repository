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
import { fishSchema } from './constant'
import { useUpdateFish } from './logic'
import SetImages from '@/components/parts/Modal/setImages'

type FishFormData = z.infer<typeof fishSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const FishUpdate = ({ fish, fishCategories, fishImages }: any) => {
    const [selectedImages, setSelectedImages] = useState(fish.Images || [])

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FishFormData>({
        resolver: zodResolver(fishSchema),
            defaultValues: {
            name: fish.name || '',
            scientific_name: fish.scientific_name || '',
            description: fish.description || '',
            fish_category_id: fish.fish_category_id || 0,
            length: fish.length || 0.0,
            weight: fish.weight || 0.0,
            habitat: fish.habitat || '',
            depth_range_min: fish.depth_range_min || 0,
            depth_range_max: fish.depth_range_max || 0,
            water_temperature_range_min: fish.water_temperature_range_min || 0,
            water_temperature_range_max: fish.water_temperature_range_max || 0,
            images: fish.Images || [],
        },
    })

    const { handleUpdateRequest } = useUpdateFish()

    // TODO 選択動作がおかしい
    const handleImageSelect = (imageIds: number[]) => {
        const selected = fishImages.filter((image: any) => imageIds.includes(image.id))
        setSelectedImages(selected)
        setValue('images', selected)
    }

    const mappedFishCategories = createListCollection({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        items: fishCategories.map((category: any) => ({
            label: category.name,
            value: category.id.toString(),
        })),
    })

    return (
        <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
            <Text fontSize='xl' fontWeight='bold' mb={4}>
                魚更新フォーム
            </Text>

        <form onSubmit={handleSubmit((data) => handleUpdateRequest(fish.id, data))}>
            <Fieldset.Root>
                <Stack>
                    <Fieldset.Legend>魚の情報</Fieldset.Legend>
                </Stack>
                <Fieldset.Content>
                    {/* 名称 */}
                    <Field label='名称' invalid={!!errors.name}>
                        <Input
                            type='text'
                            placeholder='魚の名称を入力してください'
                            {...register('name')}
                        />
                        {errors.name && (
                            <Text color='red.500' fontSize='sm'>
                                {errors.name.message}
                            </Text>
                        )}
                    </Field>

                {/* 科のカテゴリー */}
                <Field label='魚カテゴリー' invalid={!!errors.fish_category_id}>
                    <Controller
                        control={control}
                        name='fish_category_id'
                        render={({ field }) => (
                        <SelectRoot
                            onValueChange={(value) => field.onChange(parseInt(value.value[0]))}
                            collection={mappedFishCategories}
                        >
                            <SelectTrigger>
                                <SelectValueText placeholder='魚カテゴリーを選択してください' />
                            </SelectTrigger>
                            <SelectContent>
                            {fishCategories.map((category: any) => (
                                <SelectItem
                                    key={category.id}
                                    item={category.id.toString()}
                                >
                                {category.name} / {category.family_name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </SelectRoot>
                        )}
                    />
                    {errors.fish_category_id && (
                        <Text color='red.500' fontSize='sm'>
                            {errors.fish_category_id.message}
                        </Text>
                    )}
                    </Field>

                    {/* 学名 */}
                    <Field label='学名'>
                    <Input
                        type='text'
                        placeholder='学名を入力してください'
                        {...register('scientific_name')}
                    />
                    </Field>

                    {/* 説明 */}
                    <Field label='説明'>
                    <Textarea
                        placeholder='説明を入力してください'
                        {...register('description')}
                    />
                    </Field>

                {/* 大きさ */}
                <Field label='大きさ (cm)'>
                    <Input
                        type='number'
                        placeholder='魚の大きさを入力してください'
                        {...register('length', { valueAsNumber: true })}
                    />
                    {errors.length && (
                        <Text color='red.500' fontSize='sm'>
                            {errors.length.message}
                        </Text>
                    )}
                </Field>

                    {/* 重さ */}
                    <Field label='重さ (kg)'>
                        <Input
                            type='number'
                            placeholder='魚の重さを入力してください'
                            {...register('weight', { valueAsNumber: true })}
                        />
                        {errors.weight && (
                            <Text color='red.500' fontSize='sm'>
                            {errors.weight.message}
                            </Text>
                        )}
                    </Field>

                    {/* 主な生息地 */}
                    <Field label='主な生息地'>
                        <Input
                            type='text'
                            placeholder='主な生息地を入力してください'
                            {...register('habitat')}
                        />
                    </Field>

                {/* 生息深度の範囲 */}
                    <Field label='生息深度の範囲 (m)'>
                        <Stack direction='row' align='center'>
                            <Box>
                            <Text fontSize='sm' color='gray.600'>最小値</Text>
                            <Text fontSize='xs' color='gray.500' mb={1}>入力例: 50</Text>
                            <Input
                                type='number'
                                placeholder='50'
                                {...register('depth_range_min', { valueAsNumber: true })}
                            />
                            {errors.depth_range_min && (
                                <Text color='red.500' fontSize='xs' mt={1}>
                                {errors.depth_range_min.message}
                                </Text>
                            )}
                            </Box>
                            <Box>
                            <Text fontSize='sm' color='gray.600'>最大値</Text>
                            <Text fontSize='xs' color='gray.500' mb={1}>入力例: 100</Text>
                            <Input
                                type='number'
                                placeholder='100'
                                {...register('depth_range_max', { valueAsNumber: true })}
                            />
                            {errors.depth_range_max && (
                                <Text color='red.500' fontSize='xs' mt={1}>
                                {errors.depth_range_max.message}
                                </Text>
                            )}
                            </Box>
                        </Stack>
                    </Field>

                {/* 生息水温の範囲 */}
                <Field label='生息水温の範囲 (℃)'>
                    <Stack direction='row' align='center'>
                        <Box>
                            <Text fontSize='sm' color='gray.600'>最小値</Text>
                            <Text fontSize='xs' color='gray.500' mb={1}>入力例: 10</Text>
                            <Input
                                type='number'
                                placeholder='10'
                                {...register('water_temperature_range_min', { valueAsNumber: true })}
                            />
                        </Box>
                        <Box>
                            <Text fontSize='sm' color='gray.600'>最大値</Text>
                            <Text fontSize='xs' color='gray.500' mb={1}>入力例: 20</Text>
                            <Input
                                type='number'
                                placeholder='20'
                                {...register('water_temperature_range_max', { valueAsNumber: true })}
                        />
                        </Box>
                    </Stack>

                {errors.water_temperature_range_min && (
                    <Text color='red.500' fontSize='sm'>
                        {errors.water_temperature_range_min.message}
                    </Text>
                )}
                {errors.water_temperature_range_max && (
                    <Text color='red.500' fontSize='sm'>
                        {errors.water_temperature_range_max.message}
                    </Text>
                )}
                </Field>

                {/* 画像 */}
                <SetImages images={fishImages} onSelect={handleImageSelect} />

                {/* Selected Images */}
                <Field label='選択された画像'>
                    <Stack direction='row' flexWrap='wrap' gap={2}>
                        {selectedImages.map((selectedImage: any, index: number) => (
                        <Box
                            key={index}
                            borderRadius='full'
                            colorScheme='blue'
                        >
                            <Image
                                src={selectedImage.image_url}
                                alt={selectedImage.name}
                                width={100}
                                height={100}
                                style={{  
                                    objectFit: 'cover', 
                                    width: 'auto', 
                                    height: 'auto' 
                                }}
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
    </Box>
    )
}

export default FishUpdate
