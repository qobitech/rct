import React, { FC } from 'react'

export interface IPillData {
  label: string
  filterValue: string
}

interface IPill {
  pills: IPillData[]
  filterValues: string[]
  onClickPill?: (filterValue: string) => void
}

export const PillComponent: FC<IPill> = ({
  pills,
  filterValues,
  onClickPill
}) => {
  const isSelected = (value: string) =>
    filterValues.includes(value) ? 'selected' : ''

  return (
    <div className="f-row-13 flex-wrap">
      {pills?.map((pill, index) => (
        <div
          key={index}
          className={`game-event-pill ${isSelected(pill.filterValue)}`}
          onClick={() => onClickPill?.(pill.filterValue)}
        >
          <p className="text-tiny m-0">{pill.label}</p>
        </div>
      ))}
    </div>
  )
}
