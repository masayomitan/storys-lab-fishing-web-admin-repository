'use client'

import { useCallback } from 'react'
import { toaster } from '@/components/ui/toaster'
import apiClient from '@/app/lib/apiClient'
import { useRouter } from 'next/navigation'

export const useCreateFish = () => {
  const router = useRouter()

  const handleCreateRequest = useCallback(async (requestData: any) => {
    console.log(requestData)
    try {
      // API リクエスト
      const response = await apiClient.post('/admin/fishes/create', requestData)

      // 成功処理
      toaster.create({
        title: '登録が成功しました',
        type: 'success',
      })
      console.log('API Response:', response)
      router.push('/fishes')
    } catch (error: any) {
      // エラー処理
      if (error instanceof Error) {
        toaster.create({
          title: '登録に失敗しました',
          type: 'error',
          description: error.message,
        })
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }, [])

  return {
    handleCreateRequest,
  }
}
