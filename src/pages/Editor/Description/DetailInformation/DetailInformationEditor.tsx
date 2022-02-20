import { Grid, GridItem, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { PortalButton } from "../../../../components/common/Button"
import { EditorBase } from "../../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../../../static/consts"
import { ActivityEditor } from "./ActivityEditor"
import {
  PlaceAndTimeEditor,
  PlaceAndTimeItem,
} from "./PlaceAndTimeEditor/PlaceAndTimeEditor"

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
      <Text color="text.main" pl="0.2rem">
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
  const placeAndTimeDummy: PlaceAndTimeItem[] = [
    {
      date: "mon",
      startTime: {
        hours: 0,
        minutes: 0,
      },
      endTime: {
        hours: 0,
        minutes: 0,
      },
      isTimeOthers: true,
      place: {
        buildingId: 1,
        roomNumber: 123,
      },
      timeRemark: "時間は適当に決めてます",
      placeRemark: "この場所はお気に入りです",
    },
    {
      date: "tue",
      startTime: {
        hours: 20,
        minutes: 0,
      },
      endTime: {
        hours: 21,
        minutes: 0,
      },
      isTimeOthers: false,
      place: {
        buildingId: 10,
        roomNumber: 111,
      },
      placeRemark:
        "サークル棟たのしいいいいいいいいいいいいいああああああああああ",
    },
    {
      date: "wed",
      startTime: {
        hours: 19,
        minutes: 30,
      },
      endTime: {
        hours: 21,
        minutes: 0,
      },
      isTimeOthers: false,
      place: {
        buildingId: 20,
        roomNumber: 345,
      },
    },
  ]
  const [activities, setActivities] = useState(activityDummy)
  const [placeAndTimes, setPlaceAndTimes] = useState(placeAndTimeDummy)
  const [mail, setMail] = useState("")
  const [hp, setHp] = useState("")

  return (
    <>
      <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
        <TitleArea>詳細情報の編集</TitleArea>
        <EditorBase>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            columnGap="1rem"
            rowGap="3rem"
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <ActivityEditor items={activities} setItems={setActivities} />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <PlaceAndTimeEditor
                items={placeAndTimes}
                setItems={setPlaceAndTimes}
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
          </Grid>
          <PortalButton> 保存 </PortalButton>
        </EditorBase>
      </VStack>
    </>
  )
}
