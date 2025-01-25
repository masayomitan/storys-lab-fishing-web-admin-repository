import { z } from 'zod'

export type ImageType = {
	id: number
	image_url: string
	name: string
}

export const fishSchema = z.object({
  name: z.string().min(1, '名称は必須です'),
  scientific_name: z.string().optional(),
  description: z.string().optional(),
  length: z
    .number({ invalid_type_error: '大きさは数値で入力してください' })
    .positive('大きさは正の数で入力してください')
    .optional(),
  weight: z
    .number({ invalid_type_error: '重さは数値で入力してください' })
    .positive('重さは正の数で入力してください')
    .optional(),
  habitat: z.string().optional(),
  depth_range_min: z
    .number({ invalid_type_error: '範囲（最小値）は数値で入力してください' })
    .nonnegative('範囲（最小値）は0以上で入力してください')
    .optional(),
  depth_range_max: z
    .number({ invalid_type_error: '範囲（最大値）は数値で入力してください' })
    .nonnegative('範囲（最大値）は0以上で入力してください')
    .optional(),
  water_temperature_range_min: z
    .number({ invalid_type_error: '水温範囲（最小値）は数値で入力してください' })
    .nonnegative('水温範囲（最小値）は0以上で入力してください')
    .optional(),
  water_temperature_range_max: z
    .number({ invalid_type_error: '水温範囲（最大値）は数値で入力してください' })
    .nonnegative('水温範囲（最大値）は0以上で入力してください')
    .optional(),
  fish_category_id: z
    .number({ invalid_type_error: '魚カテゴリーを選択してください' })
    .min(1, '魚カテゴリーは必須です'),
  images: z
    .array(z.any())
    .optional(),
})
