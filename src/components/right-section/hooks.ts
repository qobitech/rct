import { useState } from "react"
import {
  actionComponent,
  actionType,
  ICallSection,
  IRightSection,
  IRightSectionHistory,
  IRSAction,
  IRsPropsCTA,
} from "./interface"

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
