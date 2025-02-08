'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/app/hooks/useToastMessage'
import { FishTableRowType } from './constant'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/apiClient'

const getFishCategoryRows = (initialFishes: FishTableRowType[]) => {

  const results: FishTableRowType[] = initialFishes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      scientific_name: item.name,
      description: item.description,
      CreatedAt: item.CreatedAt,
      UpdatedAt: item.UpdatedAt,
    }
  })
  return results
}

const getRowsAfterDeleted = (data: FishTableRowType[]) => {
  const results: FishTableRowType[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      scientific_name: item.name,
      description: item.description,
      CreatedAt: item.CreatedAt,
      UpdatedAt: item.UpdatedAt,
    }
  })
  return results
}

export const useFish = (
	initialFishes: FishTableRowType[]
) => {
  const router = useRouter()
	const [tableRows, setTableRows] = useState<FishTableRowType[]>([])
	const { successToast, errorToast } = useToastMessage()

  useEffect (() => {
		setTableRows(getFishCategoryRows(initialFishes))
  }, [initialFishes])

  const handleUpdateRequest = async (id: string) => {
    router.push(`/fishes/update/${id}`)
  }
  

	const handleDeleteRequest = async (id: string) => {
    try {
      // API リクエスト
      console.log(`/admin/fishes/delete/${id}`)
      await apiClient.delete(`/admin/fishes/delete/${id}`)

      const deletedTableRows = tableRows.filter((row) => row.id !== id)
      const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
      setTableRows(formattedTableRows);
      successToast('削除しました')
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
