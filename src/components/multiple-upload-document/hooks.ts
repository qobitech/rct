import axios from "axios"
import { useEffect, useState } from "react"
import { IFileDetails, IImgSize, IMediaURL, IUseImage } from "./interface"
import {
  getFileDetails,
  getFileSize,
  getIImageSize,
  getImageSize,
  isImageExist,
} from "./utils"

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

export const useImageDetails = (imageUrl: string): IFileDetails => {
  const [imageProps, setImageProps] = useState<IFileDetails>({
    width: 0,
    height: 0,
    size: null,
    name: "",
    type: "",
    lastModified: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [size, details] = await Promise.all([
          getIImageSize(imageUrl),
          getFileDetails(imageUrl),
        ])

        setImageProps({ ...size, ...details })
      } catch (error) {
        console.error("Error loading image details:", error)
      }
    }

    fetchData()
  }, [imageUrl])

  return imageProps
}

export const useImage = (): IUseImage => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLoad = (load: boolean) => {
    setIsLoaded(load)
  }

  const handleError = (error: boolean) => {
    setIsError(error)
  }

  return {
    isLoaded,
    isError,
    handleError,
    handleLoad,
  }
}

export const useGetMediaUrl = (url: string, imgProps: IUseImage): IMediaURL => {
  const [mediaUrl, setMediaUrl] = useState<{
    type: "doc" | "image" | null
    url: string
    load: boolean
  }>({ type: "image", url: "", load: false })

  useEffect(() => {
    setMediaUrl({ load: true, type: null, url: "" })
    const getMediaUrl = async (): Promise<{
      type: "doc" | "image" | null
      url: string
      load: boolean
    }> => {
      if (url) {
        const isImage = await isImageExist(url, imgProps)
        return {
          type: isImage ? "image" : "doc",
          url,
          load: false,
        }
      } else {
        return { type: "image", url: "", load: false }
      }
    }
    getMediaUrl().then((data) => {
      setMediaUrl(data)
    })
  }, [url])

  return {
    mediaUrl,
  }
}
