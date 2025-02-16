'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { FishCategoryTableRowType } from './constant'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getFishCategoryRows = (initialFishCategories: FishCategoryTableRowType[]) => {
  const results: FishCategoryTableRowType[] = initialFishCategories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      family_name: item.family_name,
      description: item.description,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

const getRowsAfterDeleted = (data: FishCategoryTableRowType[]) => {
  const results: FishCategoryTableRowType[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      family_name: item.family_name,
      description: item.description,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

export const useFishCategory = (
	initialFishCategories: FishCategoryTableRowType[]
) => {
	const [tableRows, setTableRows] = useState<FishCategoryTableRowType[]>([])
	const { successToast, errorToast } = useToastMessage()

  useEffect (() => {
		setTableRows(getFishCategoryRows(initialFishCategories))
  }, [initialFishCategories])

	const handleDeleteRequest = async (id: string) => {
    try {
      await apiClient.delete(`/admin/fish-categories/delete/${id}`)
      const deletedTableRows = tableRows.filter((row) => row.id !== id)
      const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
      setTableRows(formattedTableRows);
      successToast(`魚カテゴリーを削除しました`)
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
