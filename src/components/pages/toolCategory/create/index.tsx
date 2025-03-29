'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
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
import { Toaster } from '@/components/ui/toaster'
import { Field } from '@/components/ui/field'
import { toolCategorySchema } from './constant'
import { useCreateToolCategory } from './logic'

type ToolFormData = z.infer<typeof toolCategorySchema>

const FishCategoryCreate = () => {
    // const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ToolFormData>({
        resolver: zodResolver(toolCategorySchema),
            defaultValues: {
            name: '',
            description: '',
        },
    })

    const {
        handleCreateRequest,
    } = useCreateToolCategory()

    return (
        <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
            <Text fontSize='xl' fontWeight='bold' mb={4}>
                道具カテゴリー 登録
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

                        {/* 説明 */}
                        <Field label='説明'>
                            <Textarea
                                placeholder='道具カテゴリーの説明を入力してください'
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

export default FishCategoryCreate
