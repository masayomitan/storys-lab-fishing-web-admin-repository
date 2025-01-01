'use client'

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Box,
  Button,
  VStack,
  Text,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react"

import { Field } from "@/components/ui/field"
import { fishSchema } from './constant'
import { useCreateFish } from './logic'

type FishFormData = z.infer<typeof fishSchema>

const FishCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FishFormData>({
    resolver: zodResolver(fishSchema),
    defaultValues: {
      name: '',
      family_name: '',
      scientific_name: '' ?? null,
      description: '' ?? null,
      length: 0 ?? null,
      weight: 0 ?? null,
      habitat: '' ?? null,
      depth_range: 0 ?? null,
      water_temperature_range: 0 ?? null,
    }
  })


  const {
    handleCreateRequest,
  } = useCreateFish()

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        魚登録フォーム
      </Text>

      <form onSubmit={handleSubmit(handleCreateRequest)}>
        <Fieldset.Root>
          <Stack>
            <Fieldset.Legend>魚の情報</Fieldset.Legend>
          </Stack>
          <Fieldset.Content>
            {/* 名称 */}
            <Field label="名称" invalid={!!errors.name}>
              <Input
                type="text"
                placeholder="魚の名称を入力してください"
                {...register("name")}
              />
              {errors.name && (
                <Text color="red.500" fontSize="sm">
                  {errors.name.message}
                </Text>
              )}
            </Field>

            {/* 科の名称 */}
            <Field label="科の名称" invalid={!!errors.family_name}>
              <Input
                type="text"
                placeholder="科の名称を入力してください"
                {...register("family_name")}
                
              />
              {errors.family_name && (
                <Text color="red.500" fontSize="sm">
                  {errors.family_name.message}
                </Text>
              )}
            </Field>

            {/* 学名 */}
            <Field label="学名">
              <Input
                type="text"
                placeholder="学名を入力してください"
                {...register("scientific_name")}
              />
            </Field>

            {/* 説明 */}
            <Field label="説明">
              <Input
                type="text"
                placeholder="説明を入力してください"
                {...register("description")}
              />
            </Field>

            {/* 大きさ */}
            <Field label="大きさ (cm)">
              <Input
                type="number"
                placeholder="魚の大きさを入力してください"
                {...register("length", { valueAsNumber: true })}
              />
              {errors.length && (
                <Text color="red.500" fontSize="sm">
                  {errors.length.message}
                </Text>
              )}
            </Field>

            {/* 重さ */}
            <Field label="重さ (kg)">
              <Input
                type="number"
                placeholder="魚の重さを入力してください"
                {...register("weight", { valueAsNumber: true })}
              />
              {errors.weight && (
                <Text color="red.500" fontSize="sm">
                  {errors.weight.message}
                </Text>
              )}
            </Field>

            {/* 主な生息地 */}
            <Field label="主な生息地">
              <Input
                type="text"
                placeholder="主な生息地を入力してください"
                {...register("habitat")}
              />
            </Field>

            {/* 生息深度の範囲 */}
            <Field label="生息深度の範囲 (m)">
              <Input
                type="text"
                placeholder="例: 10-50"
                {...register("depth_range")}
              />
              {errors.depth_range && (
                <Text color="red.500" fontSize="sm">
                  {errors.depth_range.message}
                </Text>
              )}
            </Field>

            {/* 生息水温の範囲 */}
            <Field label="生息水温の範囲 (℃)">
              <Input
                type="text"
                placeholder="例: 5-20"
                {...register("water_temperature_range")}
              />
              {errors.water_temperature_range && (
                <Text color="red.500" fontSize="sm">
                  {errors.water_temperature_range.message}
                </Text>
              )}
            </Field>
          </Fieldset.Content>
        </Fieldset.Root>

        <Button type="submit" colorScheme="blue" w="full" mt={4}>
          登録
        </Button>
      </form>
    </Box>
  )
}

export default FishCreate
