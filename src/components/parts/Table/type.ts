export type TableRecordType = Record<string, unknown>

export type TableColumnsType = {
  header: string
  accessor: string
  isSortable?: boolean
  isHidden?: boolean
  size?: number
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TableRowType = Record<string, any>
