import { Flex, FormLabel, HStack, Stack, Text } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosRequestConfig } from "axios"
import { useEffect, useReducer, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { useAPI } from "../../../hooks/useAPI"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useOutletUser } from "../../../hooks/useOutletUser"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import { timePlaceReducer } from "../../../reducer/timeplace"
import type { ActivityDetail } from "../../../types/api"
import type { DateType } from "../../../types/description"
import { axiosWithPayload } from "../../../utils/axios"
import { BUILDING_ID_MAP, DATE_MAP } from "../../../utils/consts"
import { toPlaceID, toTimeID } from "../../../utils/functions"

import { EditorButton } from "./EditorButton"
import { PlaceInput } from "./PlaceInput"
import { RemarkInput } from "./RemarkInput"
import { TimeInput } from "./TimeInput"

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
    building: keyof typeof BUILDING_ID_MAP
    room: number
  }
  placeRemark: string
}

const schema = z.object({
  date: z
    .string()
    .refine((v) => v !== "")
    .optional(),
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
    building: z
      .string()
      .nonempty()
      .transform((v) => Number(v)),
    room: z.number(),
  }),
  placeRemark: z.string().optional(),
})

export const TimePlaceEditor: React.FC<{}> = () => {
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
    <Stack align="center" spacing="0">
      <FormLabel
        color="text.main"
        fontSize="1.6rem"
        textAlign="center"
        m="0"
        pb="2rem"
      >
        時間・場所
      </FormLabel>
      <Stack spacing="0.2rem" w="45rem">
        <HStack alignItems="start">
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <Stack flex="1">
                <HStack spacing="10px">
                  <Flex alignSelf="start">
                    <EditorButton icon="add" type="submit" />
                  </Flex>
                  <TimeInput state={state} dispatch={dispatch} />
                </HStack>
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
              <EditorButton
                icon="remove"
                onClick={() => onRemove(item)}
                paddingTop="0"
              />
              <Stack spacing="0">
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
