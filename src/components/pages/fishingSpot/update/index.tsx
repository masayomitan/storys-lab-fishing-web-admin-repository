'use client'

import React from 'react'
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

type FishingSpotFormData = z.infer<typeof fishingSpotSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
const FishingSpotCreate = ({ fishingSpot, areas, fishingSpotImages }: any) => {
    console.log(fishingSpotImages)
    // const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FishingSpotFormData>({
        resolver: zodResolver(fishingSpotSchema),
        defaultValues: {
            name: fishingSpot.name || '',
            area_id: fishingSpot.area_id || 0,
            description: fishingSpot.description || '',
            recommended_fishing_methods: fishingSpot.recommended_fishing_methods || 0,
        },
    })

    const {
        handleUpdateRequest,
    } = useUpdateFishingSpot()

    const mappedAreas = createListCollection({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        items: areas.map((prefecture: any) => ({
            label: prefecture.name,
            value: prefecture.id.toString(),
        })),
    })
    
    return (
        <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
            <Text fontSize='xl' fontWeight='bold' mb={4}>
                釣り場 登録
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
