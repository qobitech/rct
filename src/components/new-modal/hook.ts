import { useRef, useState } from "react"

export interface IUseNotificationModal {
  openModal: boolean
  title: string
  handleOpenModal: (title: string) => void
  handleCloseModal: (callBack?: () => void) => void
  closeRef: React.RefObject<HTMLSpanElement>
  setModalView: React.Dispatch<React.SetStateAction<string | null>>
  isView: (view: string) => boolean
  setUrl: React.Dispatch<React.SetStateAction<string | null>>
  setDescription: React.Dispatch<React.SetStateAction<string | null>>
  description: string | null
  url: string | null
}

export const useModal = (): IUseNotificationModal => {
  const modalRef = useRef<HTMLSpanElement>(null)
  const closeRef = useRef<HTMLSpanElement>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [modalView, setModalView] = useState<string | null>(null)

  const isView = (view: string) => modalView === view

  const handleOpenModal = (title: string) => {
    setOpenModal(true)
    setTitle(title)
    if (modalRef.current != null) {
      modalRef?.current?.click()
    }
  }

  const handleCloseModal = (callBack?: () => void) => {
    setOpenModal(false)
    closeRef?.current?.click()
    setTitle(null)
    callBack?.()
  }

  return {
    openModal,
    handleOpenModal,
    handleCloseModal,
    title: title || "",
    closeRef,
    setModalView,
    isView,
    setDescription,
    setUrl,
    description,
    url,
  }
}
