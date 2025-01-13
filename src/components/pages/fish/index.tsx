'use client'

import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import Layout from '../../../../../storys-lab-fishing-web-repository/src/components/parts/Layout/layout'
import FishCategoryCreate from '@/components/pages/fishCategory/create'

import { useFish } from './logic'
import TableComponent from '@/components/parts/Table'
import { TableColumnsType } from '@/components/parts/Table/type'

const Fishes = ({
	fishes,
}: any) => {
	const router = useRouter()

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
		{ header: '作成日時', accessor: 'created_at' },
		{ header: '更新日時', accessor: 'updated_at' },
		{ header: '', accessor: '' },
	]
	const actions = [
		{
			label: '更新',
			colorScheme: 'green',
			onClick: (item: any) => handleUpdateRequest(item.id),
		},
		{
			label: '削除',
			colorScheme: 'red',
			onClick: (item: any) => handleDeleteRequest(item.id),
		},
	]

	const handleCreate = () => {
    router.push('/fishes/create')
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
    </Box>
  )
}

export default Fishes
