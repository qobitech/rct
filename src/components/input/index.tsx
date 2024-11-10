import React from "react"
import TextPrompt from "../text-prompt"
import { minStyle } from "../../global"
import styled from "styled-components"

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string | undefined
  isonlyview?: boolean
  minComponent?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeInput = React.forwardRef(
  ({ label, error, isonlyview, minComponent, ...props }: IInput, ref) => {
    return (
      <InputComponent className={props.className || ""}>
        <div
          className={`form-container position-relative ${
            props.className || ""
          }`}
        >
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <input
            ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
            className={`${error ? "is-error" : ""} ${
              isonlyview ? "isonlyview" : ""
            }`}
            disabled={props.disabled || isonlyview}
            {...props}
            style={minStyle(minComponent)}
          />
          {!!error && (
            <>
              <TextPrompt prompt={error} status={false} />
            </>
          )}
        </div>
      </InputComponent>
    )
  }
)

const InputComponent = styled.div`
  input {
    width: 100%;
    height: 3.125rem;
    background: none;
    border: 1px solid #a1a1a1;
    border-radius: 0.1875rem;
    padding: 0 1.24rem;
    box-shadow: none;
    box-sizing: border-box;
    outline: none;
    &::placeholder {
      color: #a1a1a1;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
    }
    &:focus {
      &.is-error {
        border: 1px solid #f56e9d;
      }
    }
    &.is-error {
      border: 1px solid #f56e9d;
      margin-bottom: 0.81rem;
    }
    &.isonlyview {
      padding-left: 0;
      border: none;
    }
  }
`
