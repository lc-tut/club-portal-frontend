import { Grid, GridItem, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { PortalButton } from "../../../components/common/Button"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../../static/consts"

const months = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]

type MonthInputAreaProps = {
  month: number
  inputData: string[]
  setInputData: Dispatch<SetStateAction<string[]>>
}

const MonthInputArea: React.VFC<MonthInputAreaProps> = (props) => {
  return (
    <Stack>
      <Text pl="0.2rem" color="text.main">
        {props.month.toString() + "月"}
      </Text>
      <Textarea
        w="20rem"
        h="4rem"
        textColor="text.main"
        backgroundColor="#fff"
        value={props.inputData[props.month]}
        onChange={(e) => {
          const newInputData = [...props.inputData]
          newInputData[props.month] = e.target.value
          props.setInputData(newInputData)
        }}
      />
    </Stack>
  )
}

export const AnualPlanEditor: React.VFC<{}> = () => {
  // ここでデータを取得するが、要素数が12なるようにする
  const dummy = [
    "1月の予定",
    "",
    "",
    "",
    "5月の予定",
    "",
    "7月の予定",
    "",
    "",
    "",
    "11月の予定",
    "",
  ]
  const [inputData, setInputData] = useState(dummy)

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>年間予定の編集</TitleArea>
      <EditorBase>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          columnGap="2rem"
          rowGap="2rem"
        >
          {months.map((item) => {
            return (
              <GridItem key={item}>
                <MonthInputArea
                  month={item}
                  inputData={inputData}
                  setInputData={setInputData}
                />
              </GridItem>
            )
          })}
        </Grid>
        <PortalButton> 保存 </PortalButton>
      </EditorBase>
    </VStack>
  )
}
