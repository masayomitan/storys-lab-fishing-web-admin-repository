'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { DishTableRowType } from './constant'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getDishRows = (initialFishes: DishTableRowType[]) => {

  const results: DishTableRowType[] = initialFishes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      ingredients: item.ingredients,
      kind: item.kind,
      level: item.level,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

const getRowsAfterDeleted = (data: DishTableRowType[]) => {
  const results: DishTableRowType[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      ingredients: item.ingredients,
      kind: item.kind,
      level: item.level,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

export const useDish = (
	initialFishes: DishTableRowType[]
) => {
  const router = useRouter()
	const [tableRows, setTableRows] = useState<DishTableRowType[]>([])
	const { successToast, errorToast } = useToastMessage()

  useEffect (() => {
		setTableRows(getDishRows(initialFishes))
  }, [initialFishes])

	const handleDeleteRequest = async (id: string) => {
    try {
      await apiClient.delete(`/admin/dishes/delete/${id}`)

      const deletedTableRows = tableRows.filter((row) => row.id !== id)
      const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
      setTableRows(formattedTableRows);
      successToast('削除しました')
      router.push('/dishes')
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
