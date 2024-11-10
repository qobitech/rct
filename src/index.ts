import "bootstrap/dist/css/bootstrap.min.css"
import "./index.scss"

export { ActionItem } from "./components/action/item"
export { ActionIcon } from "./components/action/icon"
export { ActionComponent } from "./components/action-component"
export { BreadCrumb } from "./components/bread-crumb"
export { TypeButton } from "./components/button"
export { btnSize, btnType } from "./components/button/interface"
export { TypeCheckbox } from "./components/checkbox"
export {
  FormBuilder,
  IFormComponent,
  typecomponent,
} from "./components/form-builder"
export { TypeInput } from "./components/input"
export { TypeInputSearch } from "./components/input-search"
export { MiniTable } from "./components/mini-table"
export { useTableAction } from "./components/mini-table/hooks"
export { NotificationModal } from "./components/new-modal"
export { useModal } from "./components/new-modal/hook"
export { MultipleMediaUploadComponent } from "./components/multiple-upload-document"
export { TypeInputOTP } from "./components/otp"
export { PaginationComponent } from "./components/pagination"
export { PillComponent, IPillData } from "./components/pills"
export { RightSection } from "./components/right-section"
export { useRightSection } from "./components/right-section/hooks"
export {
  IGetCTA,
  IRSAction,
  ICallSection,
  IGlobalRightSection,
  IRSection,
  IRightSection,
  IRightSectionHistory,
  IRsPropsCTA,
  actionComponent,
  actionType,
} from "./components/right-section/interface"
export { TypeSelect } from "./components/select"
export {
  TabSection,
  TabBlockComponent,
  TabComponent,
} from "./components/tab-section"
export { useTabSection } from "./components/tab-section/hooks"
export { ITabComponentProp, IUseTab } from "./components/tab-section/interface"
export { TabToggler } from "./components/tab-toggler"
export { useTabToggler } from "./components/tab-toggler/hooks"
export {
  ITabToggesOption,
  IUseTabToggler,
} from "./components/tab-toggler/interface"
export { TypeTextArea } from "./components/text-area"
export { useCountDown } from "./components/timer"
export {
  HVC,
  HVCLoad,
  OverViewHeader,
  CardItems,
  DropDownMenu,
  SeparatorComponent,
  RefreshComponent,
  MediaItem,
  SelectItem,
} from "./components/components"
export {
  _handleTh,
  _separator,
  _joiner,
  _removeHTML,
  _getRanking,
  _generateUUID,
  _getSlug,
  _reverseSlug,
  _replaceObjects,
  _copyObjectsWithUniqueId,
  _wordVariation,
  _handleScroll,
  _handleScrollRightSection,
  _getAmount,
  _getMYear,
  _getDayMonth,
  _previewMediaFile,
  _concatenateUnique,
  _formatBytes,
  _formatDate,
  _isMobile,
} from "./components/helper"
export {
  useUploadFileHook,
  useFormHook,
  useToggler,
  useCallAPI,
  useCopy,
  useDebounce,
  useGetMediaUrl,
  useImage,
  useImageDetails,
  useImageSize,
  useInfiniteScroll,
  useOnLoadImages,
  useShare,
  useStateHook,
  reducer,
  ICardItem,
  ICopyProps,
  IDropDownItem,
  IImgSize,
  IModalProps,
  IRTI,
  IRefreshProps,
  IUseImage,
} from "./components/hooks"
