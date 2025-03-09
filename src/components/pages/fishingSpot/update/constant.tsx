import { z } from 'zod'

// フィールド構成に合わせた Zod スキーマ
export const fishingSpotSchema = z.object({
    name: z
        .string()
        .min(1, '名称は必須です')
        .max(150, '名称は150文字以内で入力してください'),
    area_id: z
        .number()
        .int()
        .nonnegative(),
    recommended_fishing_methods: z
        .number()
        .int()
        .nonnegative()
        .optional(),
    description: z
        .string()
        .max(2000, '説明は2000文字以内で入力してください')
        .optional(),

})
