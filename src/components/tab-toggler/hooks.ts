import { useState } from "react"
import {
  ITabToggesOption,
  IUseTabToggler,
  togglerPositionType,
} from "./interface"

export const useTabToggler = (
  opt: ITabToggesOption[],
  defaultCategory: ITabToggesOption,
  defaultPosition?: togglerPositionType
): IUseTabToggler => {
  const [category, setCategory] = useState<ITabToggesOption>(defaultCategory)
  const [position, setPosition] = useState<togglerPositionType>(
    defaultPosition || "left"
  )

  const handleCategory = (category: ITabToggesOption) => {
    setCategory(category)
  }

  const isCategory = (cat: ITabToggesOption) => {
    if (cat.name) return cat.name === category.name
    if (cat.icon) return cat.icon === category.icon
    return false
  }

  return { category, handleCategory, opt, setPosition, position, isCategory }
}
