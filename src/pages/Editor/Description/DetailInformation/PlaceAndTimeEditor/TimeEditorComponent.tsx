import { HStack, Spacer } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import {
  EditorNumberInput,
  EditorSelect,
  EditorSwitch,
  EditorText,
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
    label: "-",
  })
  for (const key in dateDisplayNameMap) {
    options.push({
      value: key,
      label: dateDisplayNameMap[key],
    })
  }

  return (
    <EditorSelect
      label="曜日"
      options={options}
      value={props.inputData.date}
      onChange={(e) => {
        updateInputData(
          { ...props.inputData, date: e.target.value },
          props.setInputData
        )
      }}
    />
  )
}

export const TimeInput: React.VFC<InputElementProps> = (props) => {
  function handleOnChange(
    position: "startTime" | "endTime",
    unit: "hours" | "minutes",
    value: number
  ) {
    const newInputData = { ...props.inputData }
    newInputData[position][unit] = value
    props.setInputData(newInputData)
  }

  return (
    <HStack textColor="text.main">
      <EditorNumberInput
        label="開始時間"
        min={0}
        max={23}
        defaultValue={19}
        width="5rem"
        onChange={(dummy: string, value: number) =>
          handleOnChange("startTime", "hours", value)
        }
        isDisabled={props.inputData.isTimeOthers}
      />
      <EditorText>:</EditorText>
      <EditorNumberInput
        label=""
        min={0}
        max={59}
        defaultValue={0}
        width="5rem"
        onChange={(dummy: string, value: number) =>
          handleOnChange("startTime", "minutes", value)
        }
        isDisabled={props.inputData.isTimeOthers}
      />
      <EditorText>~</EditorText>
      <EditorNumberInput
        label="終了時間"
        min={0}
        max={23}
        defaultValue={19}
        width="5rem"
        onChange={(dummy: string, value: number) =>
          handleOnChange("endTime", "hours", value)
        }
        isDisabled={props.inputData.isTimeOthers}
      />
      <EditorText>:</EditorText>
      <EditorNumberInput
        label=""
        min={0}
        max={59}
        defaultValue={0}
        width="5rem"
        onChange={(dummy: string, value: number) =>
          handleOnChange("endTime", "minutes", value)
        }
        isDisabled={props.inputData.isTimeOthers}
      />
      <Spacer w="0.5rem" />
      <EditorSwitch
        label="時間を「その他」にする"
        isChecked={props.inputData.isTimeOthers}
        onChange={(e) => {
          updateInputData(
            {
              ...props.inputData,
              isTimeOthers: e.target.checked,
            },
            props.setInputData
          )
        }}
      />
    </HStack>
  )
}
