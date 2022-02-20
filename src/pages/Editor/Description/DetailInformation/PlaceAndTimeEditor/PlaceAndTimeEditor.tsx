import { HStack, Stack, Text, Wrap } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction, useState } from "react"
import { EditorButton } from "../../../../../components/common/Editor/EditorButton"
import { RemarkInput } from "./CommonComponents"
import { Place, PlaceInput } from "./PlaceEditorComponents"
import {
  dateDisplayNameMap,
  DateSelect,
  Time,
  TimeInput
} from "./TimeEditorComponents"

export type PlaceAndTimeItem = {
  date: string
  startTime: Time
  endTime: Time
  place: Place
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
    hours: 0,
    minutes: 0,
  },
  endTime: {
    hours: 0,
    minutes: 0,
  },
  place: {
    building: "",
    roomNumber: 0,
  },
  timeRemark: undefined,
  placeRemark: undefined,
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

  return (
    <Stack spacing="1.5rem">
      <HStack alignItems="start">
        <Wrap mt="1.2rem">
          <EditorButton
            icon="add"
            onClick={() => {
              const newItems = [...props.items, inputData]
              props.setItems(newItems)
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
            inputData={inputData}
            setInputData={setInputData}
          />
          <PlaceInput options={[
            {value: "1",   label: "講義実験棟"},
            {value: "10",  label: "研究棟A"},
            {value: "100", label: "研究棟B"},
          ]} />
          <RemarkInput
            label="場所に関する備考(任意)"
            inputData={inputData}
            setInputData={setInputData}
          />
        </Stack>
      </HStack>
      {props.items.map((item, index) => {
        return (
          <HStack key={item.date} alignItems="start" textColor="text.main">
            <EditorButton icon="remove" onClick={() => onRemove(index)} />
            <Stack>
              <HStack>
                <Text>{dateDisplayNameMap[item.date]}曜日</Text>
                <Text>{timeToString(item.startTime)}</Text>
                <Text>~</Text>
                <Text>{timeToString(item.endTime)}</Text>
                <Text>
                  {item.place.building}
                  {item.place.roomNumber}
                </Text>
              </HStack>
              <Stack textColor="text.sub">
                {item.timeRemark && <Text>備考(時間) - {item.timeRemark}</Text>}
                {item.placeRemark && (
                  <Text>備考(場所) - {item.placeRemark}</Text>
                )}
              </Stack>
            </Stack>
          </HStack>
        )
      })}
    </Stack>
  )
}
