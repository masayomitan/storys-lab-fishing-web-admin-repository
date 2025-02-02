'use client'

import {
  useState,
} from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'

// import FishCategoryCreate from '@/components/pages/fishCategory/create'

import { useFish } from './logic'
import { TableColumnsType } from '@/components/parts/Table/type'
import TableComponent from '@/components/parts/Table'

import ConfirmDeleteDialog from '@/components/parts/Modal/confirmDeleteDialog'

const Fishes = ({
	fishes,
  /* eslint-disable @typescript-eslint/no-explicit-any */
}: any) => {
	const router = useRouter()
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null)

	const {
		tableRows,
		handleUpdateRequest,
		handleDeleteRequest
	} = useFish(
		fishes
	)
	console.log('fishes')
	console.log(tableRows)
	const columns: TableColumnsType[] = [
		{ header: 'ID', accessor: 'id' },
		{ header: '名称', accessor: 'name' },
		{ header: 'scientific_name', accessor: '学名' },
		{ header: '作成日時', accessor: 'created_at' },
		{ header: '更新日時', accessor: 'updated_at' },
		{ header: '', accessor: '' },
	]
	const actions = [
		{
			label: '更新',
			colorScheme: 'green',
			/* eslint-disable @typescript-eslint/no-explicit-any */
			onClick: (item: any) => handleUpdateRequest(item.id),
		},
		{
			label: '削除',
			colorScheme: 'red',
			/* eslint-disable @typescript-eslint/no-explicit-any */
			onClick: (item: any) => setDeleteDialog(item.id),
		},
	]

	const handleCreate = () => {
    router.push('/fishes/create')
  }

	const handleConfirmDelete = () => {
    if (deleteDialog) {
      handleDeleteRequest(deleteDialog)
      setDeleteDialog(null)
    }
  }

  return (
    <Box>
			<Box>
				<Button colorScheme='blue' onClick={handleCreate}>
          新規作成
        </Button>
			</Box>
      <Box p={4} bg='white' borderRadius='md' boxShadow='sm'>
        <TableComponent columns={columns} data={tableRows} actions={actions} />
      </Box>
			<Toaster />
			<ConfirmDeleteDialog
        isOpen={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default Fishes
