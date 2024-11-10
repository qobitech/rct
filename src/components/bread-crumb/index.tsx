import React from "react"
import "./style.scss"
import { HomeSVG, RightArrowSVG } from "../svgs"

export interface ICrumb {
  title: string
  onClick: () => void
}
export interface IBreadCrumb {
  crumbs: ICrumb[]
  onHomeClick: () => void
}

export const BreadCrumb: React.FC<IBreadCrumb> = ({ crumbs, onHomeClick }) => {
  return (
    <div className="bread-crumb-section">
      <div className="bread-crumb-container gap-18">
        <div className="d-flex align-items-center" onClick={onHomeClick}>
          <HomeSVG />
        </div>
        <RightArrowSVG />
        {crumbs.map((i, index) => {
          if (index !== crumbs.length - 1) {
            return (
              <div className="bread-crumb-header-text" key={index}>
                <div onClick={i.onClick} className="bread-crumb-link-container">
                  {i.title}
                </div>
                &nbsp;&nbsp;
                <i className="fas fa-angle-right d-flex align-items-center mx-2" />
                &nbsp;
              </div>
            )
          } else {
            return (
              <div className="bread-crumb-header-text" key={index}>
                {i.title || <i className="fa fa-spinner fa-spin" />}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
