import { z } from 'zod'

export type ImageType = {
	id: number
	image_url: string
	name: string
}

export const areaSchema = z.object({
  name: z.
      string().
      min(1, '名称は必須です'),
  description: z.
      string().
      optional(),
  prefecture_id: z
      .number({ invalid_type_error: '都道府県を選択してください' })
      .min(1, '都道府県は必須です'),
  images: z
      .array(z.any())
      .optional(),
})
