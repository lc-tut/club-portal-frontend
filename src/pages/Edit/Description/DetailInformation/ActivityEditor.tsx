import { Stack, HStack, Tooltip, Button, Icon, Input, Text } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { BsPlusCircle, BsTrash } from "react-icons/bs"

type ActivityEditorProps = {
  items: string[],
  setItems: Dispatch<SetStateAction<string[]>>
}

export const ActivityEditor: React.VFC<ActivityEditorProps> = (props) => {
  const { items, setItems } = props
  const [ inputData, setInputData ] = useState("")
  const onAdd = (item: string) => {
    setItems([...items, item])
    setInputData("")
  }
  const onRemove = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <Stack spacing="0.5rem">
      <Text color="text.sub">
        活動内容
      </Text>
      <HStack>
        <Tooltip label="追加" placement="left" openDelay={500}>
          <Button
            backgroundColor="#fff"
            p="0"
            onClick={() => onAdd(inputData)}
          >
            <Icon as={BsPlusCircle} color="text.main" />
          </Button>
        </Tooltip>
        <Input
          backgroundColor="#fff"
          placeholder="活動内容を1つ入力して下さい"
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
        />
      </HStack>
      <Stack>
        {
          items.map((item, index) => {
            return (
              <HStack key={item}>
                <Tooltip label="削除" placement="left" openDelay={500}>
                  <Button
                    h="2rem"
                    p="0"
                    backgroundColor="#fff"
                    onClick={() => onRemove(index)}
                    >
                    <Icon as={BsTrash} color="text.main" />
                  </Button>
                </Tooltip>
                <Text color="text.main"> {item} </Text>
              </HStack>
            )
          })
        }
      </Stack>
    </Stack>
  )
}