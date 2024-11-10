import React, { FC } from "react"
import styled from "styled-components"
import { ITabComponentProp } from "./interface"

export interface ITabSection {
  tabProps: ITabComponentProp[]
  position: "start" | "end" | "center"
  positionMobile?: "start" | "end" | "center"
  tabGap?: string
  type?: "default" | "block"
}

export const TabSection: FC<ITabSection> = ({
  tabProps,
  position,
  positionMobile,
  tabGap,
  type,
}) => {
  return (
    <TabHeaderStyle
      className={`d-flex ${
        type === "block" ? "flex-wrap" : "bottom"
      } justify-content-${position}`}
      style={{ gap: `${tabGap || 50}px`, overflow: "auto" }}
    >
      {type !== "block"
        ? tabProps.map((i, index) => (
            <TabComponent
              key={index}
              isSelected={i.isSelected}
              setTab={i.setTab}
              title={i.title}
              onSetTab={i.onSetTab}
            />
          ))
        : null}
      {type === "block"
        ? tabProps.map((i, index) => (
            <TabBlockComponent
              key={index}
              isSelected={i.isSelected}
              setTab={i.setTab}
              title={i.title}
              onSetTab={i.onSetTab}
            />
          ))
        : null}
    </TabHeaderStyle>
  )
}

export const TabComponent = ({
  isSelected,
  title,
  setTab,
  number,
  onSetTab,
}: {
  isSelected: boolean
  title: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  number?: string
  onSetTab?: (tab?: string) => void
}) => {
  return (
    <div
      style={{
        width: "max-content",
        height: "max-content",
        cursor: "pointer",
        flexShrink: 0,
      }}
      onClick={() => {
        setTab(title)
        onSetTab?.(title)
      }}
    >
      <TabTitleStyle
        className={`mb-2 ${isSelected ? "" : "color-light"}`}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {title}
        {number || ""}
      </TabTitleStyle>
      <div
        style={{
          background: isSelected ? "#000" : "none",
          height: "3px",
        }}
        className="w-100 rounded"
      />
    </div>
  )
}

export const TabBlockComponent = ({
  isSelected,
  title,
  setTab,
  number,
  onSetTab,
}: {
  isSelected: boolean
  title: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  number?: string
  onSetTab?: (tab?: string) => void
}) => {
  return (
    <div
      style={{
        width: "max-content",
        height: "max-content",
        cursor: "pointer",
        flexShrink: 0,
        padding: "0.4725rem 0.8725rem",
        background: isSelected ? `rgb(220 242 232)` : "none",
        transition: ".2s ease all",
      }}
      onClick={() => {
        setTab(title)
        onSetTab?.(title)
      }}
      className="rounded"
    >
      <TabTitleStyle
        className={`m-0 ${isSelected ? "" : ""}`}
        style={{
          whiteSpace: "nowrap",
          fontSize: "0.79625rem",
        }}
      >
        {title}
        {number || ""}
      </TabTitleStyle>
    </div>
  )
}

const TabTitleStyle = styled.div`
  cursor: pointer;
  font-size: 14px;
  transition: 0.1s ease;
`

const TabHeaderStyle = styled.div`
  &.bottom {
    border-bottom: 1px solid #f0f0f0;
  }
`
