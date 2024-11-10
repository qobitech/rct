import { btnType } from "../button"

export interface IGetCTA {
  action: actionType
  component: actionComponent
  title?: string
  id?: string
}

export interface IRSection<T> {
  children?: any
  rsProps: IRightSection<T>
}

export interface IGlobalRightSection {
  rsProps?: IRightSection<{}>
}

export type actionType = "create" | "view" | "update" | "delete" | null
export type actionComponent =
  | "zone"
  | "state"
  | "lga"
  | "ward"
  | "polling-unit"
  | "election"
  | "election-type"
  | "management"
  | "management-action"
  | "management-roles"
  | "political-party"
  | "presiding-officer"
  | "election-result"
  | "election-result-irev"
  | "user-role"
  | "election-cycle"
  | "constituency"
  | "assign-action-roles"
  | "assign-actions-role"
  | "assign-election-officer"
  | "assign-election-officers"
  | "create-election-officers"
  | "quick-actions"
  | "view-notification"
  | "side-menu-mobile"
  | "upload-result"
  | "report-issues"
  | "preview-media-file"
  | "report-feedbacks"
  | "report-feedback-item"
  | "manage-election-officer"
  | "bulk-election-official-assignment"
  | "upload-election-result"
  | "report-feedback-item"
  | "delete-users"
  | "replace-result"
  | "user-search-filter"
  | null

export type actionId = string | null

export interface IRSAction {
  type: actionType
  component: actionComponent
  id?: actionId
}

export interface ICallSection<T> {
  action: actionType
  component: actionComponent
  title?: string | JSX.Element
  id?: string
  data?: T
  slug?: string
  cta?: IRsPropsCTA[]
  max?: boolean
}

export interface IRsPropsCTA {
  title: string
  buttonType: btnType
  action: () => void
}

export interface IRightSection<K> {
  closeSection: () => void
  openSection: boolean
  setAction: React.Dispatch<React.SetStateAction<IRSAction>>
  action: IRSAction
  setTitle: React.Dispatch<React.SetStateAction<string | JSX.Element>>
  title: string | JSX.Element
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  callSection(data: ICallSection<K>): void
  isView: (type: actionType, component: actionComponent) => boolean
  data: { onRefresh?: () => void; [key: string]: any } | null
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  updateData(data: K | null): void
  setDataRequestCounter: React.Dispatch<React.SetStateAction<number>>
  dataRequestCounter: number
  addRightSectionHistory: () => void
  removeRightSectionHistory: () => void
  isSectionHistory: boolean
  clearRightSectionHistory: () => void
  removeItemRightSectionHistory: (component: actionComponent) => void
  slug: string
  cta: IRsPropsCTA[]
  setMax: React.Dispatch<React.SetStateAction<boolean>>
  max: boolean
}

export interface IRightSectionHistory {
  action: actionType
  component: actionComponent
  title: string
  id?: string
  data?: any
}
