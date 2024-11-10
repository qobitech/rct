export interface IRTI {
  title: string
  description: string
  isActive?: boolean
  onProceed?: () => void
  onSelect?: () => void
  disabled?: boolean
}

export interface IUseImage {
  isLoaded: boolean
  isError: boolean
  handleError: (error: boolean) => void
  handleLoad: (load: boolean) => void
}

export interface IMediaURL {
  mediaUrl: {
    type: "doc" | "image" | null
    url: string
    load: boolean
  }
}

export interface IIImgSize {
  width: number
  height: number
}

export interface IFileDetails extends IIImgSize {
  size: number | null
  name: string
  type: string
  lastModified: Date | null
}

export interface IImgSize {
  width: number
  height: number
}
