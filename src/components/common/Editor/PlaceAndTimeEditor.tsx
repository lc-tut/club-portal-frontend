import { HStack, Stack, Text } from "@chakra-ui/react"
import React, { useReducer } from "react"
import { EditorButton } from "./EditorButton"
import { DATE_MAP } from "../../../utils/consts"
import { PlaceInput } from "./PlaceEditorComponent"
import { RemarkInput } from "./RemarkEditorComponent"
import { DateSelect, TimeInput } from "./TimeEditorComponent"
import type { DateType } from "../../../types/description"
import { useFormContext } from "react-hook-form"
import type { StateDispatch } from "../../../types/utils"
import type { ActivityDetail } from "../../../types/api"
import { timePlaceReducer } from "../../../reducer/timeplace"

type PlaceAndTimeEditorProps = {
  items: Array<ActivityDetail>
  setItems: StateDispatch<Array<ActivityDetail>>
}

type TimePlaceType = {
  date: DateType | ""
  start: {
    hour: number
    minute: number
  }
  end: {
    hour: number
    minute: number
  }
  timeRemark: string
  place: {
    building: number
    room: number
  }
  placeRemark: string
}

export const PlaceAndTimeEditor: React.VFC<PlaceAndTimeEditorProps> = (
  props
) => {
  const { setError, clearErrors, watch } = useFormContext<TimePlaceType>()
  const { items, setItems } = props
  const [state, dispatch] = useReducer(timePlaceReducer, {
    isTimeDisabled: false,
    isPlaceDisabled: false,
    isRoomDisabled: false,
  })

  const watchAll = watch()

  const onAdd = () => {
    let err = false
    if (watchAll.date === "") {
      err = true
      setError("date", {
        type: "required",
        message: "曜日を選択してください。",
      })
    } else {
      clearErrors("date")
    }
    if (state.isTimeDisabled && watchAll.timeRemark === "") {
      err = true
      setError("timeRemark", {
        type: "required",
        message: "「その他」を選択している場合は備考は必須です。",
      })
    } else {
      clearErrors("timeRemark")
    }
    if (state.isPlaceDisabled && watchAll.placeRemark === "") {
      err = true
      setError("placeRemark", {
        type: "required",
        message: "「その他」を選択している場合は備考は必須です。",
      })
    } else {
      clearErrors("placeRemark")
    }
    if (!err) {
      watchAll.date = watchAll.date as DateType
      // TODO: Set correct value
      setItems([
        {
          timeId: 0,
          date: watchAll.date,
          time: "hoge",
          timeRemark:
            watchAll.timeRemark === "" ? undefined : watchAll.timeRemark,
          placeId: 0,
          place: "fuga",
          placeRemark:
            watchAll.placeRemark === "" ? undefined : watchAll.placeRemark,
        },
        ...items,
      ])
    }
  }

  const onRemove = (item: ActivityDetail) => {
    setItems(items.filter((tp) => !Object.is(tp, item)))
  }

  return (
    <Stack>
      <Text color="text.main" fontSize="1.2rem">
        時間・場所
      </Text>
      <Stack spacing="1.5rem">
        <HStack alignItems="start">
          <EditorButton icon="add" onClick={onAdd} />
          <Stack flex="1">
            <HStack>
              <DateSelect />
              <TimeInput state={state} dispatch={dispatch} />
            </HStack>
            <RemarkInput
              label="時間に関する備考(任意)"
              remarkKey="timeRemark"
              isDisabled={state.isTimeDisabled}
            />
            <PlaceInput state={state} dispatch={dispatch} />
            <RemarkInput
              label="場所に関する備考(任意)"
              remarkKey="placeRemark"
              isDisabled={state.isPlaceDisabled}
            />
          </Stack>
        </HStack>
        {props.items.map((item, index) => {
          const isDate = item.date !== "Day" && item.date !== "Etc"

          return (
            <HStack key={index} alignItems="start" textColor="text.main">
              <EditorButton icon="remove" onClick={() => onRemove(item)} />
              <Stack>
                <HStack h="40px">
                  <Text>
                    {isDate
                      ? `${DATE_MAP[item.date]}曜日`
                      : DATE_MAP[item.date]}
                  </Text>

                  <Text>{item.time}</Text>

                  <Text>{item.place}</Text>
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