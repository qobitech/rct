export type btnType =
  | "outlined"
  | "bold"
  | "disabled"
  | "danger"
  | "active"
  | undefined

export type btnSize =
  | "little"
  | "small"
  | "medium"
  | "large"
  | "table"
  | undefined

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  buttonType?: btnType
  buttonSize?: btnSize
  title: string
  load?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  close?: boolean
  status?: boolean
  icon?: string | JSX.Element
}
