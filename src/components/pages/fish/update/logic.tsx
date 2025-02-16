'use client'

import { useCallback } from 'react'
import { toaster } from '@/components/ui/toaster'
import apiClient from '@/lib/apiClient'
import { useRouter } from 'next/navigation'

export const useUpdateFish = () => {
  const router = useRouter()

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleUpdateRequest = useCallback(async (id: string, requestData: any) => {
    console.log(id)
    console.log(requestData)

    try {
      console.log('try')
      const response = await apiClient.put(`/admin/fishes/update/${id}`, requestData)
      console.log(response)

      toaster.create({
        title: '更新が成功しました',
        type: 'success',
      })
      console.log('API Response:', response)
      router.push('/fishes')
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error instanceof Error) {
        toaster.create({
          title: '更新に失敗しました',
          type: 'error',
          description: error.message,
        })
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }, [router])

  return { handleUpdateRequest }
}
