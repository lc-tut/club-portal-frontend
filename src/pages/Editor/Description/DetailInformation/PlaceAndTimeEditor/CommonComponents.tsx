import { Stack } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { EditorTextInput } from "../../../../../components/common/Editor/EditorInput"
import { PlaceAndTimeItem } from "./PlaceAndTimeEditor"

type RemarkInputProps = {
  label: string
  inputData: PlaceAndTimeItem
  setInputData: Dispatch<SetStateAction<PlaceAndTimeItem>>
}

export const RemarkInput: React.VFC<RemarkInputProps> = (props) => {
  return (
    <Stack spacing="0">
      <EditorTextInput label={props.label} />
    </Stack>
  )
}
