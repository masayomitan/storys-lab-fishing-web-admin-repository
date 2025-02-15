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
import { fishCategorySchema } from './constant'
import { useUpdateFishCategory } from './logic'

type FishFormData = z.infer<typeof fishCategorySchema>

const FishCategoryUpdate = ({ fishCategory }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FishFormData>({
    resolver: zodResolver(fishCategorySchema),
    defaultValues: {
      name: fishCategory?.name || '',
      description: fishCategory?.description || '',
      english_name: fishCategory?.english_name || '',
      family_name: fishCategory?.family_name || '',
    },
  })

  const { handleUpdateRequest } = useUpdateFishCategory()

  return (
    <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        魚カテゴリー 更新
      </Text>

      <form onSubmit={handleSubmit((data) => handleUpdateRequest(fishCategory.id, data))}>
        <Fieldset.Root>
          <Fieldset.Content>
            <Field label='名称' invalid={!!errors.name}>
              <Input type='text' {...register('name')} />
              {errors.name && (
                <Text color='red.500' fontSize='sm'>{errors.name.message}</Text>
              )}
            </Field>

            <Field label='英語名称'>
              <Input type='text' {...register('english_name')} />
            </Field>

            <Field label='科名'>
              <Input type='text' {...register('family_name')} />
            </Field>

            <Field label='説明'>
              <Textarea placeholder='魚カテゴリーの説明を入力してください' {...register('description')} />
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

export default FishCategoryUpdate
