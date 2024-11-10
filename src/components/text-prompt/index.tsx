import React from 'react'

interface ITP {
  prompt?: string
  status?: boolean
  icon?: string
  noStatus?: boolean
  url?: string
  underline?: boolean
  // iconPosition?: 'left' | 'right'
}

const TextPrompt: React.FC<ITP> = ({
  prompt,
  status,
  icon,
  noStatus,
  url,
  underline
  // iconPosition
}) => {
  return (
    <>
      {prompt ? (
        <p
          className={`m-0 d-flex align-items-start gap-7 ${
            noStatus ? '' : status ? 'text-success' : 'text-danger'
          } text-tiny ${url ? 'cursor-pointer' : ''}`}
          style={{ textDecoration: url && underline ? 'underline' : '' }}
        >
          {!icon && (
            <span>
              <i
                className={
                  icon ||
                  (status ? 'fas fa-check-circle' : 'fas fa-info-circle')
                }
              />
            </span>
          )}
          {prompt}
        </p>
      ) : null}
    </>
  )
}

export default TextPrompt
