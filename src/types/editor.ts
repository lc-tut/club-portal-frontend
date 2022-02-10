import { Dispatch, SetStateAction } from "react"

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
  icon: "add" | "remove",
  onClick: ()=>void
}

export type ActivityEditorProps = {
  items: string[]
  setItems: Dispatch<SetStateAction<string[]>>
}

export type DatetimeItem = {
  date: string
  time: string
  remarks?: string
}

export type DatetimeEditorProps = {
  items: DatetimeItem[]
  setItems: Dispatch<SetStateAction<DatetimeItem[]>>
}

export type PlaceItem = {
  place: string
  remarks?: string
}

export type PlaceEditorProps = {
  items: PlaceItem[]
  setItems: Dispatch<SetStateAction<PlaceItem[]>>
}