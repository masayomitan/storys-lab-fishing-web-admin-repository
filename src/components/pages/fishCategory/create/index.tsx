'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Box,
  Button,
  Text,
  Fieldset,
  Input,
} from '@chakra-ui/react'
import { Toaster } from '@/components/ui/toaster'
import { Field } from '@/components/ui/field'
import { fishCategorySchema } from './constant'
import { useCreateFishCategory } from './logic'

type FishFormData = z.infer<typeof fishCategorySchema>

const FishCategoryCreate = () => {
  // const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FishFormData>({
    resolver: zodResolver(fishCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      english_name: '',
      family_name: '',
    },
  })

  const {
    handleCreateRequest,
  } = useCreateFishCategory()

  return (
    <Box p={6} bg='white' borderRadius='md' boxShadow='sm'>
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        魚カテゴリー 登録
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

            {/* 英語名称 */}
            <Field label='英語名称'>
              <Input
                type='text'
                {...register('english_name')}
              />
            </Field>

            {/* 説明 */}
            <Field label='科名'>
              <Input
                type='text'
                {...register('family_name')}
              />
            </Field>

            {/* 説明 */}
            <Field label='説明'>
              <Input
                type='text'
                placeholder='魚カテゴリーの説明を入力してください'
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
