import {
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react"
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react"
import { EditorButton } from "../../../../components/common/Editor/EditorButton"

type Time = {
  hours: number
  minutes: number
}

type Place = {
  building: string
  roomNumber: number
}

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

type InputElementProps = {
  inputData: PlaceAndTimeItem
  setInputData: Dispatch<SetStateAction<PlaceAndTimeItem>>
}

type PlaceAndTimeNumberInputProps = InputElementProps &
  Pick<NumberInputProps, "defaultValue" | "min" | "max" | "width">

type PlaceInputProps = InputElementProps & {
  options: Array<{ value: number; label: string }>
}

type RemarkInputProps = InputElementProps & {
  label: string
}

const dateDisplayNameMap: { [key in string]: string } = {
  mon: "月",
  tue: "火",
  wed: "水",
  thu: "木",
  fri: "金",
  sat: "土",
  sun: "日",
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

const PlaceAndTimeNumberInput: React.VFC<PlaceAndTimeNumberInputProps> = (
  props
) => {
  return (
    <NumberInput
      width={props.width}
      defaultValue={props.defaultValue}
      min={props.min}
      max={props.max}
      textColor="text.main"
    >
      <NumberInputField backgroundColor="#fff" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

const LabelText: React.VFC<PropsWithChildren<{}>> = (props) => {
  return (
    <Text fontSize="0.8rem" color="text.sub" h="1.2rem">
      {props.children}
    </Text>
  )
}

function updateInputData(
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

const DateSelect: React.VFC<InputElementProps> = (props) => {
  console.log(props.inputData.date)
  return (
    <Select
      w="5rem"
      mt="1.2rem"
      textColor="text.main"
      backgroundColor="#fff"
      value={props.inputData.date}
      onChange={(e) => {
        updateInputData(
          { ...props.inputData, date: e.target.value },
          props.setInputData
        )
      }}
    >
      <option value=""> - </option>
      <option value="mon"> {dateDisplayNameMap["mon"]} </option>
      <option value="tue"> {dateDisplayNameMap["tue"]} </option>
      <option value="wed"> {dateDisplayNameMap["wed"]} </option>
      <option value="thu"> {dateDisplayNameMap["thu"]} </option>
      <option value="fri"> {dateDisplayNameMap["fri"]} </option>
      <option value="sat"> {dateDisplayNameMap["sat"]} </option>
      <option value="sun"> {dateDisplayNameMap["sun"]} </option>
    </Select>
  )
}

const TimeInput: React.VFC<InputElementProps> = (props) => {
  return (
    <HStack textColor="text.main">
      <Stack spacing="0">
        <LabelText>開始時間</LabelText>
        <HStack>
          <PlaceAndTimeNumberInput
            width="5rem"
            min={0}
            max={23}
            inputData={props.inputData}
            setInputData={props.setInputData}
          />
          <Text>:</Text>
          <PlaceAndTimeNumberInput
            width="5rem"
            min={0}
            max={60}
            inputData={props.inputData}
            setInputData={props.setInputData}
          />
          <Text>~</Text>
        </HStack>
      </Stack>
      <Stack spacing="0">
        <LabelText>終了時間</LabelText>
        <HStack>
          <PlaceAndTimeNumberInput
            width="5rem"
            min={0}
            max={23}
            inputData={props.inputData}
            setInputData={props.setInputData}
          />
          <Text>:</Text>
          <PlaceAndTimeNumberInput
            width="5rem"
            min={0}
            max={60}
            inputData={props.inputData}
            setInputData={props.setInputData}
          />
        </HStack>
      </Stack>
    </HStack>
  )
}

const PlaceInput: React.VFC<PlaceInputProps> = (props) => {
  return (
    <Stack spacing="0">
      <LabelText>活動場所</LabelText>
      <HStack>
        <Select>
          {props.options.map((item) => {
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          })}
        </Select>
      </HStack>
    </Stack>
  )
}

const RemarkInput: React.VFC<RemarkInputProps> = (props) => {
  return (
    <Stack spacing="0">
      <LabelText>{props.label}</LabelText>
      <Input backgroundColor="#fff" textColor="text.main" />
    </Stack>
  )
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
        <Stack>
          <HStack>
            <DateSelect inputData={inputData} setInputData={setInputData} />
            <TimeInput inputData={inputData} setInputData={setInputData} />
          </HStack>
          <RemarkInput
            label="時間に関する備考(任意)"
            inputData={inputData}
            setInputData={setInputData}
          />
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
