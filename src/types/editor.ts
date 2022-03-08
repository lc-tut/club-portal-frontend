import type { UseFormReturn } from "react-hook-form"

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
}

export type EditorBaseProps = {
  onSubmit: Pick<UseFormReturn, "handleSubmit">
}

export type EditorSelectOptionItem = {
  value: string
  label: string
}
