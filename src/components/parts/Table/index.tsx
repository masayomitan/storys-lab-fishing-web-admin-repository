'use client'

import React from 'react'
import { Table, Button } from '@chakra-ui/react'

const TableComponent = ({ columns, data, actions }: any) => {
  return (
    <Table.Root size="sm" striped showColumnBorder> 
      <Table.Header>
        <Table.Row>
          {columns.map((column: any, index: number) => (
            <Table.ColumnHeader key={index}>{column.header}</Table.ColumnHeader>
          ))}
        </Table.Row>
				<Table.Row>
					{actions && <Table.ColumnHeader></Table.ColumnHeader>}
				</Table.Row>

      </Table.Header>
      <Table.Body>
        {data.map((item: any) => (
          <Table.Row key={item.id}>
            {columns.map((column: any, colIndex: number) => (
              <Table.Cell key={colIndex}>{item[column.accessor]}</Table.Cell>
            ))}
            {actions && (
              <Table.Cell>
                {actions.map((btn: any, btnIndex: number) => (
                  <Button
                    key={btnIndex}
                    size="sm"
                    colorScheme={btn.colorScheme || 'blue'}
                    onClick={() => btn.onClick(item)}
                    mr={2}
                  >
                    {btn.label}
                  </Button>
                ))}
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default TableComponent
