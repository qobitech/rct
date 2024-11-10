import React, { useEffect, useRef, useState } from "react"
import TextPrompt from "../text-prompt"
import { IRefreshProps } from "../hooks"
import { HVC, RefreshComponent } from "../components"
import { minStyle } from "../../global"
import styled from "styled-components"

export interface ISearchResult {
  label: string
  value: string | number
}

interface ISearchProps {
  results?: ISearchResult[]
  setSearchTerm: (value: string | number, id?: string | number) => void
  load?: boolean
}

interface IInputSearch extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string | undefined
  isonlyview?: boolean
  searchProps?: ISearchProps
  minComponent?: boolean
  refreshProps?: IRefreshProps
  clear?: () => void
}

// eslint-disable-next-line react/display-name
export const TypeInputSearch = React.forwardRef(
  (
    {
      label,
      error,
      isonlyview,
      searchProps,
      minComponent,
      clear,
      refreshProps,
      ...props
    }: IInputSearch,
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    return (
      <TypeInputClass className={props.className || ""} ref={wrapperRef}>
        <div
          className={`form-container f-column-14 position-relative ${
            props.className || ""
          }`}
        >
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
          <div className="position-relative w-100">
            <input
              {...props}
              ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
              className={`${error ? "is-error" : ""} ${
                isonlyview ? "isonlyview" : ""
              }`}
              disabled={props.disabled || isonlyview}
              style={minStyle(minComponent)}
              onFocus={() => setIsFocused(true)}
            />
            <HVC
              removeDOM
              view={!!props.value}
              className="position-absolute cursor-pointer px-2 py-1 rounded bg-white"
              style={{ right: "4px", top: minComponent ? "2.7px" : "9px" }}
              onClick={clear}
            >
              <i className="fas fa-times color-danger text-little" />
            </HVC>
          </div>
          <HVC removeDOM view={isFocused}>
            <ul className="search-container rounded">
              <HVC removeDOM view={!searchProps?.results} className="py-1">
                <p className="color-label text-tiny">No results found</p>
              </HVC>
              <HVC removeDOM view={!!searchProps?.results}>
                {searchProps?.results?.map((result, index) => (
                  <li
                    key={index}
                    className="text-tiny"
                    onMouseDown={() => {
                      searchProps?.setSearchTerm(result.label, result.value)
                      setIsFocused(false)
                    }}
                  >
                    {result.label}
                  </li>
                ))}
              </HVC>
            </ul>
          </HVC>
          {!!error && (
            <>
              <TextPrompt prompt={error} status={false} />
            </>
          )}
        </div>
      </TypeInputClass>
    )
  }
)

const TypeInputClass = styled.div`
  position: relative;
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
    font-size: 0.8425rem;
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
  .search-container {
    position: absolute;
    top: 104%;
    left: 0;
    right: 0;
    border: 1px solid #ccc;
    background-color: #fff;
    list-style: none;
    margin: 0;
    padding: 8px 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    li {
      padding: 8px 16px;
      cursor: pointer;
      &:hover {
        background: #f1f1f1;
        transition: 0.2s ease;
      }
    }
  }
`
