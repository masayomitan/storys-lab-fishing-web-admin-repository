'use client'

import {
    useEffect,
    useState,
} from 'react'
import { useToastMessage } from '@/components/hooks/useToastMessage'
import { ToolTableRowType } from './constant'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/apiClient'
import { formatDate } from '@/utils/dateFormatter'

const getToolCategoryRows = (initialTools: ToolTableRowType[]) => {

    const results: ToolTableRowType[] = initialTools.map((item) => {
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

const getRowsAfterDeleted = (data: ToolTableRowType[]) => {
    const results: ToolTableRowType[] = data.map((item) => {
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

export const useTool = (
    initialTools: ToolTableRowType[]
) => {
    const router = useRouter()
    const [tableRows, setTableRows] = useState<ToolTableRowType[]>([])
    const { successToast, errorToast } = useToastMessage()

    useEffect (() => {
        setTableRows(getToolCategoryRows(initialTools))
    }, [initialTools])

    const handleDeleteRequest = async (id: string) => {
        try {
            await apiClient.delete(`/admin/tools/delete/${id}`)

            const deletedTableRows = tableRows.filter((row) => row.id !== id)
            const formattedTableRows = getRowsAfterDeleted(deletedTableRows)
            setTableRows(formattedTableRows);
            successToast('削除しました')
            router.push('/tools')
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
