import { HStack, Input, Stack, Text } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { EditorButton } from "./EditorButton"

type AchievementEditorProps = {
  items: string[]
  setItems: Dispatch<SetStateAction<string[]>>
}

export const AchievementEditor: React.VFC<AchievementEditorProps> = (props) => {
  const [inputData, setInputData] = useState<string>("")
  const onAdd = () => {
    const newItems = [...props.items, inputData]
    props.setItems(newItems)
  }
  const onRemove = (index: number) => {
    const newItems = [...props.items]
    newItems.splice(index, 1)
    props.setItems(newItems)
  }

  return (
    <Stack>
      <Text color="text.main" fontSize="1.2rem">
        実績
      </Text>
      <HStack>
        <EditorButton icon="add" onClick={onAdd} />
        <Input
          backgroundColor="#fff"
          textColor="text.main"
          placeholder="実績を入力して下さい"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </HStack>
      {props.items.map((item, index) => {
        return (
          <HStack key={item} textColor="text.main">
            <EditorButton icon="remove" onClick={() => onRemove(index)} />
            <Text>{item}</Text>
          </HStack>
        )
      })}
    </Stack>
  )
}
