import { HStack, Stack, Text } from "@chakra-ui/react"
import React, { useReducer, useState } from "react"
import { EditorButton } from "./EditorButton"
import { BUILDING_ID_MAP, DATE_MAP } from "../../../utils/consts"
import { PlaceInput } from "./PlaceEditorComponent"
import { RemarkInput } from "./RemarkEditorComponent"
import { TimeInput } from "./TimeEditorComponent"
import type { DateType } from "../../../types/description"
import { useFormContext } from "react-hook-form"
import type { StateDispatch } from "../../../types/utils"
import type { ActivityDetail } from "../../../types/api"
import { timePlaceReducer } from "../../../reducer/timeplace"
import { toPlaceID, toTimeID } from "../../../utils/functions"

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
    isDateDisabled: false,
    isTimeDisabled: false,
    isRoomDisabled: false,
  })
  const [isPlaceEtc, setIsPlaceEtc] = useState<boolean>(false)

  const watchAll = watch()

  const onAdd = () => {
    console.log(watchAll)
    console.log(isPlaceEtc)

    const startTime = watchAll.start
    const endTime = watchAll.end
    let err = false
    if (!state.isDateDisabled && watchAll.date === "") {
      err = true
      setError("date", {
        type: "required",
        message: "曜日を選択してください。",
      })
    } else {
      clearErrors("date")
    }
    if (!watchAll.place.building) {
      err = true
      setError("place.building", {
        type: "required",
        message: "場所を選択してください。",
      })
    } else {
      clearErrors("place.building")
    }
    if (
      (state.isTimeDisabled || state.isDateDisabled) &&
      watchAll.timeRemark === ""
    ) {
      err = true
      setError("timeRemark", {
        type: "required",
        message: "「その他」を選択している場合は備考が必須です。",
      })
    } else {
      clearErrors("timeRemark")
    }
    if (isPlaceEtc && watchAll.placeRemark === "") {
      console.log("場所を明記していない場合は備考が必須です。")
      err = true
      setError("placeRemark", {
        type: "invalid",
        message: "場所を明記していない場合は備考が必須です。",
      })
    } else {
      clearErrors("placeRemark")
    }
    if (
      !state.isTimeDisabled &&
      (startTime.hour > endTime.hour ||
        (startTime.hour === endTime.hour && startTime.minute > endTime.minute))
    )
      return
    if (!err) {
      const selectedDate = (watchAll.date ?? "Etc") as DateType
      const placeObj = watchAll.place
      setItems([
        {
          timeId: toTimeID(
            selectedDate,
            startTime.hour,
            startTime.minute,
            endTime.hour,
            endTime.minute,
            state.isTimeDisabled
          ),
          date: state.isDateDisabled ? "Etc" : selectedDate,
          time: state.isTimeDisabled
            ? "その他"
            : `${startTime.hour.toString().padStart(2, "0")}:${startTime.minute
                .toString()
                .padStart(2, "0")}~${endTime.hour
                .toString()
                .padStart(2, "0")}:${endTime.minute
                .toString()
                .padStart(2, "0")}`,
          timeRemark:
            watchAll.timeRemark === "" ? undefined : watchAll.timeRemark,
          placeId: toPlaceID(
            placeObj.building,
            state.isRoomDisabled ? 0 : placeObj.room
          ),
          place: `${BUILDING_ID_MAP[placeObj.building]}${
            state.isRoomDisabled ? "" : placeObj.room
          }`,
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
            <TimeInput state={state} dispatch={dispatch} />
            <RemarkInput
              label="時間に関する備考(任意)"
              remarkKey="timeRemark"
              isRequired={state.isTimeDisabled || state.isDateDisabled}
            />
            <PlaceInput
              state={state}
              dispatch={dispatch}
              setIsPlaceEtc={setIsPlaceEtc}
            />
            <RemarkInput
              label="場所に関する備考(任意)"
              remarkKey="placeRemark"
              isRequired={isPlaceEtc}
            />
          </Stack>
        </HStack>
        {props.items.map((item, index) => {
          const isDate = item.date !== "Day" && item.date !== "Etc"

          return (
            <HStack key={index} alignItems="center" textColor="text.main">
              <EditorButton icon="remove" onClick={() => onRemove(item)} />
              <Stack spacing="0" pt="1.2rem">
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
