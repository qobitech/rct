import React from 'react'
import TextPrompt from '../text-prompt'
import styled from 'styled-components'

interface IInput extends React.ComponentPropsWithoutRef<'textarea'> {
  label?: string
  error?: string | undefined
}

// eslint-disable-next-line react/display-name
export const TypeTextArea = React.forwardRef(
  ({ label, error, ...props }: IInput, ref) => {
    return (
      <TextAreaStyle>
        <div className="form-container">
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <textarea
            {...props}
            ref={ref as React.LegacyRef<HTMLTextAreaElement> | undefined}
            className={error ? 'is-error' : ''}
          />
          {!!error && (
            <>
              <TextPrompt prompt={error} status={false} />
            </>
          )}
        </div>
      </TextAreaStyle>
    )
  }
)

const TextAreaStyle = styled.div`
  label {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0 0 0.81rem;
  }
  textarea {
    width: 100% !important;
    height: 8rem !important;
    background: none;
    border-radius: 0.1875rem;
    border: 1px solid #a1a1a1;
    padding: 1.24rem 1.24rem 0;
    box-shadow: none !important;
    box-sizing: border-box !important;
    outline: none;
    &::placeholder {
      color: #a1a1a1 !important;
      font-size: 0.8125rem !important;
      font-style: normal !important;
      font-weight: 300 !important;
      line-height: normal !important;
    }
    &:focus {
      border: 1px solid #a1a1a1;
      &.is-error {
        border: 1px solid #f56e9d !important;
      }
    }
    &.is-error {
      border: 1px solid #f56e9d !important;
      margin-bottom: 0.81rem !important;
    }
  }
  /* Override autofill styles for webkit browsers */
  textarea:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #000 inset !important; /* Override white background */
    -webkit-text-fill-color: #000 !important; /* Set text color to override autofill styling */
  }
`
