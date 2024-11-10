import React from 'react'
import TextPrompt from '../text-prompt'
import styled from 'styled-components'

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string | undefined
  children?: any
}

// eslint-disable-next-line react/display-name
export const TypeCheckbox = React.forwardRef(
  ({ label, error, children, ...props }: IInput, ref) => {
    return (
      <TypeCheckBoxStyle>
        <div className="form-container">
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <div className="checkbox-content">
            <input
              {...props}
              ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
              type="checkbox"
            />
            {children}
          </div>
          {!!error && (
            <>
              <TextPrompt prompt={error} status={false} />
            </>
          )}
        </div>
      </TypeCheckBoxStyle>
    )
  }
)

const TypeCheckBoxStyle = styled.div`
  label {
    color: #235a62;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0 0 0.81rem;
  }
  .checkbox-content {
    display: flex;
    align-items: center;
    input {
      outline: #dbeaff;
      border-radius: 3px;
      height: 14px;
      width: 14px;
      background: none;
      border: 1px solid #a1a1a1;
    }
  }
`
