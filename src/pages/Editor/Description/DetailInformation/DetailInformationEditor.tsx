import { Grid, GridItem, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { PortalButton } from "../../../../components/common/Button"
import { EditorBase } from "../../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../../components/global/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../../../static/consts"
import { DatetimeItem } from "../../../../types/editor"
import { ActivityEditor } from "./ActivityEditor"
import { DatetimeEditor } from "./DatetimeEditor"

type GeneralInputAreaProps = {
  label: string
  item: string
  setItem: Dispatch<SetStateAction<string>>
  type: "textarea" | "input"
}

const GeneralInputArea: React.VFC<GeneralInputAreaProps> = (props) => {
  let inputElement = <></>
  if (props.type === "input") {
    inputElement = (
      <Input
        placeholder={props.label + "を入力して下さい"}
        w="20rem"
        backgroundColor="#fff"
        value={props.item}
        onChange={(e) => props.setItem(e.target.value)}
      />
    )
  } else if (props.type === "textarea") {
    inputElement = (
      <Textarea
        placeholder={props.label + "を入力して下さい"}
        w="20rem"
        h="4rem"
        backgroundColor="#fff"
        value={props.item}
        onChange={(e) => props.setItem(e.target.value)}
      />
    )
  }

  return (
    <>
      <Text color="text.sub" pl="0.2rem">
        {props.label}
      </Text>
      {inputElement}
    </>
  )
}

export const DetailInformationEditor: React.VFC<{}> = () => {
  const activityDummy = [
    "活動内容その1",
    "活動内容その2です",
    "他にも何か色々やってます",
  ]
  const [activities, setActivities] = useState(activityDummy)
  const datetimeDummy: DatetimeItem[] = [
    {
      date: "mon",
      time: "19:00 ~ 21:00",
    },
    {
      date: "wed",
      time: "19:30 ~ 20:30",
    },
  ]
  const [datetimes, setDatetimes] = useState(datetimeDummy)
  const [place, setPlace] = useState("")
  const [mail, setMail] = useState("")
  const [hp, setHp] = useState("")
  const [remark, setRemark] = useState("")

  return (
    <>
      <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
        <TitleArea>詳細情報の編集</TitleArea>
        <EditorBase>
          <Grid
            templateColumns="repeat(2, 1fr)"
            columnGap="1rem"
            rowGap="3rem"
            pb="2rem"
          >
            <GridItem colSpan={2}>
              <ActivityEditor items={activities} setItems={setActivities} />
            </GridItem>
            <GridItem colSpan={2}>
              <DatetimeEditor items={datetimes} setItems={setDatetimes} />
            </GridItem>
            <GridItem>
              <GeneralInputArea
                label="活動場所"
                item={place}
                setItem={setPlace}
                type="textarea"
              />
            </GridItem>
            <GridItem>
              <GeneralInputArea
                label="連絡先のメールアドレス"
                item={mail}
                setItem={setMail}
                type="input"
              />
            </GridItem>
            <GridItem>
              <GeneralInputArea
                label="HPのURL"
                item={hp}
                setItem={setHp}
                type="input"
              />
            </GridItem>
            <GridItem>
              <GeneralInputArea
                label="備考"
                item={remark}
                setItem={setRemark}
                type="textarea"
              />
            </GridItem>
          </Grid>
          <PortalButton> 保存 </PortalButton>
        </EditorBase>
      </VStack>
    </>
  )
}
