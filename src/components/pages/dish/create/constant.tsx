import { z } from 'zod'

export type ImageType = {
	id: number
	image_url: string
	name: string
}

export const dishSchema = z.object({
    name: z.
        string().
        min(1, '名称は必須です'),
    description: z.
        string().
        optional(),
    ingredients: z.array(z.object({
        material: z.string().min(1, '材料名は必須です'),
        amount: z.string().min(1, '分量は必須です'),
        })).optional(),
    kind: z.
        string().
        optional(),
    level: z.
        number({ invalid_type_error: '作りやすさ' }).
        optional(),
    images: z
        .array(z.any())
        .optional(),
})
