import React, {
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"

import {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  useForm,
  UseFormReturn,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"

type dragType = React.DragEvent<HTMLInputElement>

export const useUploadFileHook = <T extends HTMLElement, S extends FieldValues>(
  setError: UseFormSetError<S>,
  setValue: UseFormSetValue<S>,
  fileName: Path<S>,
  fileType: string,
  fileSize: number
): [
  onDragEnter: (e: dragType) => void,
  onDragLeave: (e: dragType) => void,
  onDrop: (e: dragType) => void,
  onFileChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
  imgRef: React.RefObject<T>,
  isFileAdd: boolean,
  addedFileName: string
] => {
  const imgRef = useRef<T>(null)

  const [isFileAdd, setIsFileAdd] = useState<boolean>(false)
  const [addedFileName, setAddedFileName] = useState<string>("")

  const onDragEnter = (e: dragType) => {
    e.preventDefault()
    e.stopPropagation()
    if (imgRef.current) {
      imgRef.current.style.backgroundColor = "#929292"
      setIsFileAdd(true)
    }
  }

  const onDragLeave = (e: dragType) => {
    e.preventDefault()
    e.stopPropagation()
    if (imgRef.current) {
      imgRef.current.style.backgroundColor = "#fff"
      setIsFileAdd(false)
    }
  }

  const onDrop = (e: dragType) => {
    const errorMessage = verifyInputFile(e?.dataTransfer?.files[0])
    setError(fileName, { message: errorMessage })
    if (!errorMessage)
      setValue(fileName, e?.dataTransfer?.files[0] as PathValue<S, Path<S>>)
    if (imgRef.current) {
      imgRef.current.style.backgroundColor = "#fff"
      setIsFileAdd(false)
    }
  }

  const onFileChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target
    if (files) {
      const errorMessage = verifyInputFile(files[0])
      setError(fileName, { message: errorMessage })
      if (!errorMessage) setValue(fileName, files[0] as PathValue<S, Path<S>>)
    }
  }

  const verifyInputFile = (file: File) => {
    const { type, size, name } = file
    if (!type.includes(fileType)) {
      return `Must be ${fileType}`
    }

    if (size > fileSize) {
      return "File size not allowed"
    }
    setAddedFileName(name)
  }

  return [
    onDragEnter,
    onDragLeave,
    onDrop,
    onFileChange,
    imgRef,
    isFileAdd,
    addedFileName,
  ]
}

export const useFormHook = <T extends {}>(
  objSchema: {},
  defaultValues?: DefaultValues<T> | undefined
): [UseFormReturn<T, any>] => {
  const schema = yup.object().shape(objSchema)
  const formMethods = useForm<T>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  })

  return [formMethods]
}

export const useToggler = (defaultCategory: string) => {
  const [category, setCategory] = useState<string>(defaultCategory)

  const handleCategory = (category: string) => {
    setCategory(category)
  }

  return { category, handleCategory }
}

export interface IModalProps {
  openModal: boolean
  title: string
  url: string
  description: string
  closeFunction: () => void
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setUrl: React.Dispatch<React.SetStateAction<string>>
  medium: boolean
  size?: "medium" | "wide" | undefined
}

export const useShare = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  const modalProps: IModalProps = {
    openModal: modal,
    title,
    url,
    description,
    setDescription,
    setTitle,
    setUrl,
    closeFunction: () => {
      setModal(false)
    },
    setOpenModal: setModal,
    medium: true,
    size: "medium",
  }
  return { modalProps }
}

export interface ICopyProps {
  copySuccess: boolean
  copy: (text: string) => void
  setAction: React.Dispatch<React.SetStateAction<string>>
  action: string
}

export const useCopy = (): ICopyProps => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [action, setAction] = useState<string>("")

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(() => false)
        setAction("")
      }, 1500)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [copySuccess])

  function copyToClipboard(text: string) {
    // Create a new ClipboardItem object with the text
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([text], { type: "text/plain" }),
    })

    // Use the Clipboard API to write the ClipboardItem to the clipboard
    navigator.clipboard.write([clipboardItem]).then(
      () => {
        setCopySuccess(true)
      },
      () => {
        setCopySuccess(false)
      }
    )
  }

  return {
    copySuccess,
    copy: copyToClipboard,
    setAction,
    action,
  }
}

export const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (!ref?.current) return
    const isBackgroundImg = ref.current.style.backgroundImage.length !== 0
    const updateStatus = (images: HTMLImageElement[]) => {
      setStatus(
        images.map((image) => image.complete).every((item) => item) &&
          isBackgroundImg
      )
    }

    const imagesLoaded = Array.from(ref.current.querySelectorAll("img"))

    if (imagesLoaded.length === 0 && !isBackgroundImg) {
      setStatus(true)
      return
    }

    imagesLoaded.forEach((image) => {
      image.addEventListener("load", () => updateStatus(imagesLoaded), {
        once: true,
      })
      image.addEventListener("error", () => updateStatus(imagesLoaded), {
        once: true,
      })
    })
  }, [ref])

  return status
}

export const reducer = <T extends {}, A extends keyof T>(
  state: T,
  action: { type: A; payload: any }
) => {
  if (action.type in state) {
    if (state[action.type] === action.payload) return state
    return { ...state, [action.type]: action.payload }
  }
  return state
}

export const useStateHook = <
  T extends { [key: string]: any },
  A extends keyof T
>(
  initState: T
): [T, (type: A, payload: any) => void] => {
  const [state, dispatch] = useReducer(reducer<T, A>, initState)

  const updateState = (type: A, payload: any) => {
    dispatch({ type, payload })
  }

  return [state, updateState]
}

export const useInfiniteScroll = (
  load: boolean,
  hasmore: boolean,
  getData?: () => void
): [elementRef: (node: any) => void] => {
  const observer = useRef<IntersectionObserver | null>(null)
  const elementRef = useCallback(
    (node: any) => {
      if (load) return
      if (observer?.current) observer?.current?.disconnect?.()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasmore) {
          getData?.()
        }
      })
      if (node) observer?.current?.observe(node)
    },
    [load, getData, hasmore]
  )

  useEffect(() => {
    return () => {
      observer?.current?.disconnect()
    }
  }, [])

  return [elementRef]
}

export interface ICardItem {
  title: string
  value: string | number
  url?: boolean
  onUrlClick?: () => void
  copy?: boolean
}

export interface IDropDownItem {
  title: string
  action: () => void
  icon?: string
  disabled?: boolean
  hidden?: boolean
}

export const useCallAPI = (getData: () => void, data: boolean) => {
  useEffect(() => {
    if (data) getData()
  }, [])
}

export interface IRefreshProps {
  load?: boolean
  onRefresh?: () => void
  text?: string
}

export interface IImgSize {
  width: number
  height: number
}

// Function to get image dimensions
const getImageSize = async (url: string): Promise<IImgSize> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = url
  })
}

// Function to get image file size
const getFileSize = async (url: string): Promise<number | null> => {
  try {
    const response = await axios.head(url)
    const contentLength = response.headers["content-length"]
    return contentLength ? parseInt(contentLength, 10) : null
  } catch (error) {
    console.error("Error getting file size:", error)
    return null
  }
}

export const useImageSize = (
  imageUrl: string
): IImgSize & { size: number | null } => {
  const [imageProps, setImageProps] = useState<
    IImgSize & { size: number | null }
  >({ width: 0, height: 0, size: 0 })

  useEffect(() => {
    getImageSize(imageUrl)
      .then((size) => {
        setImageProps((prev) => ({
          ...prev,
          width: size.width,
          height: size.height,
        }))
      })
      .catch((error) => {
        console.error("Error loading image:", error)
      })

    getFileSize(imageUrl)
      .then((size) => {
        setImageProps((prev) => ({
          ...prev,
          size,
        }))
      })
      .catch((error) => {
        console.error("Error getting file size:", error)
      })
  }, [imageUrl])

  return imageProps
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

// interface IIImgSize {
//   width: number
//   height: number
// }

// interface IFileDetails extends IIImgSize {
//   size: number | null
//   name: string
//   type: string
//   lastModified: Date | null
// }

// // Function to get image dimensions
// const getIImageSize = async (url: string): Promise<IImgSize> => {
//   return await new Promise((resolve, reject) => {
//     const img = new Image()
//     img.onload = () => {
//       resolve({ width: img.width, height: img.height })
//     }
//     img.onerror = reject
//     img.src = url
//   })
// }

// // Function to get file details
// // Function to get file details
// const getFileDetails = async (
//   url: string
// ): Promise<Omit<IFileDetails, "width" | "height">> => {
//   try {
//     const response = await axios.head(url)
//     const contentLength = response.headers["content-length"]
//     const contentType = response.headers["content-type"]
//     const lastModified = response.headers["last-modified"]

//     const fileName = url.substring(url.lastIndexOf("/") + 1)

//     return {
//       size: contentLength ? parseInt(contentLength, 10) : null,
//       name: fileName,
//       type: contentType || "",
//       lastModified: lastModified ? new Date(lastModified) : null,
//     }
//   } catch (error) {
//     console.error("Error getting file details:", error)
//     return {
//       size: null,
//       name: "",
//       type: "",
//       lastModified: null,
//     }
//   }
// }

// export const useImageDetails = (imageUrl: string): IFileDetails => {
//   const [imageProps, setImageProps] = useState<IFileDetails>({
//     width: 0,
//     height: 0,
//     size: null,
//     name: "",
//     type: "",
//     lastModified: null,
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [size, details] = await Promise.all([
//           getIImageSize(imageUrl),
//           getFileDetails(imageUrl),
//         ])

//         setImageProps({ ...size, ...details })
//       } catch (error) {
//         console.error("Error loading image details:", error)
//       }
//     }

//     fetchData()
//   }, [imageUrl])

//   return imageProps
// }

// export interface IUseImage {
//   isLoaded: boolean
//   isError: boolean
//   handleError: (error: boolean) => void
//   handleLoad: (load: boolean) => void
// }

// export const useImage = (): IUseImage => {
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [isError, setIsError] = useState(false)

//   const handleLoad = (load: boolean) => {
//     setIsLoaded(load)
//   }

//   const handleError = (error: boolean) => {
//     setIsError(error)
//   }

//   return {
//     isLoaded,
//     isError,
//     handleError,
//     handleLoad,
//   }
// }

// interface IMediaURL {
//   mediaUrl: {
//     type: "doc" | "image" | null
//     url: string
//     load: boolean
//   }
// }

// const isImageExist = async (
//   url: string,
//   imgProps: IUseImage
// ): Promise<boolean> =>
//   await new Promise((resolve) => {
//     const img = new Image()
//     img.onload = () => {
//       imgProps.handleLoad(true)
//       resolve(true)
//       cleanup()
//     }
//     img.onerror = () => {
//       imgProps.handleError(true)
//       resolve(false)
//       cleanup()
//     }
//     img.src = url

//     // Cleanup function to remove event listeners and clear the src attribute
//     const cleanup = () => {
//       img.onload = null
//       img.onerror = null
//       img.src = ""
//       imgProps.handleLoad(false)
//       imgProps.handleError(false)
//     }
//   })

// export const useGetMediaUrl = (url: string, imgProps: IUseImage): IMediaURL => {
//   const [mediaUrl, setMediaUrl] = useState<{
//     type: "doc" | "image" | null
//     url: string
//     load: boolean
//   }>({ type: "image", url: "", load: false })

//   useEffect(() => {
//     setMediaUrl({ load: true, type: null, url: "" })
//     const getMediaUrl = async (): Promise<{
//       type: "doc" | "image" | null
//       url: string
//       load: boolean
//     }> => {
//       if (url) {
//         const isImage = await isImageExist(url, imgProps)
//         return {
//           type: isImage ? "image" : "doc",
//           url,
//           load: false,
//         }
//       } else {
//         return { type: "image", url: "", load: false }
//       }
//     }
//     getMediaUrl().then((data) => {
//       setMediaUrl(data)
//     })
//   }, [url])

//   return {
//     mediaUrl,
//   }
// }

// export interface IRTI {
//   title: string
//   description: string
//   isActive?: boolean
//   onProceed?: () => void
//   onSelect?: () => void
//   disabled?: boolean
// }
