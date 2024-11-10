import React, { FC, useRef, useState } from "react"
import { PlusSVG, UploadIconSVG, UploadSVG } from "../svgs"
import TextPrompt from "../text-prompt"
import { TypeButton } from "../button"
import { HVC, MediaItem } from "../components"
import { _isMobile } from "../helper"

export interface IMUC {
  setFiles: (files: File[], index?: number) => void
  handlePreviewFile?: (index: number) => void
  files: File[]
  uploadDocs?: () => void
  load?: boolean
  isUpdate?: boolean
  isUploaded?: boolean
  uploadedFiles: string[]
}

export const MultipleMediaUploadComponent: FC<IMUC> = ({
  setFiles,
  files,
  handlePreviewFile,
  uploadDocs,
  load,
  isUpdate,
  isUploaded,
  uploadedFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileError, setFileError] = useState<string>("")

  const validateFiles = (newFiles: File[]) => {
    setFileError("")
    const validFiles = newFiles.filter((file) => {
      // Check for valid file types (image or PDF)
      if (!file.type.includes("image") && !file.type.includes("pdf")) {
        setFileError("Use png / jpg / jpeg / pdf format for this activity.")
        return false
      }
      // Check for file size (10MB limit)
      if (file.size > 10000000) {
        setFileError("File size should be 10mb or less")
        return false
      }
      return true
    })
    return validFiles
  }

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = target
    if (selectedFiles?.length) {
      const newFiles = Array.from(selectedFiles)
      const validFiles = validateFiles(newFiles)
      if (validFiles.length > 0) {
        setFiles([...files, ...validFiles])
      }
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const validFiles = validateFiles(droppedFiles)
    if (validFiles.length > 0) {
      setFiles([...files, ...validFiles])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = Array.from(event.target.files || [])
      const validFiles = validateFiles(selectedFile)
      if (validFiles.length > 0) {
        const prevFiles = [...files]
        prevFiles[index] = validFiles[0]
        setFiles([...prevFiles], index)
      }
    }

  const handleRemoveFile = (index: number) => {
    const prevFiles = [...files]
    setFiles(
      prevFiles.filter((_, i) => i !== index),
      index
    )
    if (inputRef.current) {
      inputRef.current.value = "" // Clears the input value
    }
  }

  const ismobile = _isMobile()

  const isPreview = typeof handlePreviewFile === "function"

  const addNewFile = () => {
    if (inputRef?.current) {
      inputRef.current.click()
    }
  }

  const getImageSrc = (index: number) => {
    try {
      return URL.createObjectURL(files[index])
    } catch {
      return uploadedFiles[index]
    }
  }

  return (
    <div className={`w-100`}>
      <HVC
        view={!files.length}
        className="position-relative rounded d-flex align-items-center justify-content-center w-100 mb-1"
        style={{ border: "1px dotted #d5d5d5", background: "#f7f7f7" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="position-absolute w-100 h-100 border-0 cursor-pointer"
          onChange={handleOnChange}
          ref={inputRef}
        />
        <div className="f-column-20 text-center align-items-center justify-content-center py-5 w-100 h-100">
          <UploadSVG />
          {!ismobile && (
            <p className="m-0 text-small">Drag and drop the files</p>
          )}
          {!ismobile && <p className="m-0 text-tiny color-label">OR</p>}
          <TypeButton
            buttonSize="small"
            buttonType="outlined"
            title="Browse Files"
            style={{
              borderRadius: "25px",
              color: "#4e4e4e",
              fontWeight: 300,
            }}
          />
          <p className="text-tiny color-label">
            Use png / jpg / jpeg format for this activity
            <span className="text-danger">*</span>
          </p>
        </div>
      </HVC>
      <HVC removeDOM view={!!files.length} className="f-column-23">
        <div className="f-column-7 text-center">
          <p className="m-0 text-tiny color-label">
            {files.length} file{files.length === 1 ? "" : "s"} added
          </p>
          <div className="f-row justify-content-between align-items-center">
            <TypeButton
              title="Add another file"
              buttonSize="small"
              buttonType="outlined"
              icon={<PlusSVG />}
              className="p-0 border-0"
              onClick={addNewFile}
            />
            <TypeButton
              title={!isUpdate ? "Upload" : "Update"}
              buttonSize="small"
              buttonType={isUploaded && !isUpdate ? "disabled" : "bold"}
              disabled={isUploaded && !isUpdate}
              icon={<UploadIconSVG color="#fff" />}
              onClick={uploadDocs}
              load={load}
            />
          </div>
        </div>
        <div
          style={{ maxHeight: "62vh", overflow: "auto" }}
          className="grid-wrapper-45 gap-33"
        >
          {files.map((file, index) => (
            <div
              key={index}
              className="w-100 rounded position-relative mb-2"
              style={{ height: "300px", overflow: "hidden" }}
            >
              <div className="w-100 h-100">
                <MediaItem url={getImageSrc(index)} />
              </div>
              <input
                type="file"
                className="position-absolute w-100 h-100 border-0 cursor-pointer"
                onChange={handleFileInputChange(index)}
                style={{ zIndex: 2, left: 0 }}
              />
              <div
                className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  zIndex: 1,
                  left: 0,
                  top: 0,
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <UploadSVG color="#fff" />
              </div>
              <div
                className="position-absolute top-0 right-0 p-2 f-row-10"
                style={{ zIndex: 5 }}
              >
                {isPreview && (
                  <button
                    onClick={() => handlePreviewFile?.(index)} // Adjust index to match slice offset
                    className="btn btn-success btn-sm"
                  >
                    Preview
                  </button>
                )}
                <button
                  onClick={() => handleRemoveFile(index)} // Adjust index to match slice offset
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
              <div className="w-100 h-100 py-2 text-center">
                <p className="m-0 text-little">{file.name}</p>
              </div>
            </div>
          ))}
        </div>
      </HVC>
      {fileError ? <TextPrompt prompt={fileError} status={false} /> : null}
    </div>
  )
}
