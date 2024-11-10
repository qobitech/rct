/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useState } from "react"
import { HVC } from "../components"
import { MinusSVG, PlusSVG } from "../svgs"
import { btnSize, btnType } from "../button/interface"
import { TypeButton } from "../button"
import { ActionComponent, IOptionAction } from "../action-component"
import { ITableAction } from "../table/utils"
import { TypeSelect } from "../select"

export interface ICell {
  value?: string | number
  imageUrl?: string
  isLink?: boolean
  position?: number
  status?: boolean
  rating?: number
  lastPosition?: number
  icon?: string | JSX.Element
  url?: string
  action?: () => void
  textLength?: number
  cellWidth?: string
  classProps?: string
  dangerouselySetHtml?: string
  mutate?: (id: string, value: string | number) => void
  mutateValue?: string | number
  mutateType?: "text" | "number"
  mutateId?: string
  mutateMin?: number
  mutateMax?: number
  mutatePostTxt?: string
  jsxElement?: JSX.Element | undefined
}

export interface ICellAction extends ICell {
  color?: string
  view?: "text" | "icon" | "both"
  background?: string
  buttonType?: btnType
  hide?: boolean
  actionType?: "btn" | "btn-options"
  options?: IOptionAction[]
  buttonSize?: btnSize
  load?: boolean
}

export interface IMiniTableRecord {
  id: string
  row: ICell[]
  isSelected?: boolean
  rowActions?: ICellAction[]
  rowError?: boolean
}

export const CellValueComponent: FC<ICell> = ({
  value,
  action,
  textLength,
  cellWidth,
  classProps,
  dangerouselySetHtml,
  mutate,
  mutateValue,
  mutateType,
  mutateId,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  imageUrl,
  jsxElement,
}) => {
  return (
    <TDContent
      action={action}
      value={value}
      textLength={textLength!}
      cellWidth={cellWidth!}
      classProps={classProps!}
      dangerouselySetHtml={dangerouselySetHtml!}
      mutate={mutate}
      mutateValue={mutateValue}
      mutateType={mutateType}
      mutateId={mutateId}
      mutateMax={mutateMax}
      mutateMin={mutateMin}
      mutatePostTxt={mutatePostTxt}
      imageUrl={imageUrl}
      jsxElement={jsxElement}
    />
  )
}

interface ITDC {
  action: (() => void) | undefined
  value: string | number | undefined
  textLength: number
  cellWidth: string
  classProps: string
  dangerouselySetHtml: string
  mutate?: (id: string, value: string | number) => void
  mutateValue?: string | number
  mutateType?: "number" | "text"
  mutateId?: string
  mutateMax?: number
  mutateMin?: number
  mutatePostTxt?: string
  imageUrl?: string
  jsxElement?: JSX.Element | undefined
}

const TDContent: FC<ITDC> = ({
  action,
  value,
  textLength,
  cellWidth,
  classProps,
  dangerouselySetHtml,
  mutate,
  mutateType,
  mutateValue,
  mutateId,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  imageUrl,
  jsxElement,
}) => {
  const [summarizeText, setSummarizeText] = useState<boolean>(
    () => !!textLength
  )
  const isSumm = value ? value?.toString().length > textLength : false
  const cellValue = value
    ? textLength
      ? value?.toString().substring(0, textLength) + (isSumm ? "..." : "")
      : value?.toString()
    : ""

  const isMutate = typeof mutate === "function"
  return (
    <>
      {/* mutate section */}
      <HVC removeDOM view={isMutate}>
        <MutateValue
          mutate={mutate}
          mutateType={mutateType}
          mutateValue={mutateValue}
          mutateId={mutateId}
          mutateMax={mutateMax}
          mutateMin={mutateMin}
          mutatePostTxt={mutatePostTxt}
        />
      </HVC>
      {/* dangerously set data */}
      <HVC removeDOM view={!!dangerouselySetHtml}>
        <div dangerouslySetInnerHTML={{ __html: dangerouselySetHtml }} />
      </HVC>
      {/* image and text */}
      <HVC
        removeDOM
        view={!isMutate && jsxElement === undefined}
        className="f-row-20 align-items-center"
      >
        {/* image url */}
        <HVC
          removeDOM
          view={typeof imageUrl === "string"}
          className="border-label"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img src={imageUrl} alt="" style={{ objectFit: "cover" }} />
        </HVC>
        {/* text */}
        <p className="m-0 d-flex align-items-center text-little">
          <span
            className={`d-block ${classProps}`}
            onClick={action}
            style={{ width: cellWidth || "" }}
            role="button"
          >
            {summarizeText ? cellValue : value}
          </span>
          {textLength && isSumm ? (
            <span onClick={() => setSummarizeText(!summarizeText)}>
              <i
                className={`ml-2 table-cell-border p-1 rounded fas fa-angle-${
                  summarizeText ? "up" : "down"
                }`}
              />
            </span>
          ) : null}
        </p>
      </HVC>
      {/* jsx element */}
      <HVC removeDOM view={!!jsxElement}>
        {jsxElement}
      </HVC>
    </>
  )
}

interface IMutateValue {
  mutateType?: "number" | "text"
  mutateValue?: string | number
  mutate?: (id: string, value: string | number) => void
  mutateId?: string
  mutateMax?: number
  mutateMin?: number
  mutatePostTxt?: string
}

const MutateValue = ({
  mutateType,
  mutateValue,
  mutate,
  mutateId,
  mutateMax,
  mutateMin,
  mutatePostTxt,
}: IMutateValue) => {
  const isNumber = mutateType === "number"

  const onMutate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target
    if (isNumber) {
      if (
        parseInt(value) >= (mutateMin || 1) &&
        parseInt(value) <= (mutateMax || 1)
      ) {
        mutate?.(id, value)
      }
    } else {
      mutate?.(id, value)
    }
  }

  const onAdd = () => {
    mutate?.(
      mutateId || "",
      Math.min(mutateMax || 1, parseInt((mutateValue || "0") as string) + 1)
    )
  }
  const onRemove = () => {
    mutate?.(
      mutateId || "",
      Math.max(mutateMin || 1, parseInt((mutateValue || "0") as string) - 1)
    )
  }

  const color = "#9f9f9f"

  return (
    <div className="f-row-5 align-items-center">
      {isNumber ? (
        <div onClick={onRemove}>
          <MinusSVG color={color} />
        </div>
      ) : null}
      <input
        type={mutateType}
        className={`mutate-input ${mutateType || "text"}`}
        value={mutateValue}
        onChange={onMutate}
        id={mutateId}
        min={mutateMin}
        max={mutateMax}
      />
      {isNumber ? (
        <div onClick={onAdd}>
          <PlusSVG color={color} />
        </div>
      ) : null}
      {mutatePostTxt ? (
        <p className="text-little m-0 pl-4">
          &nbsp;&nbsp;&nbsp;{mutatePostTxt}
        </p>
      ) : null}
    </div>
  )
}

interface ICVAC extends ICellAction {
  nomargin?: "true" | "false"
}

export const CellValueActionComponent: FC<ICVAC> = ({
  isLink,
  value,
  url,
  action,
  color,
  buttonType,
  view,
  hide,
  icon,
  actionType,
  options,
  load,
}) => {
  return (
    <>
      {!actionType || actionType === "btn" ? (
        <>
          {!hide ? (
            <TypeButton
              buttonSize="small"
              color={color}
              title={view !== "icon" ? value + "" : ""}
              buttonType={buttonType}
              style={{ fontSize: "10px" }}
              onClick={action}
              className="mr-2"
              icon={icon}
              load={load}
            />
          ) : null}
        </>
      ) : null}
      {actionType === "btn-options" ? (
        <ActionComponent
          actions={options}
          buttonSize="small"
          buttonType={buttonType}
          title={value as string}
        />
      ) : null}
    </>
  )
}

interface ITableActionComponent {
  tableAction: ITableAction | undefined
  handleTableAction: (() => void) | undefined
  admin?: boolean
}

export const TableActionComponent: FC<ITableActionComponent> = ({
  tableAction,
  handleTableAction,
  admin,
}) => {
  const isTableAction = !!tableAction?.selectedItems?.[0]
  return (
    <div
      style={{
        borderBottom: !admin ? `1px solid #f1f1f1` : "",
        position: "sticky",
        left: 0,
      }}
      className={`${!admin ? "px-3" : ""} pb-3 d-flex align-items-center`}
    >
      <div className="f-row-20 align-items-center">
        <TypeSelect
          initoption={{ label: "Select action", value: "" }}
          optionsdata={Object.values(tableAction?.actionEnums || {}).map(
            (i, index) => ({
              id: index,
              label: i + "",
              value: i + "",
            })
          )}
          disabled={!isTableAction}
          value={tableAction?.action || ""}
          style={{
            width: "150px",
            height: "40px",
            fontSize: "13px",
            outline: "0",
          }}
          onChange={({ target }) => {
            const { value } = target
            tableAction?.setAction?.(value)
          }}
        />
        <TypeButton
          title="Proceed"
          buttonType={isTableAction ? "outlined" : "disabled"}
          onClick={handleTableAction}
          disabled={!isTableAction}
          buttonSize="small"
        />
      </div>
    </div>
  )
}

export interface IResultTable {
  header: string[]
  record: IMiniTableRecord[]
  currentPage?: number
  hideNumbering?: boolean
  tableAction?: ITableAction
  handleTableAction?: () => void
  lastCardElementRef?: (node: any) => void
  ctaComponent?: JSX.Element | null
  hideAction?: boolean
  rowErrorMessage?: string[]
}
