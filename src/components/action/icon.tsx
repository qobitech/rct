import React, { FC } from "react"
import "./style.scss"

interface IActionIcon {
  icon: JSX.Element
  action: () => void
}

export const ActionIcon: FC<IActionIcon> = ({ action, icon }) => {
  return (
    <div
      className="rounded cursor-pointer p-2 f-row align-items-center justify-content-center icon-wrapper"
      onClick={action}
    >
      {icon}
    </div>
  )
}
