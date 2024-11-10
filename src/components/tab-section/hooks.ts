import { useState } from 'react'

export interface ITabComponentProp {
  isSelected: boolean
  setTab: React.Dispatch<React.SetStateAction<string>>
  title: string
  onSetTab?: () => void
}

export interface IUseTab {
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  isTab: (value: string) => boolean
  tabProps: ITabComponentProp[]
  getDataType: (typeQuery: string | undefined) => string
}

export const useTabSection = (
  defaultTab: string,
  tabs: { [key: string]: string },
  typeQuery?: string | undefined,
  onSetTab?: (tab: string) => void
): IUseTab => {
  const tabsArray = Object.values(tabs)

  const filterDataType = (tabQuery: string | undefined) => {
    return (i: string) => i.toLowerCase() === tabQuery?.toLowerCase()
  }

  const getDataType = (typeQuery: string | undefined) => {
    if (!typeQuery) return defaultTab
    return tabsArray.filter(filterDataType(typeQuery))?.[0] || defaultTab
  }

  const [tab, setTab] = useState<string>(() => getDataType(typeQuery))

  type typeTabs = (typeof tabs)[keyof typeof tabs]

  const isTab = (value: typeTabs) => tab?.toLowerCase() === value?.toLowerCase()

  const tabProps: ITabComponentProp[] = tabsArray.map((i) => ({
    isSelected: isTab(i),
    title: i,
    setTab,
    onSetTab
  })) as ITabComponentProp[]

  return {
    tab,
    setTab,
    isTab,
    tabProps,
    getDataType
  }
}
