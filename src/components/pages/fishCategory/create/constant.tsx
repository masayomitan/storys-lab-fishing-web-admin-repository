import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zodスキーマの定義
export const fishCategorySchema = z.object({
  name: z.string().min(1, '名称は必須です').max(150, '名称は150文字以内で入力してください'),
  description: z.string().max(2000, '説明は2000文字以内で入力してください').optional(),
})
