import { Button, HStack, Icon, Input, Stack, Text } from "@chakra-ui/react"
import { createRef, useState } from "react"
import { BsPlusCircle, BsTrash } from "react-icons/bs"
import { EditorButton } from "../../../../components/common/Editor/EditorButton"
import { ActivityEditorProps } from "../../../../types/editor"

export const ActivityEditor: React.VFC<ActivityEditorProps> = (props) => {
  const { items, setItems } = props
  const [inputData, setInputData] = useState("")
  const inputRef = createRef<HTMLInputElement>()

  const onAdd = (item: string) => {
    setItems([...items, item])
    setInputData("")
    inputRef.current?.focus()
  }
  const onRemove = (index: number) => {
    const newItems = [...props.items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <Stack spacing="0.5rem">
      <Text color="text.sub" fontSize="1.2rem">
        活動内容
      </Text>
      <HStack>
        <EditorButton
          icon="add"
          onClick={()=>onAdd(inputData)}
        />
        <Input
          backgroundColor="#fff"
          placeholder="活動内容を1つ入力して下さい"
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
          ref={inputRef}
        />
      </HStack>
      <Stack>
        {props.items.map((item, index) => {
          return (
            <HStack key={index} textColor="text.main">
              <EditorButton
                icon="remove"
                onClick={()=>onRemove(index)}
              />
              <Text> {item} </Text>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
