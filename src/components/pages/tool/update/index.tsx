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
import { toolSchema } from './constant'
import { useUpdateTool } from './logic'
import SetImages from '@/components/parts/Modal/setImages'

type ToolFormData = z.infer<typeof toolSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const ToolUpdate = ({ tool, toolCategories, toolImages }: any) => {
    const [selectedImages, setSelectedImages] = useState(tool.Images || [])

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<ToolFormData>({
        resolver: zodResolver(toolSchema),
        defaultValues: {
            tool_category_id: tool.tool_category_id || 0,
            material_id: tool.material_id || 0,
            name: tool.name || '',
            description: tool.description || '',
            size: tool.size || 0.0,
            weight: tool.weight || 0.0,
            price: tool.price || 0,
            maker: tool.maker || '',
            recommend: tool.recommend ||'',
            easy_fishing: tool.easy_fishing || 0,
            images: tool.Images || []
        },
    })
    const { handleUpdateRequest } = useUpdateTool()

    // TODO 選択動作がおかしい
    const handleImageSelect = (imageIds: number[]) => {
        const selected = toolImages.filter((image: any) => imageIds.includes(image.id))
        setSelectedImages(selected)
        setValue('images', selected)
    }

    const mappedToolCategories = createListCollection({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        items: toolCategories.map((category: any) => ({
            label: category.name,
            value: category.id.toString(),
        })),
    })

    return (
        <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                道具登録フォーム
            </Text>

            <form onSubmit={handleSubmit((data) => handleUpdateRequest(tool.id, data))}>
                <Fieldset.Root>
                    <Stack>
                        <Fieldset.Legend>道具の情報</Fieldset.Legend>
                    </Stack>
                    <Fieldset.Content>
                        {/* 名称 */}
                        <Field label="名称" invalid={!!errors.name}>
                            <Input
                                type="text"
                                placeholder="道具の名称を入力してください"
                                {...register('name')}
                            />
                            {errors.name && (
                                <Text color="red.500" fontSize="sm">
                                {errors.name.message}
                                </Text>
                            )}
                        </Field>
            
                        {/* 道具カテゴリー */}
                        <Field label="道具カテゴリー" invalid={!!errors.tool_category_id}>
                            <Controller
                                control={control}
                                name="tool_category_id"
                                render={({ field }) => (
                                <SelectRoot
                                    onValueChange={(value) => field.onChange(parseInt(value.value[0]))}
                                    collection={mappedToolCategories}
                                    defaultValue={field.value ? [field.value.toString()] : []}
                                >
                                    <SelectTrigger>
                                        <SelectValueText placeholder="道具カテゴリーを選択してください" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {toolCategories.map((category: any) => (
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
                            {errors.tool_category_id && (
                                <Text color="red.500" fontSize="sm">
                                {errors.tool_category_id.message}
                                </Text>
                            )}
                        </Field>

                        {/* 素材（material_id） */}
                        <Field label="素材" invalid={!!errors.material_id}>
                            <Input
                                type="number"
                                placeholder="素材IDを入力してください"
                                {...register('material_id', { valueAsNumber: true })}
                            />
                            {errors.material_id && (
                                <Text color="red.500" fontSize="sm">
                                {errors.material_id.message}
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

                        {/* 大きさ */}
                        <Field label="大きさ (cm)">
                            <Input
                                type="number"
                                placeholder="道具の大きさを入力してください"
                                {...register('size', { valueAsNumber: true })}
                            />
                            {errors.size && (
                                <Text color="red.500" fontSize="sm">
                                {errors.size.message}
                                </Text>
                            )}
                        </Field>
            
                        {/* 重さ */}
                        <Field label="重さ (kg)">
                            <Input
                                type="number"
                                placeholder="道具の重さを入力してください"
                                {...register('weight', { valueAsNumber: true })}
                            />
                            {errors.weight && (
                                <Text color="red.500" fontSize="sm">
                                {errors.weight.message}
                                </Text>
                            )}
                        </Field>

                        {/* 価格 */}
                        <Field label="価格">
                            <Input
                                type="number"
                                placeholder="価格を入力してください"
                                {...register('price', { valueAsNumber: true })}
                            />
                            {errors.price && (
                                <Text color="red.500" fontSize="sm">
                                {errors.price.message}
                                </Text>
                            )}
                        </Field>
            
                        {/* メーカー */}
                        <Field label="メーカー">
                            <Input
                                type="text"
                                placeholder="メーカーを入力してください"
                                {...register('maker')}
                            />
                            {errors.maker && (
                                <Text color="red.500" fontSize="sm">
                                {errors.maker.message}
                                </Text>
                            )}
                        </Field>

                        {/* 推奨ポイント */}
                        <Field label="おすすめポイント">
                            <Input
                                type="text"
                                placeholder="おすすめポイントを入力してください"
                                {...register('recommend')}
                            />
                            {errors.recommend && (
                                <Text color="red.500" fontSize="sm">
                                {errors.recommend.message}
                                </Text>
                            )}
                        </Field>
            
                        {/* 釣りやすさ */}
                        <Field label="釣りやすさ">
                            <Input
                                type="number"
                                placeholder="釣りやすさを入力してください"
                                {...register('easy_fishing', { valueAsNumber: true })}
                            />
                            {errors.easy_fishing && (
                                <Text color="red.500" fontSize="sm">
                                {errors.easy_fishing.message}
                                </Text>
                            )}
                        </Field>

                        {/* 画像 */}
                        <SetImages images={toolImages} onSelect={handleImageSelect} />

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

export default ToolUpdate
