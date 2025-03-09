'use client'

import {
    useEffect,
    useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { FishingSpotTableRowType } from './constant'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getFishCategoryRows = (initialFishCategories: FishingSpotTableRowType[]) => {
    const results: FishingSpotTableRowType[] = initialFishCategories.map((item) => {
        return {
            id: item.id,
            name: item.name,
            area_id: item.area_id,
            description: item.description,
            created_at: formatDate(item.created_at),
            updated_at: formatDate(item.updated_at),
        }
    })
    return results
}

const getRowsAfterDeleted = (data: FishingSpotTableRowType[]) => {
    const results: FishingSpotTableRowType[] = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            area_id: item.area_id,
            description: item.description,
            created_at: formatDate(item.created_at),
            updated_at: formatDate(item.updated_at),
        }
    })
    return results
}

export const useFishingSpot = (
    initialFishCategories: FishingSpotTableRowType[]
) => {
    const [tableRows, setTableRows] = useState<FishingSpotTableRowType[]>([])
    const { successToast, errorToast } = useToastMessage()

    useEffect (() => {
        setTableRows(getFishCategoryRows(initialFishCategories))
    }, [initialFishCategories])

    const handleDeleteRequest = async (id: string) => {
        try {
            await apiClient.delete(`/admin/fishing-spots/delete/${id}`)
            const deletedTableRows = tableRows.filter((row) => row.id !== id)
            const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
            setTableRows(formattedTableRows)
            successToast(`釣り場を削除しました`)
        } catch (error) {
            console.error(error)
            errorToast('削除に失敗しました')
        }
    }

    return {
        tableRows,
        handleDeleteRequest,
        setTableRows,
    }
}
