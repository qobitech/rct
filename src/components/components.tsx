import {
  AlertSVG,
  CheckSVG,
  CopySVG,
  ElectionSVG,
  PulseSVG,
  RefreshSVG
} from './svgs'
import { TypeButton } from './button'
import {
  ICardItem,
  IDropDownItem,
  IRefreshProps,
  IRTI,
  useCopy,
  useGetMediaUrl,
  useImage
} from './hooks'
import { FC } from 'react'

interface IHVC
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  view: boolean
  children?: React.ReactNode
  removeDOM?: boolean
  load?: boolean
  auth?: boolean
}

export const HVC: FC<IHVC> = ({
  view,
  children,
  className = '',
  removeDOM = false,
  load = false,
  auth = false,
  ...props
}) => {
  if (load) return <PulseSVG />

  if (removeDOM) {
    if (view) {
      return (
        <div className={className} {...props}>
          {children}
        </div>
      )
    } else if (auth) {
      return <AuthorizedPage />
    }
    return null
  }

  return (
    <div className={`${!view ? 'd-none' : ''} ${className}`} {...props}>
      {children}
    </div>
  )
}

interface IHVCLoad
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  view?: boolean
  children?: any
  removeDOM?: boolean
  load?: boolean
  loadTxt?: string
}
export const HVCLoad: FC<IHVCLoad> = ({
  view,
  children,
  className,
  removeDOM,
  load,
  loadTxt,
  ...props
}) => {
  if (load)
    return (
      <div className="f-row-10 aic hw-mx">
        <PulseSVG />
        {loadTxt ? <p className="m-0 text-little">{loadTxt}</p> : null}
      </div>
    )

  if (removeDOM)
    return (
      <>
        {view ? (
          <div className={`${className}`} {...props}>
            {children}
          </div>
        ) : null}
      </>
    )

  return (
    <div className={`${view ? '' : 'd-none'} ${className}`} {...props}>
      {children}
    </div>
  )
}

const AuthorizedPage = () => {
  return (
    <div className="f-row-10 align-items-center">
      <AlertSVG />
      <p className="m-0 text-danger">
        You are not authorized to view this page
      </p>
    </div>
  )
}

export const OverViewHeader = ({
  title,
  moreInfo,
  onMoreInfo,
  isInfo
}: {
  title: string
  moreInfo?: boolean
  isInfo?: boolean
  onMoreInfo?: () => void
}) => {
  return (
    <p className="text-little mb-2 color-label" style={{ color: '#616161' }}>
      {title}{' '}
      {moreInfo ? (
        <span onClick={onMoreInfo}>
          <i className={`fas fa-${isInfo ? 'minus' : 'info'}-circle ml-2`} />
        </span>
      ) : null}
    </p>
  )
}

export const CardItems = ({
  title,
  value,
  url,
  onUrlClick,
  copy
}: ICardItem) => {
  const copyProps = useCopy()
  const onCopy = () => {
    copyProps.copy(value as string)
  }
  function isValidURL(str: string) {
    try {
      // eslint-disable-next-line no-new
      new URL(str)
      return true
    } catch (e) {
      return false
    }
  }
  const valueToURL = () => {
    if (typeof value === 'string' && isValidURL(value))
      return value.replace(/www./g, 'https://')
    return `https://google.com/search?q=${value}`
  }
  return (
    <>
      <div className="bet-chnnel-item-wrapper">
        <OverViewHeader title={title} />
        <div className="f-row-7 align-items-center item-value gap-7">
          {!url ? (
            <p className="text-medium m-0">{value}</p>
          ) : (
            <p
              className="text-medium cursor-pointer m-0"
              onClick={() => {
                onUrlClick?.()
                window.open(valueToURL(), '_blank')
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {value}
            </p>
          )}
          {copy ? (
            <div className="hw-max cursor-pointer" onClick={onCopy}>
              {copyProps?.copySuccess ? (
                <CheckSVG color="green" />
              ) : (
                <CopySVG />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export const DropDownMenu = ({
  id,
  items,
  dropDownIcon,
  children
}: {
  id: string
  items: IDropDownItem[]
  dropDownIcon?: string
  children?: any
}) => {
  return (
    <div className="dropdown">
      <div
        className="dropdown-toggle cursor-pointer"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {children}
        {!children && (
          <i
            className={`${dropDownIcon || 'fas fa-angle-down'} color-primary`}
          />
        )}
      </div>
      <ul className="dropdown-menu dm-menu" aria-labelledby={id}>
        {items.map((i, index) => (
          <li
            className="dropdown-item d-flex py-2 text-little"
            onClick={i.disabled ? undefined : i.action}
            key={index}
            style={{
              color: i.disabled ? '#a1a1a1' : '',
              cursor: i.disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {i?.icon && (
              <span style={{ width: '25px' }} className="d-block">
                <i className={i?.icon} />
              </span>
            )}
            {i.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const SeparatorComponent = () => (
  <div style={{ width: '1px', height: '10px', background: '#cacaca' }} />
)

export const RefreshComponent = ({ load, onRefresh, text }: IRefreshProps) => {
  return (
    <div
      className="text-center cursor-pointer f-row-7 align-items-center justify-content-center hw-mx"
      onClick={onRefresh}
    >
      {text ? <p className="m-0 font-12 color-label">{text}</p> : null}
      <div style={{ width: '25px' }} className="f-row align-items-center">
        {load ? <PulseSVG /> : <RefreshSVG />}
      </div>
    </div>
  )
}

export const MediaItem = ({ url }: { url: string }) => {
  const imgProps = useImage()
  const { mediaUrl } = useGetMediaUrl(url, imgProps)

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      {mediaUrl.load ? (
        <PulseSVG />
      ) : mediaUrl.type === 'image' ? (
        <img
          src={mediaUrl.url}
          alt=""
          style={{ objectFit: 'contain' }}
          className="w-100 h-100"
        />
      ) : mediaUrl.type === 'doc' ? (
        <iframe
          src={mediaUrl.url.replace('?dl=0', '?raw=1')}
          width={'100%'}
          height={'100%'}
          title="firefighter"
          // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      ) : null}
    </div>
  )
}

export const SelectItem = ({
  title,
  description,
  isActive,
  onProceed,
  onSelect,
  disabled
}: IRTI) => {
  return (
    <div
      className={`rounded p-4 f-row-10 align-items-start result-item-type ${
        isActive ? 'active' : ''
      }`}
      onClick={!isActive ? onSelect : undefined}
    >
      <div className="f-row-10 align-items-center">
        <ElectionSVG />
      </div>
      <div className="f-column-15">
        <h6 className={`m-0 ${disabled ? 'color-label' : ''}`}>{title}</h6>
        <p className={`m-0 text-little ${disabled ? 'color-label' : ''}`}>
          {description}
        </p>
        <HVC removeDOM view={isActive || false} className="mt-3">
          <TypeButton
            title="Proceed"
            buttonSize="small"
            onClick={onProceed}
            disabled={disabled}
            buttonType={disabled ? 'disabled' : 'bold'}
          />
        </HVC>
      </div>
    </div>
  )
}
