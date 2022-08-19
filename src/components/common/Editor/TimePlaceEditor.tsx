import { HStack, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useReducer, useState } from "react"
import { EditorButton } from "./EditorButton"
import { BUILDING_ID_MAP, DATE_MAP } from "../../../utils/consts"
import { PlaceInput } from "./PlaceInput"
import { RemarkInput } from "./RemarkInput"
import { TimeInput } from "./TimeInput"
import type { DateType } from "../../../types/description"
import { FormProvider, useForm } from "react-hook-form"
import type { ActivityDetail } from "../../../types/api"
import { timePlaceReducer } from "../../../reducer/timeplace"
import { toPlaceID, toTimeID } from "../../../utils/functions"
import { EditorBase } from "./EditorBase"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAPI } from "../../../hooks/useAPI"
import { useOutletUser } from "../../../hooks/useOutletUser"
import type { AxiosRequestConfig } from "axios"
import { axiosWithPayload } from "../../../utils/axios"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useSuccessToast } from "../../../hooks/useSuccessToast"

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

const schema = z.object({
  date: z.string().nonempty(),
  start: z.object({
    hour: z.number().min(0).max(23),
    minute: z.number().min(0).max(59),
  }),
  end: z.object({
    hour: z.number().min(0).max(23),
    minute: z.number().min(0).max(59),
  }),
  timeRemark: z.string().optional(),
  place: z.object({
    building: z.string().transform((v) => Number(v)),
    room: z.number(),
  }),
  placeRemark: z.string().optional(),
})

export const TimePlaceEditor: React.VFC<{}> = () => {
  const methods = useForm<TimePlaceType>({
    resolver: zodResolver(schema),
  })
  const [state, dispatch] = useReducer(timePlaceReducer, {
    isDateDisabled: false,
    isTimeDisabled: false,
    isRoomDisabled: false,
  })
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<ActivityDetail>>(
    `/api/v1/clubs/uuid/${clubUuid!}/activity_detail`
  )
  const [activityDetails, setActivityDetails] = useState<Array<ActivityDetail>>(
    []
  )
  const errorAddToast = useErrorToast("データの追加に失敗しました。")
  const errorRemoveToast = useErrorToast("データの削除に失敗しました。")
  const successAddToast = useSuccessToast("データの追加が完了しました！")
  const successRemoveToast = useSuccessToast("データの削除が完了しました！")

  useEffect(() => {
    if (data) {
      setActivityDetails(data)
    }
  }, [data])

  const onSubmit = methods.handleSubmit(async (data) => {
    const startTime = data.start
    const endTime = data.end
    let err = false
    if (
      (state.isTimeDisabled || state.isDateDisabled) &&
      data.timeRemark === ""
    ) {
      err = true
      methods.setError("timeRemark", {
        type: "required",
        message: "「その他」を選択している場合は備考が必須です。",
      })
    } else {
      methods.clearErrors("timeRemark")
    }
    const building = data.place.building
    if ((building === 301 || building === 302) && data.placeRemark === "") {
      err = true
      methods.setError("placeRemark", {
        type: "required",
        message: "「外部」または「未定」を選択している場合は備考が必須です。",
      })
    } else {
      methods.clearErrors("placeRemark")
    }
    if (
      !state.isTimeDisabled &&
      (startTime.hour > endTime.hour ||
        (startTime.hour === endTime.hour && startTime.minute > endTime.minute))
    )
      return
    if (!err) {
      const selectedDate = data.date as DateType
      const placeObj = data.place
      const newData = {
        timeId:
          state.isTimeDisabled || state.isDateDisabled
            ? undefined
            : toTimeID(
                selectedDate,
                startTime.hour,
                startTime.minute,
                endTime.hour,
                endTime.minute
              ),
        date: state.isDateDisabled ? "Etc" : selectedDate,
        time: state.isTimeDisabled
          ? "その他"
          : `${startTime.hour.toString().padStart(2, "0")}:${startTime.minute
              .toString()
              .padStart(2, "0")}~${endTime.hour
              .toString()
              .padStart(2, "0")}:${endTime.minute.toString().padStart(2, "0")}`,
        timeRemark: data.timeRemark === "" ? undefined : data.timeRemark,
        placeId: toPlaceID(
          placeObj.building,
          state.isRoomDisabled ? 0 : placeObj.room
        ),
        place: `${BUILDING_ID_MAP[placeObj.building]}${
          state.isRoomDisabled ? "" : placeObj.room
        }`,
        placeRemark: data.placeRemark === "" ? undefined : data.placeRemark,
      }
      const resultData = [newData, ...activityDetails]
      const requestConfig: AxiosRequestConfig<Array<ActivityDetail>> = {
        url: `/api/v1/clubs/uuid/${clubUuid!}/activity_detail`,
        method: "put",
        data: resultData,
      }
      try {
        await axiosWithPayload<Array<ActivityDetail>, Array<ActivityDetail>>(
          requestConfig
        )
        setActivityDetails(resultData)
        successAddToast()
      } catch (e) {
        errorAddToast()
      }
    }
  })

  const onRemove = async (item: ActivityDetail) => {
    const filteredActivityDetails = activityDetails.filter(
      (ad) => !Object.is(ad, item)
    )
    const requestConfig: AxiosRequestConfig<Array<ActivityDetail>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/activity_detail`,
      method: "put",
      data: filteredActivityDetails,
    }
    try {
      await axiosWithPayload<Array<ActivityDetail>, Array<ActivityDetail>>(
        requestConfig
      )
      successRemoveToast()
      setActivityDetails(filteredActivityDetails)
    } catch (e) {
      errorRemoveToast()
    }
  }

  return (
    <Stack align="center">
      <EditorBase noBackButton>
        <Text color="text.main" fontSize="1.2rem">
          時間・場所
        </Text>
        <Stack spacing="1.5rem" w="45rem">
          <HStack alignItems="start">
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <EditorButton icon="add" type="submit" />
                <Stack flex="1">
                  <TimeInput state={state} dispatch={dispatch} />
                  <RemarkInput
                    label="時間に関する備考(任意)"
                    remarkKey="timeRemark"
                    isRequired={state.isTimeDisabled || state.isDateDisabled}
                  />
                  <PlaceInput state={state} dispatch={dispatch} />
                  <RemarkInput
                    label="場所に関する備考(任意)"
                    remarkKey="placeRemark"
                    isRequired={state.isRoomDisabled}
                  />
                </Stack>
              </form>
            </FormProvider>
          </HStack>
          {activityDetails.map((item, index) => {
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
      </EditorBase>
    </Stack>
  )
}
