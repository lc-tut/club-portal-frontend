import { Button, HStack, Icon, Input, Stack, Text } from "@chakra-ui/react"
import { createRef, useState } from "react"
import { BsPlusCircle, BsTrash } from "react-icons/bs"
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
        <Button backgroundColor="#fff" p="0" onClick={() => onAdd(inputData)}>
          <Icon as={BsPlusCircle} color="text.main" />
        </Button>
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
              <Button
                h="2rem"
                p="0"
                backgroundColor="#fff"
                onClick={onRemove.bind(this, index)}
              >
                <Icon as={BsTrash} color="text.main" />
              </Button>
              <Text> {item} </Text>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
