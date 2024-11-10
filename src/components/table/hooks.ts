import { useState } from 'react'
import {
  IPaginationParams,
  ITableAction,
  ITableActionLegacy,
  ITableRecord
} from './utils'

interface ITableArgs {
  actionEnums?: { [key: string]: string } | null
  searchAction?: (req: any) => void
  paginationParams?: IPaginationParams
  searchPlaceHolder?: string
}

export const useTableActionLegacy = (
  tableArg?: ITableArgs
): ITableActionLegacy => {
  const [action, setAction] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleSelectAll = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    record: ITableRecord[]
  ) => {
    const { checked } = target
    setSelectedItems(() => {
      if (checked) {
        return [...record.map((i) => i.id)]
      }
      setAction('')
      return []
    })
  }

  const handleSelect = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    record: ITableRecord
  ) => {
    const { checked } = target
    setSelectedItems((prev) => {
      if (checked) {
        return [record.id, ...prev]
      } else {
        return prev.filter((v) => v !== record.id)
      }
    })
  }

  return {
    action,
    setAction,
    selectedItems,
    setSelectedItems,
    actionEnums: tableArg?.actionEnums,
    handleSelect,
    handleSelectAll,
    searchValue,
    setSearchValue,
    searchAction: tableArg?.searchAction,
    paginationParams: tableArg?.paginationParams,
    searchPlaceHolder: tableArg?.searchPlaceHolder
  }
}

export const useTableAction = (
  actionEnums?: { [key: string]: string } | null
): ITableAction => {
  const [action, setAction] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  return {
    action,
    setAction,
    selectedItems,
    setSelectedItems,
    selectedItem,
    setSelectedItem,
    actionEnums
  }
}
