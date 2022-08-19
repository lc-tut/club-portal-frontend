import type { Dispatch } from "react"
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
  onClick?: () => void
  paddingTop?: string
  type?: "submit"
}

export type EditorSelectOptionItem = {
  displayName: string
  value: string
}

export type TimePlaceInputProps = {
  state: TimePlaceStateType
  dispatch: Dispatch<TimePlaceActionType>
}
