import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const fishSchema = z.object({
    name: z.string().min(1, '名称は必須です'),
    family_name: z.string().min(1, '科の名称は必須です'),
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
    depth_range: z
      .number({ invalid_type_error: '範囲は数値で入力してください' })
      .positive('大きさは正の数で入力してください')
      .optional(),
    water_temperature_range: z
      .number({ invalid_type_error: '範囲は数値で入力してください' })
      .positive('大きさは正の数で入力してください')
      .optional(),
  })
