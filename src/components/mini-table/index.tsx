/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from "react"
import { TypeCheckbox } from "../checkbox"
import { HVC } from "../components"
import TextPrompt from "../text-prompt"
import styled from "styled-components"
import {
  CellValueActionComponent,
  CellValueComponent,
  IMiniTableRecord,
  IResultTable,
  TableActionComponent,
} from "./utils"

const PAGE_SIZE = 10

export const MiniTable: React.FC<IResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
  tableAction,
  handleTableAction,
  lastCardElementRef,
  ctaComponent,
  hideAction,
  rowErrorMessage,
}) => {
  const isRecord = record?.length > 0
  const isCheckedRow = (id: string) => {
    return !!tableAction?.selectedItems?.includes?.(id.toString())
  }

  const hideCheck =
    !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0]

  const selectedAll = useMemo(
    () =>
      tableAction?.selectedItems !== null &&
      tableAction?.selectedItems?.length === record?.length,
    [record?.length, tableAction?.selectedItems]
  )

  const isCTA = !!ctaComponent

  const handleSelectAll = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target
    if (checked) {
      const ids = record.map((i) => i.id.toString())
      tableAction?.setSelectedItems?.(ids)
    } else {
      tableAction?.setSelectedItems?.(null)
    }
  }

  const handleSelect = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    i: IMiniTableRecord
  ) => {
    const { checked } = target
    if (checked) {
      const ids = tableAction?.selectedItems || []
      ids.push(i.id.toString())
      tableAction?.setSelectedItems?.([...ids])
    } else {
      const ids = tableAction?.selectedItems || []
      const index = ids.indexOf(i.id.toString())
      if (index >= 0) {
        ids.splice(index, 1)
        tableAction?.setSelectedItems?.([...ids])
      }
    }
  }

  return (
    <TableClass>
      <div className="table-container-mini">
        <HVC removeDOM view={!hideCheck && !hideAction}>
          <TableActionComponent
            tableAction={tableAction}
            handleTableAction={handleTableAction}
          />
        </HVC>
        {!isRecord ? null : (
          <table className="reportTable">
            <thead className="thead_blue position-relative">
              <tr
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                }}
              >
                {!hideNumbering && <th></th>}
                {header.map((i, index) => {
                  if (index === 0) {
                    return (
                      <th key={index} className="f-row">
                        <div className="f-row">
                          <HVC
                            removeDOM
                            view={!hideCheck}
                            style={{ marginRight: 25 }}
                          >
                            <TypeCheckbox
                              onChange={handleSelectAll}
                              checked={selectedAll}
                            />
                          </HVC>

                          {i}
                        </div>
                      </th>
                    )
                  } else {
                    return <th key={index}>{i}</th>
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {isRecord &&
                record.map((i, jindex) => (
                  <tr
                    key={jindex}
                    className={`${i.isSelected ? `selected-table-row` : ""} ${
                      i.rowError ? "row-error" : ""
                    }`}
                    ref={
                      jindex + 1 === record.length ? lastCardElementRef : null
                    }
                  >
                    {!hideNumbering && (
                      <td style={{ padding: "10px 0px 10px 10px" }}>
                        <p style={{ margin: 0 }}>
                          {jindex + 1 + ((currentPage || 1) - 1) * PAGE_SIZE}
                        </p>
                      </td>
                    )}
                    {i?.row?.map((j, index) => {
                      if (index === 0) {
                        return (
                          <td
                            key={index}
                            // width={`${100 / header.length}%`}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                minHeight: "35px",
                              }}
                            >
                              {!hideCheck && (
                                <div style={{ marginRight: 25 }}>
                                  <TypeCheckbox
                                    onChange={(e) => handleSelect(e, i)}
                                    checked={selectedAll || isCheckedRow(i.id)}
                                    id={i.id}
                                  />
                                </div>
                              )}
                              <CellValueComponent {...j} />
                            </div>
                          </td>
                        )
                      } else {
                        return (
                          <td
                            key={index}
                            // width={`${100 / header.length}%`}
                          >
                            <CellValueComponent {...j} />
                          </td>
                        )
                      }
                    })}
                    {i?.rowActions?.length ? (
                      <td
                      // width={`${100 / header.length}%`}
                      >
                        <div className="table-cell-action">
                          {i?.rowActions?.map((j, index) => (
                            <CellValueActionComponent
                              key={index}
                              {...j}
                              nomargin={
                                index === (i?.rowActions?.length || 0) - 1
                                  ? "true"
                                  : "false"
                              }
                            />
                          ))}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {!isRecord ? (
          <>
            {isCTA ? (
              ctaComponent
            ) : (
              <p className="margin-auto text-center py-4 font-small no-data">
                No Data
              </p>
            )}
          </>
        ) : null}
        <div className="f-column-23 align-items-center py-4">
          {rowErrorMessage?.map((i, index) => (
            <TextPrompt status={false} prompt={i} key={index} />
          ))}
        </div>
      </div>
    </TableClass>
  )
}

const TableClass = styled.div`
  width: 100%;
  .table-container-mini {
    width: 100%;
    overflow: auto;
    min-height: 30px;
    .no-data {
      color: #a1a1a1;
      font-size: 0.8625rem;
    }
    .reportTable {
      border-collapse: separate;
      border-spacing: 0 1px;
      border: 0px solid #f2f2f2;
      padding: 0 10px;
      width: 100%;
      padding: 0;
      background: none;

      tr {
        border-radius: 6px;
        display: table-row;
        text-align: left;
      }
      td,
      th {
        border: none;
        display: table-cell;
        vertical-align: middle;
        padding: 4px 2px 4px 15px;
        border-bottom: 1px solid #f2f2f2;
      }
      th {
        color: #000;
        font-size: 0.7125rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: capitalize !important;
        white-space: nowrap;
        text-transform: uppercase !important;
        border-top: 1px solid #f7faff;
        padding: 1rem 0.1rem 1rem 15px;
      }
      td {
        color: #2c2c2c;
        font-size: 0.675rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .thead_blue {
        background-color: #fff;
        color: #101010;
        min-width: 100%;
        margin: 0;
        z-index: 1;
      }
      tbody tr {
        background-color: none;
        &.selected-table-row {
          background: #f2faef;
        }
        &.row-error {
          background: #ffdce8;
        }
      }
      tbody tr:hover {
        background: #fafef8;
        &.row-error {
          background: #ffdce8;
        }
      }
      .notactive {
        background-color: none !important;
        box-shadow: none !important;
      }
      .tel_input {
        height: 52px !important;
        font-size: 16px !important;
      }
      .tel_input input {
        height: 100% !important;
        max-width: 310px !important;
        width: 100% !important;
        border: 1px solid darkgrey !important;
      }
    }
    .table-cell-action {
      display: flex;
      gap: 10px;
    }
  }

  .bulk-action {
    .type-select .form-container,
    .type-input .form-container {
      margin-bottom: 0;
    }
  }

  .table-action {
    border-bottom: 1px solid #f2f2f2;
  }
`
