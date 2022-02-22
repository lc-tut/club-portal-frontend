import { HStack, Input, Stack, Text, Wrap } from "@chakra-ui/react"
import { createRef, useState } from "react"
import { EditorButton } from "../../../../components/common/Editor/EditorButton"
import { StateDispatch } from "../../../../types/utils"

export type PlaceItem = {
  place: string
  remarks?: string
}

export type PlaceEditorProps = {
  items: PlaceItem[]
  setItems: StateDispatch<PlaceItem[]>
}

export const PlaceEditor: React.VFC<PlaceEditorProps> = (props) => {
  const { items, setItems } = props
  const [inputData, setInputData] = useState<PlaceItem>({
    place: "",
    remarks: "",
  })
  const inputRef = createRef<HTMLInputElement>()
  const onAdd = () => {
    if (inputData.place === "") {
      window.alert("活動場所を入力して下さい")
      return
    }
    setItems([...items, inputData])
    setInputData({
      place: "",
      remarks: "",
    })
    inputRef.current?.focus()
  }
  const onRemove = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <Stack>
      <Text color="text.main" fontSize="1.2rem">
        活動場所
      </Text>
      <HStack alignItems="start">
        <Wrap pt="1.2rem">
          <EditorButton icon="add" onClick={() => onAdd()} />
        </Wrap>
        <Stack w="100%">
          <Stack spacing="0" w="100%">
            <Text h="1.2rem" color="text.sub" fontSize="0.8rem">
              場所
            </Text>
            <Input
              backgroundColor="#fff"
              placeholder="活動場所を入力して下さい"
              ref={inputRef}
              value={inputData.place}
              onChange={(e) => {
                setInputData({
                  place: e.target.value,
                  remarks: inputData.remarks,
                })
              }}
            />
          </Stack>
          <Stack spacing="0">
            <Text h="1.2rem" color="text.sub" fontSize="0.8rem">
              備考(任意)
            </Text>
            <Input
              backgroundColor="#fff"
              placeholder="備考があれば入力して下さい"
              value={inputData.remarks}
              onChange={(e) => {
                setInputData({
                  place: inputData.place,
                  remarks: e.target.value,
                })
              }}
            />
          </Stack>
        </Stack>
      </HStack>
      {props.items.map((item, index) => {
        return (
          <HStack key={index} textColor="text.main">
            <EditorButton icon="remove" onClick={() => onRemove(index)} />
            <Text> {item.place} </Text>
            <Text>{item.remarks ? " - " + item.remarks : ""}</Text>
          </HStack>
        )
      })}
    </Stack>
  )
}
