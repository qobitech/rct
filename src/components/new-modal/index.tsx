import React, { useState, useRef } from "react"
import { Modal } from "react-bootstrap"
import { CloseSVG } from "../svgs"
import { IUseNotificationModal } from "./hook"

export interface INotificationModal {
  useNotificationProps: IUseNotificationModal
  children?: any
  size?: "wide" | "medium"
  disableClose?: boolean
}

export const NotificationModal: React.FC<INotificationModal> = ({
  useNotificationProps,
  size,
  children,
  disableClose,
}) => {
  const { openModal, title, closeRef, handleCloseModal } = useNotificationProps

  const matchChild: any = React.Children.map(children, (child) => {
    if (child)
      return { ...child, props: { ...child.props, useNotificationProps } }
    return child
  })

  return (
    <Modal
      tabIndex={-1}
      show={openModal}
      className={
        size === "wide" ? "wide-modal" : size === "medium" ? "medium-modal" : ""
      }
    >
      <Modal.Dialog
        className="mx-auto border-0"
        role="document"
        style={{
          width: "90%",
          background: "none",
        }}
      >
        <Modal.Header className="d-flex justify-content-center ">
          <span className="position-relative w-100 text-center">
            <h5
              className="modal-title text-center"
              style={{ fontSize: "14px", fontFamily: "var(--Inter-medium)" }}
            >
              {title}
            </h5>
            {!disableClose ? (
              <span
                className="position-absolute d-flex align-items-center justify-content-center"
                data-dismiss="modal"
                style={{
                  top: 0,
                  right: 0,
                  height: "100%",
                  cursor: "pointer",
                }}
                id="closeBtnId"
                onClick={() => handleCloseModal()}
                ref={closeRef}
              >
                <CloseSVG />
              </span>
            ) : null}
          </span>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }} className="px-4 pt-4">
          {matchChild}
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
}
