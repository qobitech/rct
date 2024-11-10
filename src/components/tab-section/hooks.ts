import { useState } from "react"
import { ITabComponentProp, IUseTab } from "./interface"

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
    onSetTab,
  })) as ITabComponentProp[]

  return {
    tab,
    setTab,
    isTab,
    tabProps,
    getDataType,
  }
}
