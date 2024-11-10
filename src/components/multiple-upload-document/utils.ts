import { IFileDetails, IImgSize, IUseImage } from "./interface"
import axios from "axios"

export const isImageExist = async (
  url: string,
  imgProps: IUseImage
): Promise<boolean> =>
  await new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      imgProps.handleLoad(true)
      resolve(true)
      cleanup()
    }
    img.onerror = () => {
      imgProps.handleError(true)
      resolve(false)
      cleanup()
    }
    img.src = url

    // Cleanup function to remove event listeners and clear the src attribute
    const cleanup = () => {
      img.onload = null
      img.onerror = null
      img.src = ""
      imgProps.handleLoad(false)
      imgProps.handleError(false)
    }
  })

export const getFileDetails = async (
  url: string
): Promise<Omit<IFileDetails, "width" | "height">> => {
  try {
    const response = await axios.head(url)
    const contentLength = response.headers["content-length"]
    const contentType = response.headers["content-type"]
    const lastModified = response.headers["last-modified"]

    const fileName = url.substring(url.lastIndexOf("/") + 1)

    return {
      size: contentLength ? parseInt(contentLength, 10) : null,
      name: fileName,
      type: contentType || "",
      lastModified: lastModified ? new Date(lastModified) : null,
    }
  } catch (error) {
    console.error("Error getting file details:", error)
    return {
      size: null,
      name: "",
      type: "",
      lastModified: null,
    }
  }
}

export const getImageSize = async (url: string): Promise<IImgSize> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = url
  })
}

export const getFileSize = async (url: string): Promise<number | null> => {
  try {
    const response = await axios.head(url)
    const contentLength = response.headers["content-length"]
    return contentLength ? parseInt(contentLength, 10) : null
  } catch (error) {
    console.error("Error getting file size:", error)
    return null
  }
}

export const getIImageSize = async (url: string): Promise<IImgSize> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = url
  })
}
