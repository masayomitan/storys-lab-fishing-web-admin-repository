'use client'

import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/app/hooks/useToastMessage'
import { FishTableRowType } from './constant'

const getFishCategoryRows = (initialFishes: FishTableRowType[]) => {
  const results: FishTableRowType[] = initialFishes.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
    }
  })
  return results
}

const getRowsAfterDeleted = (data: FishTableRowType[]) => {
  const results: FishTableRowType[] = data.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
    }
  })
  return results
}

export const useFish = (
	initialFishes: FishTableRowType[]
) => {
	const [tableRows, setTableRows] = useState<FishTableRowType[]>([])
	const { successToast, errorToast } = useToastMessage()

  useEffect (() => {
		setTableRows(getFishCategoryRows(initialFishes))
  }, [initialFishes])

  const handleUpdateRequest = async (id: string) => {
    console.log('go to update page')
  }

	const handleDeleteRequest = async (id: string) => {
    try {
      // await deleteRequest(id)
      const deletedTableRows = tableRows.filter((row) => row.id !== id)
      const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
      setTableRows(formattedTableRows);
      successToast(`魚カテゴリーを削除しました`)
    } catch (error) {
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
