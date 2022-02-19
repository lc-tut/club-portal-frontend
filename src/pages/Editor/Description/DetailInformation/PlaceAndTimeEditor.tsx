import { Stack } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { EditorButton } from "../../../../components/common/Editor/EditorButton"

type Time = {
  hours: number
  minutes: number
}

export type PlaceAndTimeItem = {
  date: string
  startTime: Time
  endTime: Time
  place: string
  timeRemark?: string
  placeRemark?: string
}

type PlaceAndTimeEditorProps = {
  items: PlaceAndTimeItem[]
  setItems: Dispatch<SetStateAction<PlaceAndTimeItem[]>>
}

export const PlaceAndTimeEditor: React.VFC<PlaceAndTimeEditorProps> = (props) => {
  return (
    <Stack>
      <EditorButton icon="add" onClick={()=>{return}} />
    </Stack>
  )
}