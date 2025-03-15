import React, { Fragment, useReducer, useState } from "react"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Textarea,
  VStack,
  Radio,
  RadioGroup,
  Wrap,
  HStack,
  Box,
  Select,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
} from "@chakra-ui/react"
import { string, z } from "zod"

import { AxiosRequestConfig } from "axios"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import {
  PADDING_BEFORE_FOOTER,
  VALID_SNS_LIST,
  MONTHS,
  DATE_MAP,
  TOGGLE_TIME,
  TOGGLE_DATE,
  BUILDING_ID_MAP,
  TOGGLE_ROOM,
} from "../../utils/consts"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller, set } from "react-hook-form"
import { PortalButton } from "../../components/common/Button"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { CreateClubPayload } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { toPlaceID, toTimeID } from "../../utils/functions"

import { EditorButton } from "../../components/common/Editor/EditorButton"
import { useOutletUser } from "../../hooks/useOutletUser"
import { EditorSelectOptionItem } from "../../types/editor"
import {
  EditorLabel,
  EditorText,
} from "../../components/common/Editor/CommonEditor"
import { timePlaceReducer } from "../../reducer/timeplace"
import { DateType } from "../../types/description"

// 型チェック用
const schemaForType =
  <T,>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg
  }

const schema = z.object({
  name: z.string().min(1, { message: "サークル名を入力してください" }),
  description: z
    .string()
    .min(1, { message: "サークルの説明文を入力してください" }),
  shortDescription: z
    .string()
    .min(1, { message: "サークルの簡易説明文を入力してください" }),
  campus: z
    .union([z.literal(0), z.literal(1)])
    .optional()
    .refine((campus) => campus !== undefined, {
      message: "キャンパスを選択してください",
    }),
  clubType: z
    .union([z.literal(0), z.literal(1), z.literal(2)])
    .optional()
    .refine((clubType) => clubType !== undefined, {
      message: "サークルの種類を選択してください",
    }),
  contents: z
    .array(
      z.object({
        content: z.string().min(1),
      })
    )
    .refine((contents) => contents.some((item) => item.content.trim() !== ""), {
      message: "活動内容は最低1つ以上入力してください",
    }),
  links: z
    .array(
      z.object({
        label: z.string().min(1, { message: "リンクラベルを設定してください" }),
        url: z
          .string()
          .url({ message: "正しいURLを入力してください。" })
          .min(1),
      })
    )
    .refine((links) => links.some((item) => item.url.trim() !== ""), {
      message: "リンクは最低1つ以上入力してください",
    }),
  schedules: z
    .array(
      z.object({
        month: z.number().min(1).max(12),
        schedule: z.string(),
      })
    )
    .refine(
      (schedules) => schedules.some((item) => item.schedule.trim() !== ""),
      { message: "スケジュールは最低1つ以上入力してください" }
    ),
  achievements: z
    .array(
      z.object({
        achievement: z.string().min(1),
      })
    )
    .refine(
      (achievements) =>
        achievements.some((item) => item.achievement.trim() !== ""),
      { message: "実績は最低1つ以上入力してください" }
    ),
  // images: z.array(z.object({
  //     imageID: z.number().optional(),
  // })), default値を指定する形に変更
  // videos: z.array(z.object({
  //     path: z.string().url(),
  // })), default値を指定する形に変更
  activityDetails: z
    .array(
      z.object({
        timeId: z.number().optional(),
        date: string().optional(),
        time: z.string(),
        timeRemark: z.string().optional(),
        placeId: z.number().optional(),
        place: z.string(),
        placeRemark: z.string().optional(),
      })
    )
    .refine(
      (activityDetails) =>
        activityDetails.some((item) => item.place.trim() !== ""),
      { message: "活動日時・場所は最低1つ以上入力してください" }
    ),
})

export const InitializeEditor: React.FC<{}> = () => {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateClubPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: useOutletUser().name,
    },
  })

  // 活動内容追加用
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  })
  const [inputValue, setInputValue] = useState("")

  // リンク追加用
  const {
    fields: linkFields,
    append: linkAppend,
    remove: linkRemove,
  } = useFieldArray({
    control,
    name: "links",
  })
  const [linkLabel, setLinkLabel] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [customLinkLabel, setCustomLinkLabel] = useState("")

  // スケジュール追加用
  const {
    fields: scheduleFields,
    append: scheduleAppend,
    remove: scheduleRemove,
  } = useFieldArray({
    control,
    name: "schedules",
  })
  const [month, setMonth] = useState<number>()
  const [schedule, setSchedule] = useState("")

  // アチーブメント追加用
  const {
    fields: achievementFields,
    append: achievementAppend,
    remove: achievementRemove,
  } = useFieldArray({
    control,
    name: "achievements",
  })
  const [achievement, setAchievement] = useState("")

  // 活動日時・場所追加用
  const {
    fields: activityDetailFields,
    append: activityDetailAppend,
    remove: activityDetailRemove,
  } = useFieldArray({
    control,
    name: "activityDetails",
  })
  const date_options: Array<EditorSelectOptionItem> = Object.entries(
    DATE_MAP
  ).map((d) => ({ displayName: d[1], value: d[0] }))
  const place_options: Array<EditorSelectOptionItem> = Object.entries(
    BUILDING_ID_MAP
  ).map((d) => ({ displayName: d[1], value: d[0] }))
  const [state, dispatch] = useReducer(timePlaceReducer, {
    isDateDisabled: false,
    isTimeDisabled: false,
    isRoomDisabled: false,
  })
  const [date, setDate] = useState<string>("Etc")
  const [startHour, setStartHour] = useState<number>(19)
  const [startMinute, setStartMinute] = useState<number>(0)
  const [endHour, setEndHour] = useState<number>(21)
  const [endMinute, setEndMinute] = useState<number>(0)
  const [timeRemark, setTimeRemark] = useState<string>("")
  const [placeRemark, setPlaceRemark] = useState<string>("")
  const [building, setBuilding] = useState<string>("")
  const [buildingRoom, setBuildingRoom] = useState<number>()

  const errorToast = useErrorToast("データの登録に失敗しました。")
  const successToast = useSuccessToast("データの登録が完了しました！")

  const onSubmitError = (errors: any) => {
    console.log(errors)
    const errorKeys = Object.keys(errors)
    if (errorKeys.length > 0) {
      const errorElements = errorKeys
        .map((key) => document.querySelector(`[name="${key}"]`))
        .filter((el): el is HTMLElement => el !== null)

      if (errorElements.length > 0) {
        const topMostElement = errorElements.reduce((prev, curr) =>
          prev.getBoundingClientRect().top < curr.getBoundingClientRect().top
            ? prev
            : curr
        )
        topMostElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    data.images = [{ imageId: 1 }]

    console.log(data)
    const requestConfig: AxiosRequestConfig<CreateClubPayload> = {
      url: "/api/v1/clubs",
      method: "post",
      data: data,
    }
    try {
      await axiosWithPayload<CreateClubPayload, CreateClubPayload>(
        requestConfig
      )
      successToast()
      window.location.href = "/"
    } catch (e) {
      console.error(e)
      errorToast()
    }
  }, onSubmitError)

  // サークル作成に最低限必要な項目を入力してもらう
  // links, schedules, achievements, images, videos, activityDetailsは後で任意で入力できるように追加する
  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークル情報の初期設定</TitleArea>
      <form onSubmit={onSubmit}>
        <EditorBase>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            columnGap="1rem"
            rowGap="4rem"
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl isInvalid={errors.name !== undefined}>
                <FormLabel color="text.main" fontSize="1.6rem" m="0" pb="2rem">
                  サークル名
                </FormLabel>
                <Input
                  backgroundColor="#fff"
                  color="text.main"
                  w="30rem"
                  h="3rem"
                  placeholder="サークル名を入力してください"
                  {...register("name", {
                    required: true,
                    minLength: 1,
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  サークルの説明文
                </FormLabel>
                <Textarea
                  backgroundColor="#fff"
                  color="text.main"
                  w="30rem"
                  h="10rem"
                  placeholder="サークルの説明文を入力して下さい"
                  resize="none"
                  {...register("description", {
                    required: true,
                    minLength: 1,
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.shortDescription !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  サークルの簡易説明文
                </FormLabel>
                <Input
                  backgroundColor="#fff"
                  color="text.main"
                  w="30rem"
                  h="3rem"
                  placeholder="サークルの短い簡潔な説明文を入力して下さい"
                  {...register("shortDescription", {
                    required: true,
                    minLength: 1,
                  })}
                />
                <FormErrorMessage>
                  {errors.shortDescription && errors.shortDescription.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.campus !== undefined}>
                <FormLabel color="text.main" fontSize="1.6rem" m="0" pt="4rem">
                  サークルが所属するキャンパス
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - キャンパスを選択してください
                </FormLabel>
                <Controller
                  name="campus"
                  control={control}
                  rules={{ required: "キャンパスを選択してください" }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      value={String(watch("campus"))}
                      onChange={(value) => {
                        setValue("campus", Number(value))
                      }}
                    >
                      <Stack
                        spacing="6rem"
                        direction="row"
                        justify="center"
                        pt="2rem"
                      >
                        <Radio value="0">八王子キャンパス</Radio>
                        <Radio value="1">蒲田キャンパス</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>
                  {errors.campus && errors.campus.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.clubType !== undefined}>
                <FormLabel color="text.main" fontSize="1.6rem" m="0" pt="4rem">
                  サークルの種類
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - サークルの種類を選択してください。
                </FormLabel>
                <Controller
                  name="clubType"
                  control={control}
                  rules={{ required: "サークルの種類を選択してください" }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      value={String(watch("clubType"))}
                      onChange={(value) => {
                        setValue("clubType", Number(value))
                      }}
                    >
                      <Stack
                        spacing="2.5rem"
                        direction="row"
                        justify="center"
                        pt="2rem"
                      >
                        <Radio value="0">体育会系</Radio>
                        <Radio value="1">文化会系</Radio>
                        <Radio value="2">実行委員会</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>
                  {errors.clubType && errors.clubType.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.contents !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  活動内容
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - 記入後、記入欄右の「+」ボタンを押して登録してください。
                </FormLabel>
                <HStack alignItems="start" spacing="1rem">
                  <Input
                    name="contents"
                    backgroundColor="#fff"
                    textColor="text.main"
                    placeholder="活動内容を1つ入力して下さい"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <EditorButton
                    paddingTop="0rem"
                    aria-label="Add content"
                    icon="add"
                    onClick={() => {
                      if (inputValue.trim() !== "") {
                        append({ content: inputValue })
                        setInputValue("")
                      }
                    }}
                  />
                </HStack>
                {fields.map((field, index) => (
                  <HStack key={field.id} alignItems="start" spacing="1rem">
                    <Box pt="0.5rem" display="flex" alignItems="center">
                      <Box
                        backgroundColor="#f0f0f0"
                        textColor="text.main"
                        p="0.5rem"
                        borderRadius="md"
                        flex="1"
                      >
                        {field.content}
                      </Box>
                      <EditorButton
                        paddingTop="0rem"
                        aria-label="Remove content"
                        icon="remove"
                        onClick={() => {
                          remove(index)
                        }}
                      />
                    </Box>
                  </HStack>
                ))}
                <FormErrorMessage>
                  {errors.contents && errors.contents.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.links !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  外部リンク
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - 記入後、記入欄右の「+」ボタンを押して登録してください。
                </FormLabel>
                <HStack alignItems="start" spacing="1rem">
                  <Select
                    backgroundColor="#fff"
                    w="12rem"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                  >
                    <option value="" hidden>
                      -
                    </option>
                    {VALID_SNS_LIST.map((item: string, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                    <option value="HP">HP</option>
                    <option value="other">その他</option>
                  </Select>

                  {linkLabel === "other" && (
                    <Input
                      name="links"
                      backgroundColor="#fff"
                      w="12rem"
                      placeholder="リンクラベルを入力"
                      value={customLinkLabel}
                      onChange={(e) => setCustomLinkLabel(e.target.value)}
                    />
                  )}

                  <Input
                    name="links"
                    backgroundColor="#fff"
                    placeholder="リンクURLを入力"
                    value={linkUrl}
                    onChange={(e) => {
                      setLinkUrl(e.target.value)
                    }}
                  />

                  <EditorButton
                    icon="add"
                    paddingTop="0rem"
                    onClick={() => {
                      try {
                        new URL(linkUrl.trim())
                      } catch (error) {
                        setError("links", {
                          type: "required",
                          message: `Invalid URL: ${linkUrl}`,
                        })
                        return
                      }
                      if (linkLabel.trim() && linkUrl.trim()) {
                        linkAppend({
                          label:
                            linkLabel !== "other"
                              ? linkLabel.trim()
                              : customLinkLabel.trim(),
                          url: linkUrl.trim(),
                        })
                        setLinkLabel("")
                        setLinkUrl("")
                        setCustomLinkLabel("")
                      }
                    }}
                  />
                </HStack>
                {linkFields.map((field, index) => (
                  <HStack key={field.id} alignItems="start" spacing="1rem">
                    <Box pt="0.5rem" display="flex" alignItems="center">
                      <Box
                        backgroundColor="#f0f0f0"
                        textColor="text.main"
                        p="0.5rem"
                        borderRadius="md"
                        flex="1"
                      >
                        {field.label} - {field.url}
                      </Box>
                      <EditorButton
                        icon="remove"
                        paddingTop="0rem"
                        onClick={() => linkRemove(index)}
                      />
                    </Box>
                  </HStack>
                ))}
                <FormErrorMessage>
                  {errors.links && errors.links.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.schedules !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  活動日程
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - 月ごとの活動スケジュールを入力してください。
                </FormLabel>
                <HStack>
                  <Select
                    backgroundColor="#fff"
                    w="12rem"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                  >
                    <option value="" hidden>
                      -
                    </option>
                    {MONTHS.map((item: Number, index) => (
                      <option key={index} value={String(item)}>
                        {String(item)}
                      </option>
                    ))}
                  </Select>
                  <Textarea
                    name="schedules"
                    backgroundColor="#fff"
                    placeholder="活動スケジュールを入力"
                    resize="none"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                  />
                  <EditorButton
                    icon="add"
                    paddingTop="0rem"
                    onClick={() => {
                      if (month && schedule) {
                        scheduleAppend({
                          month: month,
                          schedule: schedule,
                        })
                        setMonth(undefined)
                        setSchedule("")
                      }
                    }}
                  />
                </HStack>
                {scheduleFields.map((field, index) => (
                  <HStack key={field.id} alignItems="start" spacing="1rem">
                    <Box pt="0.5rem" display="flex" alignItems="center">
                      <Box
                        backgroundColor="#f0f0f0"
                        textColor="text.main"
                        p="0.5rem"
                        borderRadius="md"
                        flex="1"
                      >
                        {field.month}月 - {field.schedule}
                      </Box>
                      <EditorButton
                        icon="remove"
                        paddingTop="0rem"
                        onClick={() => scheduleRemove(index)}
                      />
                    </Box>
                  </HStack>
                ))}
                <FormErrorMessage>
                  {errors.schedules && errors.schedules.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.achievements !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  実績
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - 記入後、記入欄右の「+」ボタンを押して登録してください。
                </FormLabel>
                <HStack>
                  <Input
                    name="achievements"
                    backgroundColor="#fff"
                    placeholder="実績を入力"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                  />
                  <EditorButton
                    icon="add"
                    aria-label="Add content"
                    paddingTop="0rem"
                    onClick={() => {
                      if (achievement) {
                        achievementAppend({
                          achievement: achievement,
                        })
                        setAchievement("")
                      }
                    }}
                  />
                </HStack>
                {achievementFields.map((field, index) => (
                  <HStack key={field.id} alignItems="start" spacing="1rem">
                    <Box pt="0.5rem" display="flex" alignItems="center">
                      <Box
                        backgroundColor="#f0f0f0"
                        textColor="text.main"
                        p="0.5rem"
                        borderRadius="md"
                        flex="1"
                      >
                        {field.achievement}
                      </Box>
                      <EditorButton
                        icon="remove"
                        paddingTop="0rem"
                        aria-label="Remove content"
                        onClick={() => achievementRemove(index)}
                      />
                    </Box>
                  </HStack>
                ))}
                <FormErrorMessage>
                  {errors.achievements && errors.achievements.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.activityDetails !== undefined}>
                <FormLabel
                  color="text.main"
                  fontSize="1.6rem"
                  m="0"
                  pt="4rem"
                  pb="2rem"
                >
                  活動日時・場所
                </FormLabel>
                <FormLabel as="legend" color="text.sub" fontSize="1rem">
                  - 記入後、記入欄右の「+」ボタンを押して登録してください。
                </FormLabel>
                <HStack textColor="text.main">
                  <Stack spacing="0" pb="1.2rem">
                    <EditorLabel label="曜日" />
                    <Select
                      w="6rem"
                      backgroundColor="#fff"
                      textColor="text.main"
                      onChange={(e) => setDate(e.target.value)}
                      isDisabled={state.isDateDisabled}
                    >
                      <option value="" hidden>
                        -
                      </option>
                      {date_options.map((item, index) => {
                        return item.value !== "Etc" ? (
                          <option key={index} value={item.value}>
                            {item.displayName}
                          </option>
                        ) : (
                          <Fragment key={index}></Fragment>
                        )
                      })}
                    </Select>
                  </Stack>
                  <VStack spacing="0" pb="1.2rem">
                    <EditorLabel label="曜日を「その他」にする" />
                    <Flex h="40px" alignItems="center">
                      <Switch
                        colorScheme="green"
                        size="lg"
                        onChange={() => dispatch({ type: TOGGLE_DATE })}
                      />
                    </Flex>
                  </VStack>
                  <VStack spacing="0" pb="1.2rem">
                    <EditorLabel label="時間を「その他」にする" />
                    <Flex h="40px" alignItems="center">
                      <Switch
                        colorScheme="green"
                        size="lg"
                        isChecked={state.isTimeDisabled}
                        onChange={() => dispatch({ type: TOGGLE_TIME })}
                      />
                    </Flex>
                  </VStack>
                  <Box pl="2.4rem">
                    <EditorButton
                      icon="add"
                      aria-label="Add content"
                      paddingTop="0rem"
                      onClick={() => {
                        if (
                          building &&
                          (state.isDateDisabled || date) &&
                          (state.isTimeDisabled || (startHour && endHour))
                        ) {
                          activityDetailAppend({
                            date: date as DateType,
                            timeId: toTimeID(
                              date as DateType,
                              state.isTimeDisabled ? 0 : startHour,
                              state.isTimeDisabled ? 0 : startMinute,
                              state.isTimeDisabled ? 0 : endHour,
                              state.isTimeDisabled ? 0 : endMinute
                            ),
                            time: state.isTimeDisabled
                              ? "00:00-00:00"
                              : `${startHour}:${startMinute}-${endHour}:${endMinute}`,
                            timeRemark: timeRemark,
                            placeId: toPlaceID(
                              Number(building),
                              state.isRoomDisabled ? 0 : buildingRoom!
                            ),
                            place: `${BUILDING_ID_MAP[Number(building) as keyof typeof BUILDING_ID_MAP]}${state.isRoomDisabled ? "" : buildingRoom}`,
                            placeRemark: placeRemark,
                          })
                          setDate("Etc")
                          setStartHour(19)
                          setStartMinute(0)
                          setEndHour(21)
                          setEndMinute(0)
                          setTimeRemark("")
                          setPlaceRemark("")
                          setBuilding("")
                          setBuildingRoom(0)
                        }
                      }}
                    />
                  </Box>
                </HStack>
                <HStack textColor="text.main">
                  <Stack spacing="0" pb="1.2rem">
                    <EditorLabel label="開始時間" />
                    <NumberInput
                      width="5rem"
                      min={0}
                      max={23}
                      defaultValue={19}
                      isDisabled={state.isTimeDisabled}
                    >
                      <NumberInputField
                        backgroundColor="#fff"
                        onChange={(e) => setStartHour(Number(e.target.value))}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Stack>
                  <Stack spacing="0" pb="1.2rem">
                    <EditorText pb="1.2rem">:</EditorText>
                  </Stack>
                  <Stack spacing="0" py="1.2rem">
                    <NumberInput
                      width="5rem"
                      min={0}
                      max={59}
                      defaultValue={0}
                      isDisabled={state.isTimeDisabled}
                    >
                      <NumberInputField
                        backgroundColor="#fff"
                        onChange={(e) => setStartMinute(Number(e.target.value))}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Stack>
                  <Stack spacing="0" pb="1.2rem">
                    <EditorText>~</EditorText>
                  </Stack>
                  <Stack spacing="0" pb="1.2rem">
                    <EditorLabel label="終了時間" />
                    <NumberInput
                      width="5rem"
                      min={0}
                      max={23}
                      defaultValue={21}
                      isDisabled={state.isTimeDisabled}
                    >
                      <NumberInputField
                        backgroundColor="#fff"
                        onChange={(e) => setEndHour(Number(e.target.value))}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Stack>
                  <Stack spacing="0" pb="1.2rem">
                    <EditorText>:</EditorText>
                  </Stack>
                  <Stack spacing="0" py="1.2rem">
                    <NumberInput
                      width="5rem"
                      min={0}
                      max={23}
                      defaultValue={0}
                      isDisabled={state.isTimeDisabled}
                    >
                      <NumberInputField
                        backgroundColor="#fff"
                        onChange={(e) => setEndMinute(Number(e.target.value))}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Stack>
                </HStack>
                <HStack pb="1rem" spacing="1.5rem">
                  <Stack spacing="0">
                    <Box minH="1.2rem">
                      <EditorLabel label="時間に関する備考(任意)" />
                    </Box>
                    <Input
                      w="27rem"
                      backgroundColor="#fff"
                      textColor="text.main"
                      onChange={(e) => setTimeRemark(e.target.value)}
                    />
                  </Stack>
                </HStack>
                <HStack spacing="1.5rem">
                  <Stack spacing="0">
                    <EditorLabel label="活動場所" />
                    <Select
                      w="10rem"
                      backgroundColor="#fff"
                      textColor="text.main"
                      onChange={(e) => setBuilding(e.target.value)}
                    >
                      <option value="" hidden>
                        -
                      </option>
                      {place_options.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.displayName}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                  <Stack spacing="0" pt="1.2rem" pb="1.2rem">
                    <EditorLabel label="部屋番号" />
                    <NumberInput
                      width="8rem"
                      min={0}
                      max={2000}
                      defaultValue={0}
                      isDisabled={state.isRoomDisabled}
                    >
                      <NumberInputField
                        backgroundColor="#fff"
                        onChange={(e) =>
                          setBuildingRoom(Number(e.target.value))
                        }
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Stack>
                  <Stack spacing="0" pl="2rem" pb="1.2rem" pt="1.2rem">
                    <EditorLabel label="部屋番号なし" />
                    <Flex h="40px" alignItems="center">
                      <Switch
                        colorScheme="green"
                        size="lg"
                        isChecked={state.isRoomDisabled}
                        onChange={() => dispatch({ type: TOGGLE_ROOM })}
                      />
                    </Flex>
                  </Stack>
                </HStack>
                <HStack spacing="1.2rem">
                  <Stack spacing="0">
                    <Box minH="1.2rem">
                      <EditorLabel label="場所に関する備考(任意)" />
                    </Box>
                    <Input
                      w="27rem"
                      backgroundColor="#fff"
                      textColor="text.main"
                      onChange={(e) => setPlaceRemark(e.target.value)}
                    />
                  </Stack>
                </HStack>
                {activityDetailFields.map((field, index) => (
                  <HStack key={field.id} alignItems="start" spacing="1rem">
                    <Box pt="0.5rem" display="flex" alignItems="center">
                      <Box
                        backgroundColor="#f0f0f0"
                        textColor="text.main"
                        p="0.5rem"
                        borderRadius="md"
                        flex="1"
                      >
                        {!field.date && `${field.date} - `}
                        {!field.time && `${field.time} - `}
                        {field.place}
                      </Box>
                      <EditorButton
                        icon="remove"
                        paddingTop="0rem"
                        onClick={() => activityDetailRemove(index)}
                      />
                    </Box>
                  </HStack>
                ))}
                <FormErrorMessage>
                  {errors.activityDetails && errors.activityDetails.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          <PortalButton type="submit">登録</PortalButton>
        </EditorBase>
      </form>
    </VStack>
  )
}
