export type TableRecordType = Record<string, unknown>

export type TableColumnsType = {
  header: string
  accessor: string
  isSortable?: boolean
  isHidden?: boolean
  size?: number
}

export type TableRowType = Record<string, any>
