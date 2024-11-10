/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TypeCheckbox } from '../checkbox'
import { SortSVG } from '../svgs'
import { FC } from 'react'
import {
  CellValueActionComponent,
  CellValueComponent,
  ITableAction,
  ITableRecord,
  TableActionComponent
} from './utils'
import styled from 'styled-components'

const PAGE_SIZE = 10

interface IResultTable {
  header: string[]
  record: ITableRecord[]
  currentPage?: number
  hideNumbering?: boolean
  tableAction?: ITableAction
  handleTableAction?: () => void
  lastCardElementRef?: (node: any) => void
  ctaComponent?: JSX.Element | null
  noBulkAction?: boolean
  sortBy?: (tableHeaderItem: string) => void
  tableHeaderSortBy?: string
}

const Table: FC<IResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
  tableAction,
  handleTableAction,
  lastCardElementRef,
  ctaComponent,
  noBulkAction,
  sortBy,
  tableHeaderSortBy
}) => {
  const isRecord = record?.length > 0
  const isCheckedRow = (id: string) => {
    return !!tableAction?.selectedItems?.includes?.(id)
  }

  const hideCheck =
    !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0]

  const selectedAll =
    tableAction?.selectedItems !== null &&
    tableAction?.selectedItems?.length === record?.length

  const isCTA = !!ctaComponent

  const handleSelectAll = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target
    if (checked) {
      const ids = record.map((i) => i.id)
      tableAction?.setSelectedItems?.(ids)
    } else {
      tableAction?.setSelectedItems?.(null)
    }
  }

  const handleSelect = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    i: ITableRecord
  ) => {
    const { checked } = target
    if (checked) {
      const ids = tableAction?.selectedItems || []
      ids.push(i.id)
      tableAction?.setSelectedItems?.([...ids])
    } else {
      const ids = tableAction?.selectedItems || []
      const index = ids.indexOf(i.id)
      if (index >= 0) {
        ids.splice(index, 1)
        tableAction?.setSelectedItems?.([...ids])
      }
    }
  }

  const isSortBy = typeof sortBy === 'function'

  return (
    <TableStyle>
      <div className="table-container rounded">
        {!hideCheck && !noBulkAction ? (
          <TableActionComponent
            tableAction={tableAction}
            handleTableAction={handleTableAction}
          />
        ) : null}
        {!isRecord ? null : (
          <table className="reportTable">
            <thead className="thead_blue position-relative">
              <tr
                style={{
                  position: 'sticky',
                  top: 0,
                  background: '#fff'
                }}
              >
                {!hideNumbering && <th></th>}
                {header.map((i, index) => {
                  if (index === 0) {
                    return (
                      <th key={index}>
                        <div className="f-row align-items-center">
                          {!hideCheck && (
                            <div style={{ marginRight: 25 }}>
                              <TypeCheckbox
                                onChange={handleSelectAll}
                                checked={selectedAll}
                              />
                            </div>
                          )}
                          <div
                            className="f-row-11 align-items-center"
                            style={{
                              color: tableHeaderSortBy === i ? 'green' : ''
                            }}
                            onClick={() => sortBy?.(i)}
                          >
                            {i}{' '}
                            {isSortBy ? (
                              <SortSVG
                                width="7"
                                fill={
                                  tableHeaderSortBy === i ? 'green' : '#757575'
                                }
                              />
                            ) : null}
                          </div>
                        </div>
                      </th>
                    )
                  } else {
                    return (
                      <th key={index}>
                        <div
                          className="f-row-11 align-items-center"
                          style={{
                            color: tableHeaderSortBy === i ? 'green' : ''
                          }}
                          onClick={() => sortBy?.(i)}
                        >
                          {i}{' '}
                          {isSortBy && !i?.toLowerCase().includes('action') ? (
                            <SortSVG
                              width="7"
                              fill={
                                tableHeaderSortBy === i ? 'green' : '#757575'
                              }
                            />
                          ) : null}
                        </div>
                      </th>
                    )
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {isRecord &&
                record.map((i, jindex) => (
                  <tr
                    key={jindex}
                    className={i.isSelected ? `selected-table-row` : ''}
                    ref={
                      jindex + 1 === record.length ? lastCardElementRef : null
                    }
                  >
                    {!hideNumbering && (
                      <td style={{ padding: '10px 0px 10px 10px' }}>
                        <p style={{ margin: 0, fontSize: '11px' }}>
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
                                display: 'flex',
                                alignItems: 'center',
                                minHeight: '35px'
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
                          <td key={index}>
                            <CellValueComponent {...j} />
                          </td>
                        )
                      }
                    })}
                    {i?.rowActions?.length ? (
                      <td>
                        <div className="table-cell-action">
                          {i?.rowActions?.map((j, index) => (
                            <CellValueActionComponent
                              key={index}
                              {...j}
                              nomargin={
                                index === (i?.rowActions?.length || 0) - 1
                                  ? 'true'
                                  : 'false'
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
      </div>
    </TableStyle>
  )
}

export default Table

const TableStyle = styled.div`
  width: 100%;
  .table-container {
    overflow-y: visible;
    overflow-x: auto;
    width: 100%;
    min-width: 1088px;
    overflow: auto;
    max-height: 65vh;
    // min-height: 65vh;
    .no-data {
      color: #a1a1a1;
      font-size: 0.8625rem;
    }
    .reportTable {
      border-collapse: separate;
      border-spacing: 0 1px;
      border: 1px solid #f2f2f2;
      padding: 0 10px;
      width: 100%;
      height: 100%;
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
        height: max-content;
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
          background: #a1a1a1;
        }
      }
      tbody tr:hover {
        background: #f2faef;
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
