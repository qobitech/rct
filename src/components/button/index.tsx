import React from 'react'
import ButtonLoader from './button-loader'
import { CloseSVG } from '../svgs'
import styled from 'styled-components'

export type btnType =
  | 'outlined'
  | 'bold'
  | 'disabled'
  | 'danger'
  | 'active'
  | undefined

export type btnSize =
  | 'little'
  | 'small'
  | 'medium'
  | 'large'
  | 'table'
  | undefined

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  buttonType?: btnType
  buttonSize?: btnSize
  title: string
  load?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  close?: boolean
  status?: boolean
  icon?: string | JSX.Element
}

export const TypeButton = React.forwardRef(
  (
    {
      buttonType,
      buttonSize,
      title,
      load,
      onClick,
      close,
      icon,
      ...props
    }: IButton,
    ref
  ) => {
    const isIconSTR = typeof icon === 'string'
    return (
      <TypeButtonComponent className={props.className || ''}>
        <button
          {...props}
          className={`${buttonType} ${buttonSize} ${props.className}`}
          ref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
          onClick={load ? undefined : onClick}
        >
          {!load ? (
            <span className="d-flex align-items-center gap-10">
              {close ? <CloseSVG /> : title}
              {isIconSTR ? <i className={icon} /> : icon}
            </span>
          ) : (
            <ButtonLoader
              className={buttonType === 'outlined' ? 'bg-dark' : ''}
            />
          )}
        </button>
      </TypeButtonComponent>
    )
  }
)

TypeButton.displayName = 'TypeButton'

export const TypeButtonComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
  width: max-content;
  button {
    display: inline-flex;
    padding: 1rem 1.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.2625rem;
    background: green;
    outline: none;
    color: #fff;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: none;
    cursor: pointer;
    &.disabled {
      background: #eaeaea;
      cursor: not-allowed;
      color: #9a9a9a;
    }
    &.outlined {
      background: none;
      color: green;
      border: 0.1px solid #54878f;
    }
    &.danger {
      color: #f56e9d;
      background: #fffafc;
      border: 0.5px solid #ffe1ec;
    }
    &.little {
      font-size: 0.625rem;
      font-weight: 600;
      line-height: normal;
      display: inline-flex;
      padding: 0.52rem 0.79rem;
      width: max-content;
    }
    &.small {
      font-size: 0.775rem;
      font-weight: 700;
      line-height: normal;
      display: inline-flex;
      padding: 0.78rem 1.19rem;
      width: max-content;
    }
    &.medium {
      font-size: 0.8rem;
      font-weight: 700;
      line-height: normal;
      display: inline-flex;
      padding: 0.79rem 1.19rem;
      width: max-content;
      height: auto;
    }
  }
}
`
