'use client'

import { useCallback } from 'react'
import { toaster } from '@/components/ui/toaster'
import apiClient from '@/lib/apiClient'
import { useRouter } from 'next/navigation'

export const useUpdateFish = () => {
    const router = useRouter()

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleUpdateRequest = useCallback(async (id: string, requestData: any) => {

        try {
            const response = await apiClient.put(`/admin/fishes/update/${id}`, requestData)

            toaster.create({
                title: '更新が成功しました',
                type: 'success',
            })
            console.log('API Response:', response)
            router.push('/fishes')
            /* eslint-disable @typescript-eslint/no-explicit-any */
        } catch (error: any) {
            toaster.create({
                title: '更新に失敗しました',
                type: 'error',
                description: error.message,
            })
        }
    }, [router])

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleRelationUpdateRequest = useCallback(async (id: string, requestData: any) => {

        try {
            const response = await apiClient.put(`/admin/fishes/${id}/dishes`, requestData)

            toaster.create({
                title: '更新が成功しました',
                type: 'success',
            })
            console.log('API Response:', response)
            router.push('/fishes/' + id)
            /* eslint-disable @typescript-eslint/no-explicit-any */
        } catch (error: any) {
            toaster.create({
                title: '更新に失敗しました',
                type: 'error',
                description: error.message,
            })
        }
    }, [router])

    const handleLinkDishes = useCallback(async (id: string, selectedDishIds: any) => {
        try {
            const response = await apiClient.post(`/api/fishes/${id}/link-dishes`, selectedDishIds)
            // 成功処理
            toaster.create({
                title: '登録が成功しました',
                type: 'success',
            })
            console.log('API Response:', response)
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
        handleUpdateRequest,
        handleRelationUpdateRequest,
        handleLinkDishes
    }
}
