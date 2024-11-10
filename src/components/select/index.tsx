import React from "react"
import TextPrompt from "../text-prompt"
import { HVC, RefreshComponent } from "../components"
import { IRefreshProps } from "../hooks"
import { minStyle } from "../../global"
import styled from "styled-components"

export interface ISelectOptionsProps {
  id: number | string
  label: string
  value: string | number
  hide?: boolean
}
interface ISelect extends React.ComponentPropsWithoutRef<"select"> {
  label?: string
  error?: string | undefined
  optionsdata?: ISelectOptionsProps[]
  initoption: { label: string; value: string | number }
  customwidth?: string | number
  load?: boolean
  disableInit?: boolean
  cta?: {
    title: string
    action: () => void
    icon: string
  }
  refreshProps?: IRefreshProps
  minComponent?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeSelect = React.forwardRef(
  (
    {
      label,
      error,
      optionsdata,
      initoption,
      load,
      disableInit,
      cta,
      refreshProps,
      minComponent,
      ...props
    }: ISelect,
    ref
  ) => {
    return (
      <TypeSelectStyle style={{ width: props.customwidth || "" }}>
        <div className="form-container f-column-14">
          <HVC removeDOM view={!!label} className="f-row-20 align-items-center">
            <label className="m-0" htmlFor={props.id || props.name}>
              {label}
            </label>
            <HVC removeDOM view={!!refreshProps}>
              <RefreshComponent
                load={refreshProps?.load}
                onRefresh={refreshProps?.onRefresh}
              />
            </HVC>
          </HVC>
          <select
            ref={ref as React.LegacyRef<HTMLSelectElement> | undefined}
            className={error ? "is-error" : ""}
            {...props}
            style={minStyle(minComponent)}
          >
            <option disabled={disableInit} value={initoption.value}>
              {initoption.label}
            </option>
            {optionsdata
              ?.filter((i) => !i.hide)
              ?.map((i) => (
                <option key={i.id} value={i.value}>
                  {i.label}
                </option>
              ))}
          </select>
          {!!error && (
            <>
              <TextPrompt prompt={error} status={false} />
            </>
          )}
        </div>
      </TypeSelectStyle>
    )
  }
)

const TypeSelectStyle = styled.div`
  select {
    width: 100%;
    height: 3.125rem;
    border-radius: 0.1875rem;
    flex-shrink: 0;
    background: none;
    padding: 0 0.4rem;
    font-size: 0.875rem;
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
      border: 1px solid #6a8dc3;
      &.is-error {
        border: 1px solid #f56e9d;
      }
    }
    &.is-error {
      border: 1px solid #f56e9d;
      margin-bottom: 0.81rem;
    }
  }
  /* Override autofill styles for webkit browsers */
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #f0f0f0 inset !important; /* Override white background */
    -webkit-text-fill-color: #000; /* Set text color to override autofill styling */
  }
`
