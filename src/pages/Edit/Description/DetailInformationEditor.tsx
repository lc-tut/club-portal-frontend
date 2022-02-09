import { Grid, GridItem, Textarea, VStack, Text, Stack, HStack, Button, Input, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { BsPlus, BsPlusCircle, BsTrash } from "react-icons/bs"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../components/global/TitleArea"

const forms = [
  "活動日",
  "活動時間",
  "活動場所",
  "連絡先のメールアドレス",
  "HPのURL",
  "備考"
]

const ActivityEditor: React.VFC<{contents: string[]}> = (props) => {
  const [ items, setItems ] = useState(props.contents)
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
            <BsPlusCircle />
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
                    <BsTrash />
                  </Button>
                </Tooltip>
                <Text> {item} </Text>
              </HStack>
            )
          })
        }
      </Stack>
    </Stack>
  )
}

export const DetailInformationEditor: React.VFC<{}> = () => {
  const activityDummy = [
    "活動内容その1",
    "活動内容その2です",
    "他にも何か色々やってます"
  ]

  return (
    <VStack flex="1">
      <TitleArea>
        詳細情報の編集
      </TitleArea>
      <EditorBase>
        <Grid
          templateColumns="repeat(2, 1fr)"
          columnGap="1rem"
          rowGap="2rem"
        >
          <GridItem colSpan={2}>
            <ActivityEditor contents={activityDummy} />
          </GridItem>
          {
            forms.map((item) => {
              return (
                <GridItem
                  key={item}
                >
                  <Text color="text.sub" pl="0.2rem">
                    {item}
                  </Text>
                  <Textarea
                    placeholder={item + "を入力して下さい"}
                    w="20rem"
                    h="4rem"
                    backgroundColor="#fff"
                  />
                </GridItem>
              )
            })
          }
        </Grid>
      </EditorBase>
    </VStack>
  )
}