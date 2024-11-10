import React, { useState } from "react"
import styled from "styled-components"

export interface ITabToggesOption {
  name: string
  id: string
  icon?: string
  view?: "all" | "text" | "icon"
  hidden?: boolean
  onClick?: () => void
}

export type togglerPositionType = "left" | "right" | "center"

export interface IUseTabToggler {
  category: ITabToggesOption
  handleCategory: (category: ITabToggesOption) => void
  opt: ITabToggesOption[]
  setPosition?: (position: togglerPositionType) => void
  position?: togglerPositionType
  isCategory?: (cat: ITabToggesOption) => boolean
}

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

const TabToggler = ({
  tabTogglerProps,
}: {
  tabTogglerProps: IUseTabToggler
}) => {
  const { opt, category, handleCategory, position } = tabTogglerProps
  const tabPosition =
    position === "left" ? "start" : position === "right" ? "end" : position

  const filteredOpt = opt.filter((item) => !item.hidden)

  const getIsSelected = (item: ITabToggesOption) => {
    if (item.icon) return item.icon === category.icon
    if (item.name) return item.name === category.name
    return false
  }

  return (
    <div
      className={`d-flex align-items-center pt-0 justify-content-${
        tabPosition || "start"
      }`}
      style={{ width: "max-content" }}
    >
      <div
        className="d-flex align-items-center"
        style={{ width: "max-content" }}
      >
        {filteredOpt
          .filter((item) => !item.hidden)
          .map((item, index) => {
            return (
              <IconComponent
                isSelected={getIsSelected(item)}
                size={filteredOpt.length - 1}
                index={index}
                icon={item.icon || ""}
                name={item.name}
                category={category}
                key={item.id}
                handleCategory={() => {
                  handleCategory(item)
                  item?.onClick?.()
                }}
                view={item.view}
              />
            )
          })}
      </div>
    </div>
  )
}

const IconComponent = ({
  category,
  handleCategory,
  index,
  name,
  size,
  icon,
  view,
  isSelected,
}: {
  icon: string
  name: string
  category: ITabToggesOption
  handleCategory: (category: ITabToggesOption) => void
  index: number
  size: number
  view?: "all" | "text" | "icon"
  isSelected: boolean
}) => {
  const handleClick = () => {
    handleCategory(category)
  }

  return (
    <TabHeaderTextStyle
      className={`m-0 ${isSelected ? "selected" : ""} ${
        index === 0 ? "noindex" : ""
      } ${index === size ? "indexeqSize" : ""}`}
      onClick={handleClick}
    >
      {view !== "icon" && name}
      {view !== "text" && icon && (
        <span>
          <i className={`${icon} ${view === "all" ? "ml-2" : ""}`} />
        </span>
      )}
    </TabHeaderTextStyle>
  )
}

export default TabToggler

const TabHeaderTextStyle = styled.p`
  background: #fff;
  color: #5c5c5c;
  cursor: pointer;
  border-top: 1px solid #e7e7ee;
  border-bottom: 1px solid #e7e7ee;
  border-right: 1px solid #e7e7ee;
  border-left: 1px solid #e7e7ee;s
  border-left: none;
  border-top-left-radius: none;
  border-bottom-left-radius: none;
  border-top-right-radius: none;
  border-bottom-right-radius: none;
  &.selected {
    background: $primary;
    color: #fff;
    border-top: 1px solid #e7e7ee;
    border-bottom: 1px solid #e7e7ee;
    border-right: 1px solid #e7e7ee;
    border-left: 1px solid $primary;
  }
  &.noindex {
    border-top-left-radius: 0.23rem;
    border-bottom-left-radius: 0.23rem;
  }
  &.indexeqSize {
    border-top-right-radius: 0.23rem;
    border-bottom-right-radius: 0.23rem;
  }
`
