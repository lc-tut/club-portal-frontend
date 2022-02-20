import { HStack, Select, Spacer, Switch } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import {
  EditorText,
  EditorNumberInput,
  EditorSelect,
  EditorSwitch
} from "../../../../../components/common/Editor/EditorInput"
import { EditorSelectOptionItem } from "../../../../../types/editor"
import { PlaceAndTimeItem, updateInputData } from "./PlaceAndTimeEditor"

export type Time = {
  hours: number
  minutes: number
}

export const dateDisplayNameMap: { [key in string]: string } = {
  mon: "月",
  tue: "火",
  wed: "水",
  thu: "木",
  fri: "金",
  sat: "土",
  sun: "日",
}

type InputElementProps = {
  inputData: PlaceAndTimeItem
  setInputData: Dispatch<SetStateAction<PlaceAndTimeItem>>
}

export const DateSelect: React.VFC<InputElementProps> = (props) => {
  const options: Array<EditorSelectOptionItem> = []
  options.push({
    value: "",
    label: "-"
  })
  for (const key in dateDisplayNameMap) {
    options.push({
      value: key,
      label: dateDisplayNameMap[key]
    })
  }

  return (
    <EditorSelect
      label=""
      options={options}
    />
  )
}

export const TimeInput: React.VFC<InputElementProps> = (props) => {
  return (
    <HStack textColor="text.main">
      <EditorNumberInput label="開始時間" min={0} max={23} width="5rem" />
      <EditorText>:</EditorText>
      <EditorNumberInput label="" min={0} max={59} width="5rem" />
      <EditorText>~</EditorText>
      <EditorNumberInput label="終了時間" min={0} max={23} width="5rem" />
      <EditorText>:</EditorText>
      <EditorNumberInput label="" min={0} max={59} width="5rem" />
      <Spacer w="0.5rem" />
      <EditorSwitch label="時間を「その他」にする" />
    </HStack>
  )
}
