import { HStack, InputElementProps } from "@chakra-ui/react"
import { EditorNumberInput, EditorSelect } from "../../../../../components/common/Editor/EditorInput"
import { EditorSelectOptionItem } from "../../../../../types/editor"

export type Place = {
  building: string
  roomNumber: number
}

type PlaceInputProps = InputElementProps & {
  options: Array<EditorSelectOptionItem>
}

export const PlaceInput: React.VFC<PlaceInputProps> = (props) => {
  return (
    <HStack>
      <EditorSelect width="10rem" label="活動場所" options={props.options} />
      <EditorNumberInput width="8rem" label="部屋番号" min={0} max={999999} />
    </HStack>
  )
}
