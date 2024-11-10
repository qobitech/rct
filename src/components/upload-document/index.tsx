import React, { FC, useState } from 'react'
import { UploadSVG } from '../svgs'
import TextPrompt from '../text-prompt'
import { TypeButton } from '../button'

export interface IMUC {
  title: string
  url?: string
  fileName: string
  setMediaFile: (file: File) => void
  inputRef?: React.RefObject<HTMLInputElement>
  loadedFile?: File | null
  useLoadedFile?: boolean
}

export const MediaUploadComponent: FC<IMUC> = ({
  title,
  url,
  fileName,
  setMediaFile,
  inputRef,
  loadedFile,
  useLoadedFile
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const validateFile = (file: File) => {
    setFileError('')
    setFile(null)
    // is image
    if (!file.type.includes('image')) {
      setFileError('Use png / jpg / jpeg format for this activity.')
      return false
    }
    if (file.size > 2000000) {
      setFileError('File size should be 2mb or less')
      return false
    }
    return true
  }
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target
    if (files?.length) {
      if (validateFile(files[0])) {
        setFile(files[0])
        setMediaFile(files[0])
      }
    }
  }

  const doc = useLoadedFile ? loadedFile : file

  const fileUrl = doc ? URL.createObjectURL(doc) : ''

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    // const droppedFiles = Array.from(event.dataTransfer.files)
    // setFiles((prevFiles) => [...prevFiles, ...droppedFiles])
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  // const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   // const selectedFiles = Array.from(event.target.files || [])
  //   // setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  // }

  return (
    <div className="w-100">
      {!doc && !url ? (
        <div
          className="position-relative rounded d-flex align-items-center justify-content-center w-100 mb-1"
          style={{ border: '1px dotted #d5d5d5', background: '#f7f7f7' }}
        >
          <input
            type="file"
            className="position-absolute w-100 h-100 border-0 w-100 cursor-pointer"
            onChange={handleOnChange}
            ref={inputRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          <div className="f-column-20 text-center align-items-center justify-content-center py-5 w-100 h-100">
            <UploadSVG />
            <p className="m-0 text-small">Drag and drop the file</p>
            <p className="m-0 text-tiny color-label">OR</p>
            <TypeButton
              buttonSize="small"
              buttonType="outlined"
              title="Browse Files"
              style={{
                borderRadius: '25px',
                color: '#4e4e4e',
                fontWeight: 300
              }}
            />
          </div>
        </div>
      ) : null}
      {url || doc ? (
        <div>
          <div
            className="w-100 rounded position-relative"
            style={{ height: '300px', overflow: 'hidden' }}
          >
            <img
              src={fileUrl || url}
              alt="upload file"
              style={{ objectFit: 'contain' }}
              className="w-100 h-100"
            />
            <input
              type="file"
              className="position-absolute w-100 h-100 border-0 w-100 cursor-pointer"
              onChange={handleOnChange}
              style={{ zIndex: 2, left: 0 }}
              ref={inputRef}
            />
            <div
              className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                zIndex: 1,
                left: 0,
                top: 0,
                background: 'rgba(0,0,0,0.2)'
              }}
            >
              <UploadSVG color="#fff" />
            </div>
          </div>
          {doc ? (
            <div className="w-100 h-100 py-2 text-center">
              <p className="m-0 text-little">{fileName}</p>
            </div>
          ) : null}
        </div>
      ) : null}
      {fileError ? <TextPrompt prompt={fileError} status={false} /> : null}
    </div>
  )
}
