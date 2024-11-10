import React from "react"
import { TypeButton } from "../button"
import TextPrompt from "../text-prompt"
import { PulseSVG } from "../svgs"
import styled from "styled-components"
import { IRSection } from "./interface"

export const RightSection = <T extends {}>({
  children,
  rsProps,
}: IRSection<T>) => {
  const matchChild: any = React.Children.map(children, (child) => {
    if (child) return { ...child, props: { ...child.props, rsProps } }
    return child
  })

  const isTitleString = typeof rsProps.title === "string"

  return (
    <>
      {rsProps.openSection ? <BDStyle onClick={rsProps.closeSection} /> : null}
      <RSStyle
        className={`${rsProps.openSection ? "menuopen" : "menuclose"} ${
          rsProps.max ? "max" : ""
        }`}
      >
        <div className="rs-header border-label-bottom">
          {isTitleString ? <h3>{rsProps.title}</h3> : rsProps.title}
          <div className="f-row-20 align-items-center ctas">
            {rsProps?.cta?.map((i, index) => (
              <TypeButton
                title={i.title}
                buttonType={i.buttonType}
                buttonSize="small"
                onClick={i.action}
                key={index}
              />
            ))}
            <TypeButton
              title=""
              close
              buttonType="danger"
              buttonSize="small"
              onClick={() => {
                rsProps.closeSection()
              }}
            />
          </div>
        </div>
        {rsProps.isSectionHistory ? (
          <div className="mt-auto py-3">
            <div
              className="f-row-7 color-label align-items-center hw-mx cursor-pointer"
              onClick={() => {
                rsProps.removeRightSectionHistory()
              }}
            >
              <i className="fas fa-angle-left" />
              <p className="m-0 text-little">Back</p>
            </div>
          </div>
        ) : null}
        {rsProps.title ? (
          <div className="rs-body">{matchChild}</div>
        ) : (
          <div>
            {rsProps.data !== null && !rsProps.data ? (
              <div className="pt-3">
                <TextPrompt prompt="Something went wrong" status={false} />
              </div>
            ) : (
              <PulseSVG />
            )}
          </div>
        )}
      </RSStyle>
    </>
  )
}

const RSStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  width: 70%;

  height: 100vh;
  z-index: 30;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transition: 0.2s all ease-in;
  padding: 0 2.52rem;
  overflow: auto;
  background: #fff;
  &.max {
    width: 100%;
  }
  &.menuclose {
    transform: translateX(100%);
  }
  &.menuopen {
    transform: translateX(0);
  }
  .rs-header {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid #bababa;

    h3 {
      margin: 0;
      color: #274169;
      font-size: 0.875rem;
      font-style: normal;
      line-height: normal;
      margin-right: 1.94rem;
    }
    .ctas {
      margin-left: auto;
    }
  }
  .rs-body {
    height: 100vh;
    overflow: auto;
    padding: 1.12rem 1px 0 0;

    display: flex;
    flex-direction: column;
    // @media (max-width: variables.$md-breakpoint) {
    padding-bottom: 150px;
    // }
  }
  @media (max-width: variables.$lg-breakpoint) {
    width: -webkit-fill-available;
  }
  @media (max-width: variables.$md-breakpoint) {
    padding: 1.56rem 1.5625rem 0rem;
  }
`

const BDStyle = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 28;
  filter: blur(2px);
  backdrop-filter: blur(2px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(2px); /* For Safari */
`
