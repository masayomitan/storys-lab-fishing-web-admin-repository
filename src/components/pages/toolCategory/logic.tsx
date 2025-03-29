'use client'

import {
	useEffect,
	useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { ToolCategoryTableRowType } from './constant'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getToolCategoryRows = (initialToolCategories: ToolCategoryTableRowType[]) => {
	const results: ToolCategoryTableRowType[] = initialToolCategories.map((item) => {
		return {
			id: item.id,
			name: item.name,
			description: item.description,
			created_at: formatDate(item.created_at),
			updated_at: formatDate(item.updated_at),
		}
	})
	return results
}

const getRowsAfterDeleted = (data: ToolCategoryTableRowType[]) => {
	const results: ToolCategoryTableRowType[] = data.map((item) => {
		return {
			id: item.id,
			name: item.name,
			description: item.description,
			created_at: formatDate(item.created_at),
			updated_at: formatDate(item.updated_at),
		}
	})
	return results
}

export const useToolCategory = (
	initialToolCategories: ToolCategoryTableRowType[]
) => {
	const [tableRows, setTableRows] = useState<ToolCategoryTableRowType[]>([])
	const { successToast, errorToast } = useToastMessage()

	useEffect (() => {
		setTableRows(getToolCategoryRows(initialToolCategories))
	}, [initialToolCategories])

	const handleDeleteRequest = async (id: string) => {
		try {
			await apiClient.delete(`/admin/tool-categories/delete/${id}`)
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
