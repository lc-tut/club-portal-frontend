import type {
  InputProps,
  SelectProps,
  SwitchProps,
  NumberInputProps,
} from "@chakra-ui/react"
import type { Dispatch } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import type { TimePlaceActionType, TimePlaceStateType } from "./reducer"

export type EditorMenuProps = {
  items: {
    content: string
    to: string
    isNotAvailable?: boolean
    remark?: string
  }[]
}

export type EditorMenuButtonProps = {
  to: string
  isNotAvailable?: boolean
  remark?: string
}

export type EditorButtonProps = {
  icon: "add" | "remove"
  onClick: () => void
  paddingTop?: string
}

export type EditorSelectOptionItem = {
  displayName: string
  value: string
}

type CommonEditorControlledProps = UseFormRegisterReturn & {
  isInvalid: boolean
}

export type EditorTextInputProps = CommonEditorControlledProps &
  Pick<InputProps, "width" | "value" | "onChange"> & {
    label: string
  }

export type EditorSelectProps = CommonEditorControlledProps &
  Pick<SelectProps, "width"> & {
    label: string
    options: Array<EditorSelectOptionItem>
  }

export type EditorSwitchProps = CommonEditorControlledProps &
  Pick<SwitchProps, "isChecked"> & {
    label: string
  }

export type EditorNumberInputProps = CommonEditorControlledProps &
  Pick<NumberInputProps, "defaultValue" | "width" | "isDisabled"> & {
    label: string
  }

export type EditorInputProps = CommonEditorControlledProps & {
  label: string
  element: JSX.Element
}

export type TimePlaceInputProps = {
  state: TimePlaceStateType
  dispatch: Dispatch<TimePlaceActionType>
}
