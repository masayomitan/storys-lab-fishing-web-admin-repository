'use client'

import {
  useEffect,
  useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { AreaTableRowType } from './constant'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getFishCategoryRows = (initialFishes: AreaTableRowType[]) => {

  const results: AreaTableRowType[] = initialFishes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      prefecture: item.prefecture,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

const getRowsAfterDeleted = (data: AreaTableRowType[]) => {
  const results: AreaTableRowType[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      prefecture: item.prefecture,
      created_at: formatDate(item.created_at),
      updated_at: formatDate(item.updated_at),
    }
  })
  return results
}

export const useArea = (
	initialFishes: AreaTableRowType[]
) => {
  const router = useRouter()
	const [tableRows, setTableRows] = useState<AreaTableRowType[]>([])
	const { successToast, errorToast } = useToastMessage()

  useEffect (() => {
		setTableRows(getFishCategoryRows(initialFishes))
  }, [initialFishes])

	const handleDeleteRequest = async (id: string) => {
    try {
      await apiClient.delete(`/admin/areas/delete/${id}`)

      const deletedTableRows = tableRows.filter((row) => row.id !== id)
      const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
      setTableRows(formattedTableRows);
      successToast('削除しました')
      router.push('/areas')
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
