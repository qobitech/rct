export type togglerPositionType = "left" | "right" | "center"

export interface ITabToggesOption {
  name: string
  id: string
  icon?: string
  view?: "all" | "text" | "icon"
  hidden?: boolean
  onClick?: () => void
}

export interface IUseTabToggler {
  category: ITabToggesOption
  handleCategory: (category: ITabToggesOption) => void
  opt: ITabToggesOption[]
  setPosition?: (position: togglerPositionType) => void
  position?: togglerPositionType
  isCategory?: (cat: ITabToggesOption) => boolean
}
