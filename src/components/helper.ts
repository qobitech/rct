export const _handleTh = (amount: string) => {
  if (amount) {
    const toNumber = parseFloat(amount.replace(/\D/g, ""))
    const toLocale = toNumber.toLocaleString()
    return toLocale
  }
}

export const _separator = (name: string) => {
  const arr = name
    .split("")
    .map((item, index) => {
      if (index !== 0) {
        if (item === item.toUpperCase()) {
          return " " + item
        } else {
          return item
        }
      } else return item
    })
    .toString()
    .replace(/,/g, "")
  return arr.charAt(0).toUpperCase() + arr.slice(1).toLowerCase()
}

const joinS = (arr: string) => arr.toUpperCase()

export const _joiner = (name: string) => {
  const arr = name
    .trim()
    .split("_")
    .map((item, index) => {
      if (index !== 0) {
        if (item === item.toUpperCase()) {
          return " " + joinS(item)
        } else {
          return joinS(item)
        }
      } else return joinS(item)
    })
    .toString()
    .replace(/,/g, "")
  return arr
}

export function _removeHTML(data: string) {
  const regExp = /(&nbsp;|<([^>]+)>)/gi
  const wSExp = /\s{2,}/gi
  const res = data.replace(regExp, "")
  return res.replace(wSExp, " ")
}

const getLastDigit = (rank: number) => {
  const digit = (rank + "").split("")
  return parseInt(digit[digit.length - 1])
}

export const getRanking = (rank: number) => {
  if (rank) {
    switch (getLastDigit(rank)) {
      case 3:
        return rank + "rd"
      case 2:
        return rank + "nd"
      case 1:
        return rank + "st"
      default:
        return rank + "th"
    }
  } else {
    return "..."
  }
}

export function generateUUID() {
  let d = new Date().getTime()
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export const getSlug = (title: string) => {
  if (!title) return ""
  return title.trim().split(" ").join("-").toLowerCase()
}

export const reverseSlug = (title: string) => {
  if (!title) return ""
  return title.trim().split("-").join(" ").toLowerCase()
}

export function replaceObjects<T extends { [key: string]: any }>(
  original: T[],
  replacements: T[],
  keyId: string
) {
  return original.map((originalObj) => {
    // Find a replacement object with the same ID
    const replacementObj = replacements.find(
      (replacement) => replacement[keyId] === originalObj[keyId]
    )

    // If a replacement object is found, use it; otherwise, use the original
    return replacementObj || originalObj
  })
}

export function copyObjectsWithUniqueId<T extends { [key: string]: any }>(
  sourceArray: T[],
  destinationArray: T[],
  keyId: string,
  operationType: "queue" | "stack"
) {
  const destinationIds = destinationArray.map((i) => i[keyId])

  // Copy objects with unique ids based on the specified operation type
  sourceArray.forEach((obj) => {
    if (obj?.[keyId] && !destinationIds.includes(obj?.[keyId])) {
      if (operationType === "queue") {
        destinationArray.push({ ...obj })
      } else if (operationType === "stack") {
        destinationArray.unshift({ ...obj })
      }
    }
  })
  return destinationArray
}

export const wordVariation = (
  count: number,
  word: string,
  hideCount?: boolean
) => {
  if (hideCount) return ` ${word}${count > 1 ? "s" : ""}`
  return count + ` ${word}${count > 1 ? "s" : ""}`
}

export const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
  window.scrollTo({
    top: (ref.current?.offsetTop || 0) - 40,
    left: 0,
    behavior: "smooth",
  })
}

export const handleScrollRightSection = (
  ref: React.RefObject<HTMLDivElement>
) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export const getAmount = (amount?: string) => {
  const am = Number(amount || "").toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return am
}

export const getMYear = (date: string | number | Date) =>
  new Date(date).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  })

export const getDayMonth = (date: string | number | Date) =>
  new Date(date).toLocaleDateString(undefined, {
    month: "2-digit",
    day: "numeric",
  })

export const previewMediaFile = (file: any) => {
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                        width=1500,height=800,left=1000,top=0, zoom=200%`
  const url = typeof file !== "string" ? URL.createObjectURL(file) : file
  const newWindow = window.open(url, "newWindow", params)

  // Apply zoom using CSS
  if (newWindow) {
    newWindow.onload = function () {
      ;(newWindow.document.body.style as any).zoom = "300%"
    }
  }
}

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const formatDate = (value: string): string => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

interface ObjectWithId {
  [key: string]: any // Replace 'any' with a more specific type if needed
  id: string | number // Assuming IDs can be string or number
}

export function concatenateUnique<T extends ObjectWithId>(
  arr1: T[],
  arr2: T[],
  idKey: keyof T
): T[] {
  // Concatenate the two arrays
  const combined: T[] = arr1.concat(arr2)

  // Create a Set to keep track of unique IDs
  const uniqueIds = new Set<string | number>()

  // Filter the combined array to keep only unique objects
  const uniqueObjects = combined.filter((obj) => {
    if (!uniqueIds.has(obj[idKey])) {
      uniqueIds.add(obj[idKey])
      return true // Keep this object
    }
    return false // Discard this object
  })

  return uniqueObjects
}

export function _isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
