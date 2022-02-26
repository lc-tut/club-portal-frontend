import { Dispatch, SetStateAction } from "react"
import { EditorTextInput } from "../../../../../components/common/Editor/EditorInput"
import { PlaceAndTimeItem } from "./PlaceAndTimeEditor"

type RemarkInputProps = {
  label: string
  remarkKey: "placeRemark" | "timeRemark"
  inputData: PlaceAndTimeItem
  setInputData: Dispatch<SetStateAction<PlaceAndTimeItem>>
}

export const RemarkInput: React.VFC<RemarkInputProps> = (props) => {
  return (
    <EditorTextInput
      label={props.label}
      value={props.inputData[props.remarkKey]}
      onChange={(e) => {
        const newInputData = { ...props.inputData }
        newInputData[props.remarkKey] = e.target.value
        props.setInputData(newInputData)
      }}
    />
  )
}
