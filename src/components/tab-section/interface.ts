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
