'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { FishTableRowType } from './constant'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getFishCategoryRows = (initialFishes: FishTableRowType[]) => {

  const results: FishTableRowType[] = initialFishes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      scientific_name: item.scientific_name,
      description: item.description,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

const getRowsAfterDeleted = (data: FishTableRowType[]) => {
  const results: FishTableRowType[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      scientific_name: item.scientific_name,
      description: item.description,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
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
