import React, { useState } from "react"
import { TypeButton, btnType } from "../button"
import TextPrompt from "../text-prompt"
import { PulseSVG } from "../svgs"
import styled from "styled-components"

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

interface IRSAction {
  type: actionType
  component: actionComponent
  id?: actionId
}

export interface IGetCTA {
  action: actionType
  component: actionComponent
  title?: string
  id?: string
}

export interface IRsPropsCTA {
  title: string
  buttonType: btnType
  action: () => void
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

export const useRightSection = <K extends {}>(): IRightSection<K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sectionHistories, setSectionHistories] = useState<
    IRightSectionHistory[] | null
  >(null)
  const [title, setTitle] = useState<string | JSX.Element>("")
  const [dataRequestCounter, setDataRequestCounter] = useState<number>(0)
  const [openSection, setOpenSection] = useState<boolean>(() => false)
  const [slug, setSlug] = useState<string>(() => "")
  const [cta, setCTA] = useState<IRsPropsCTA[]>([])
  const [max, setMax] = useState<boolean>(false)
  const [action, setAction] = useState<IRSAction>({
    type: null,
    component: null,
    id: null,
  })
  const [data, setData] = useState<{
    onRefresh?: () => void
    [key: string]: any
  } | null>(null)

  function updateData(data: K | null) {
    setData(data)
  }

  const isView = (type: actionType, component: actionComponent) => {
    return action.type === type && action.component === component
  }

  function callSection<T>(arg: ICallSection<T>) {
    const { action, component, title, id, data, slug, cta, max } = arg
    setAction((prev) => ({
      type: action || prev.type,
      component: component || prev.component,
      id: id || prev.id,
    }))
    setTitle((prev) => title || prev)
    setOpenSection(true)
    setData(data as unknown as K)
    setSlug((prev) => slug || prev)
    setCTA((prev) => cta || prev)
    setMax((prev) => max || prev)
  }

  const addRightSectionHistory = () => {
    if (typeof title !== "string") return
    if (!action.component) return
    setSectionHistories((prev) => {
      const sh = prev || []
      sh.push({
        action: action.type,
        component: action.component,
        title,
        id: slug || "",
        data,
      })
      return sh
    })
  }

  const removeRightSectionHistory = () => {
    setSectionHistories((prev) => {
      if (!prev) return null
      const sh = prev.pop()
      setData(sh?.data as unknown as K)
      callSection({
        action: sh?.action || "view",
        title: sh?.title || "",
        component: sh?.component || null,
        slug: sh?.id || slug || "",
        data: sh?.data,
      })
      return prev
    })
  }

  const removeItemRightSectionHistory = (component: actionComponent) => {
    setSectionHistories((prev) => {
      if (!prev) return null
      return prev.filter((i) => i.component !== component)
    })
  }

  const clearRightSectionHistory = () => {
    setSectionHistories(null)
  }

  const closeSection = () => {
    setAction({ component: null, type: null, id: null })
    setOpenSection(false)
    setSectionHistories(null)
    setSlug("")
    setCTA([])
    setMax(false)
  }

  return {
    closeSection,
    openSection,
    setAction,
    action,
    setTitle,
    title,
    callSection,
    isView,
    data,
    updateData,
    setDataRequestCounter,
    dataRequestCounter,
    addRightSectionHistory,
    removeRightSectionHistory,
    isSectionHistory: Array.isArray(sectionHistories) && !!sectionHistories[0],
    clearRightSectionHistory,
    removeItemRightSectionHistory,
    slug,
    cta,
    max,
    setMax,
  }
}

interface IRSection<T> {
  children?: any
  rsProps: IRightSection<T>
}

export interface IGlobalRightSection {
  rsProps?: IRightSection<{}>
}

const RightSection = <T extends {}>({ children, rsProps }: IRSection<T>) => {
  const matchChild: any = React.Children.map(children, (child) => {
    if (child) return { ...child, props: { ...child.props, rsProps } }
    return child
  })

  const isTitleString = typeof rsProps.title === "string"

  return (
    <>
      {rsProps.openSection ? <BDStyle onClick={rsProps.closeSection} /> : null}
      <RSStyle
        className={`${rsProps.openSection ? "menuopen" : "menuclose"} ${
          rsProps.max ? "max" : ""
        }`}
      >
        <div className="rs-header border-label-bottom">
          {isTitleString ? <h3>{rsProps.title}</h3> : rsProps.title}
          <div className="f-row-20 align-items-center ctas">
            {rsProps?.cta?.map((i, index) => (
              <TypeButton
                title={i.title}
                buttonType={i.buttonType}
                buttonSize="small"
                onClick={i.action}
                key={index}
              />
            ))}
            <TypeButton
              title=""
              close
              buttonType="danger"
              buttonSize="small"
              onClick={() => {
                rsProps.closeSection()
              }}
            />
          </div>
        </div>
        {rsProps.isSectionHistory ? (
          <div className="mt-auto py-3">
            <div
              className="f-row-7 color-label align-items-center hw-mx cursor-pointer"
              onClick={() => {
                rsProps.removeRightSectionHistory()
              }}
            >
              <i className="fas fa-angle-left" />
              <p className="m-0 text-little">Back</p>
            </div>
          </div>
        ) : null}
        {rsProps.title ? (
          <div className="rs-body">{matchChild}</div>
        ) : (
          <div>
            {rsProps.data !== null && !rsProps.data ? (
              <div className="pt-3">
                <TextPrompt prompt="Something went wrong" status={false} />
              </div>
            ) : (
              <PulseSVG />
            )}
          </div>
        )}
      </RSStyle>
    </>
  )
}

export default RightSection

const RSStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  width: 70%;

  height: 100vh;
  z-index: 30;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transition: 0.2s all ease-in;
  padding: 0 2.52rem;
  overflow: auto;
  background: #fff;
  &.max {
    width: 100%;
  }
  &.menuclose {
    transform: translateX(100%);
  }
  &.menuopen {
    transform: translateX(0);
  }
  .rs-header {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid #bababa;

    h3 {
      margin: 0;
      color: #274169;
      font-size: 0.875rem;
      font-style: normal;
      line-height: normal;
      margin-right: 1.94rem;
    }
    .ctas {
      margin-left: auto;
    }
  }
  .rs-body {
    height: 100vh;
    overflow: auto;
    padding: 1.12rem 1px 0 0;

    display: flex;
    flex-direction: column;
    // @media (max-width: variables.$md-breakpoint) {
    padding-bottom: 150px;
    // }
  }
  @media (max-width: variables.$lg-breakpoint) {
    width: -webkit-fill-available;
  }
  @media (max-width: variables.$md-breakpoint) {
    padding: 1.56rem 1.5625rem 0rem;
  }
`

const BDStyle = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 28;
  filter: blur(2px);
  backdrop-filter: blur(2px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(2px); /* For Safari */
`
