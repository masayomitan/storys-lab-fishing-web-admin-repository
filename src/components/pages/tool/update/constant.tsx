import { z } from 'zod'

export type ImageType = {
	id: number
	image_url: string
	name: string
}

export const toolSchema = z.object({
    tool_category_id: z
        .number({ invalid_type_error: '魚カテゴリーを選択してください' })
        .min(1, '魚カテゴリーは必須です'),
    material_id: z
        .number({ invalid_type_error: '魚カテゴリーを選択してください' })
        .min(1, '魚カテゴリーは必須です'),
    company_id: z.number().optional(),
    name: z.string().min(1, '名称は必須です'),
    description: z.string().optional(),
    size: z
        .number({ invalid_type_error: 'サイズは数値で入力してください' })
        .positive('サイズは正の数で入力してください')
        .optional(),
    weight: z
        .number({ invalid_type_error: '重さは数値で入力してください' })
        .positive('重さは正の数で入力してください')
        .optional(),
    price: z
        .number({ invalid_type_error: '範囲（最小値）は数値で入力してください' })
        .nonnegative('範囲（最小値）は0以上で入力してください')
        .optional(),
    maker: z.string().optional(),
    recommend: z.string().optional(),
    easy_fishing: z
        .number({ invalid_type_error: '数値で入力してください' })
        .nonnegative('0以上で入力してください')
        .optional(),
    images: z
        .array(z.any())
        .optional(),
})
