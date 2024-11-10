import { useState } from 'react'
import { ITableAction } from '../table/utils'

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
