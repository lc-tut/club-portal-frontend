import { Flex, Grid, GridItem, Text, Textarea, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { EditorBase } from "../../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../../components/global/TitleArea"
import { ActivityEditor } from "./ActivityEditor"

const forms = [
  "活動場所",
  "連絡先のメールアドレス",
  "HPのURL",
  "備考"
]

export const DetailInformationEditor: React.VFC<{}> = () => {
  const activityDummy = [
    "活動内容その1",
    "活動内容その2です",
    "他にも何か色々やってます",
  ]
  const [ activities, setActivities ] = useState(activityDummy)

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
            <ActivityEditor items={activities} setItems={setActivities} />
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