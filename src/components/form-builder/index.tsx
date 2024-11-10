import React from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { TypeInput } from '../input'
import { TypeSelect } from '../select'
import { TypeCheckbox } from '../checkbox'
import { TypeTextArea } from '../text-area'
import { HVC } from '../components'
import { IRefreshProps } from '../hooks'
import OTPInput from '../otp'

export type typecomponent =
  | 'input'
  | 'select'
  | 'text-area'
  | 'radio'
  | 'check-box'
  | 'password'
  | 'otp'

interface ISelectOptions {
  id: number
  label: string
  value: string | number
}

export interface IFormComponent {
  id: string
  label?: string
  placeHolder?: string
  type?: string
  component: typecomponent
  initOptions?: ISelectOptions
  optionData?: ISelectOptions[]
  isonlyview?: boolean
  disabled?: boolean
  hide?: boolean
  text?: string
  cta?: {
    text: string
    link: string
    type: 'external' | 'internal'
  }
  refreshProps?: IRefreshProps
  className?: string
  min?: string
  value?: string | number | readonly string[] | undefined
  name?: string | undefined
  onPauseChange?: (callBack: () => void) => void
}

interface IFormBuilder<T extends FieldValues> {
  formComponent: IFormComponent[]
  hookForm: UseFormReturn<T, any>
  min?: boolean
}

const FormBuilder = <T extends FieldValues>({
  formComponent,
  hookForm,
  min
}: IFormBuilder<T>) => {
  return (
    <>
      {formComponent.map((i) => (
        <HVC removeDOM view={!i.hide} key={i.id} className={i.className}>
          {i.component === 'input' && (
            <TypeInput
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              type={i.type}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
              isonlyview={i.isonlyview}
              disabled={i.disabled || i.isonlyview}
              className={i.className}
              min={i.min}
              minComponent={min}
            />
          )}
          {i.component === 'otp' && (
            <OTPInput
              onChange={(otp) => {
                hookForm.setValue(i.id as Path<T>, otp as PathValue<T, Path<T>>)
              }}
              label={i.label}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
            />
          )}
          {i.component === 'select' && (
            <TypeSelect
              initoption={i.initOptions as ISelectOptions}
              optionsdata={i.optionData as ISelectOptions[]}
              customwidth={'100%'}
              label={i.label}
              refreshProps={i.refreshProps}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
              onChange={(e) => {
                const handleChange = (
                  e: React.ChangeEvent<HTMLSelectElement>
                ) => {
                  hookForm.setError(i.id as Path<T>, {
                    message: ''
                  })
                  if (!e.target.value) {
                    hookForm.setError(i.id as Path<T>, {
                      message: i.id + ' is missing'
                    })
                  }
                  hookForm.setValue(i.id as Path<T>, e.target.value as any)
                }
                if (typeof i.onPauseChange === 'function') {
                  i?.onPauseChange?.(() => {
                    handleChange(e)
                  })
                } else {
                  handleChange(e)
                }
              }}
              value={hookForm.watch(i.id as Path<T>)}
              className={i.className || ''}
              minComponent={min}
            />
          )}
          {i.component === 'text-area' && (
            <TypeTextArea
              {...hookForm.register(i.id as Path<T>)}
              placeholder={i.placeHolder}
              label={i.label}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
              className={i.className}
            />
          )}
          {i.component === 'check-box' && (
            <div className="f-row-10 align-items-center">
              <TypeCheckbox
                {...hookForm.register(i.id as Path<T>)}
                error={
                  hookForm.formState.errors?.[i.id as Path<T>]
                    ?.message as string
                }
              />
              <label className="m-0 text-little color-label">{i.label}</label>
            </div>
          )}
          {i.component === 'radio' && (
            <div className="f-row-10 align-items-center">
              <TypeInput
                type="radio"
                {...hookForm.register(i.name as Path<T>)}
                value={i.value}
                error={
                  hookForm.formState.errors?.[i.id as Path<T>]
                    ?.message as string
                }
                minComponent={min}
              />
              <label className="m-0 text-little color-label">{i.label}</label>
            </div>
          )}
        </HVC>
      ))}
    </>
  )
}

export default FormBuilder
