import { HStack, Stack, Text, Wrap } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction, useState } from "react"
import { EditorButton } from "../../../../../components/common/Editor/EditorButton"
import { BUILDING_ID_MAP } from "../../../../../utils/consts"
import { Place, PlaceInput } from "./PlaceEditorComponent"
import { RemarkInput } from "./RemarkEditorComponent"
import {
  dateDisplayNameMap,
  DateSelect,
  Time,
  TimeInput,
} from "./TimeEditorComponent"

export type PlaceAndTimeItem = {
  date: string
  startTime: Time
  endTime: Time
  isTimeOthers: boolean
  place: Place
  isRoomNumberEmpty: boolean
  timeRemark?: string
  placeRemark?: string
}

type PlaceAndTimeEditorProps = {
  items: PlaceAndTimeItem[]
  setItems: Dispatch<SetStateAction<PlaceAndTimeItem[]>>
}

const defaultInputData: PlaceAndTimeItem = {
  date: "",
  startTime: {
    hours: 19,
    minutes: 0,
  },
  endTime: {
    hours: 19,
    minutes: 0,
  },
  isTimeOthers: false,
  place: {
    buildingId: -1,
    roomNumber: 0,
  },
  isRoomNumberEmpty: false,
  // undefined だと警告が出る
  timeRemark: "",
  placeRemark: "",
}

export function updateInputData(
  newInputData: PlaceAndTimeItem,
  setInputData: Dispatch<SetStateAction<PlaceAndTimeItem>>
) {
  const newObject = { ...newInputData }
  setInputData(newObject)
}

function timeToString(time: Time) {
  const h = `0${time.hours}`.slice(-2)
  const m = `0${time.minutes}`.slice(-2)
  return h + ":" + m
}

export const PlaceAndTimeEditor: React.VFC<PlaceAndTimeEditorProps> = (
  props
) => {
  const [inputData, setInputData] = useState<PlaceAndTimeItem>(defaultInputData)
  const onRemove = (index: number) => {
    const newItems = [...props.items]
    newItems.splice(index, 1)
    props.setItems(newItems)
  }

  console.log(inputData)

  return (
    <Stack>
      <Text color="text.main" fontSize="1.2rem">
        時間・場所
      </Text>
      <Stack spacing="1.5rem">
        <HStack alignItems="start">
          <Wrap mt="1.2rem">
            <EditorButton
              icon="add"
              onClick={() => {
                const copy: PlaceAndTimeItem = {
                  ...inputData,
                  startTime: { ...inputData.startTime },
                  endTime: { ...inputData.endTime },
                  place: { ...inputData.place },
                }
                const newItems = [...props.items, copy]
                props.setItems(newItems)
                setInputData(defaultInputData)
              }}
            />
          </Wrap>
          <Stack flex="1">
            <HStack>
              <DateSelect inputData={inputData} setInputData={setInputData} />
              <TimeInput inputData={inputData} setInputData={setInputData} />
            </HStack>
            <RemarkInput
              label="時間に関する備考(任意)"
              remarkKey="timeRemark"
              inputData={inputData}
              setInputData={setInputData}
            />
            <PlaceInput inputData={inputData} setInputData={setInputData} />
            <RemarkInput
              label="場所に関する備考(任意)"
              remarkKey="placeRemark"
              inputData={inputData}
              setInputData={setInputData}
            />
          </Stack>
        </HStack>
        {props.items.map((item, index) => {
          return (
            <HStack key={index} alignItems="start" textColor="text.main">
              <EditorButton icon="remove" onClick={() => onRemove(index)} />
              <Stack>
                <HStack h="40px">
                  <Text>{dateDisplayNameMap[item.date]}曜日</Text>

                  {item.isTimeOthers ? (
                    <>
                      <Text>時間未定</Text>
                    </>
                  ) : (
                    <>
                      <Text>{timeToString(item.startTime)}</Text>
                      <Text>~</Text>
                      <Text>{timeToString(item.endTime)}</Text>
                    </>
                  )}

                  <Text>
                    {BUILDING_ID_MAP[item.place.buildingId] ?? ""}
                    {item.place.roomNumber}
                  </Text>
                </HStack>
                <Stack textColor="text.sub">
                  {item.timeRemark && (
                    <Text>備考(時間) - {item.timeRemark}</Text>
                  )}
                  {item.placeRemark && (
                    <Text>備考(場所) - {item.placeRemark}</Text>
                  )}
                </Stack>
              </Stack>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
