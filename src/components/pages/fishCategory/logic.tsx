'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/app/hooks/useToastMessage'
import { FishCategoryTableRowType } from './constant'

const getFishCategoryRows = (initialFishCategories: FishCategoryTableRowType[]) => {
  const results: FishCategoryTableRowType[] = initialFishCategories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
    }
  })
  return results
}

const getRowsAfterDeleted = (data: FishCategoryTableRowType[]) => {
  const results: FishCategoryTableRowType[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
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

  const handleUpdateRequest = async (id: string) => {
    console.log(id)
  }

	const handleDeleteRequest = async (id: string) => {
    try {
      // await deleteRequest(id)
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
    handleUpdateRequest,
    handleDeleteRequest,
    setTableRows,
  }
}
