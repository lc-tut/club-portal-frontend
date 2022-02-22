import { HStack } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import {
  EditorNumberInput,
  EditorSelect,
} from "../../../../../components/common/Editor/EditorInput"
import { BUILDING_ID_MAP } from "../../../../../static/consts"
import { EditorSelectOptionItem } from "../../../../../types/editor"
import { PlaceAndTimeItem } from "./PlaceAndTimeEditor"

export type Place = {
  buildingId: number
  roomNumber: number
}

type PlaceInputProps = {
  inputData: PlaceAndTimeItem
  setInputData: Dispatch<SetStateAction<PlaceAndTimeItem>>
}

export const PlaceInput: React.VFC<PlaceInputProps> = (props) => {
  const options: Array<EditorSelectOptionItem> = []
  options.push({
    value: "-1",
    label: "-",
  })
  for (const key in BUILDING_ID_MAP) {
    options.push({
      value: key.toString(),
      label: BUILDING_ID_MAP[key],
    })
  }

  return (
    <HStack>
      <EditorSelect
        width="10rem"
        label="活動場所"
        options={options}
        value={props.inputData.place.buildingId}
        onChange={(e) => {
          const newInputData = { ...props.inputData }
          newInputData.place.buildingId = parseInt(e.target.value)
          props.setInputData(newInputData)
        }}
      />
      <EditorNumberInput
        width="8rem"
        label="部屋番号"
        min={0}
        max={999999}
        value={props.inputData.place.roomNumber}
        onChange={(dummy: string, value: number) => {
          const newInputData = { ...props.inputData }
          newInputData.place.roomNumber = value
          props.setInputData(newInputData)
        }}
        isDisabled={false}
      />
    </HStack>
  )
}
