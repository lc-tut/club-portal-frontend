import {
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import type { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"

import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { Schedule } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { MONTHS, PADDING_BEFORE_FOOTER } from "../../utils/consts"

type MonthInputAreaProps = {
  month: number
  value?: string
}

const MonthInputArea: React.FC<MonthInputAreaProps> = (props) => {
  const { register } = useFormContext<FormScheduleType>()

  return (
    <Stack>
      <Input
        width={0}
        height={0}
        value={props.month}
        hidden
        {...register(`schedules.${props.month - 1}.month`, {
          value: props.month,
          valueAsNumber: true,
        })}
      />
      <Text pl="0.2rem" color="text.main">
        {props.month.toString() + "月"}
      </Text>
      <Textarea
        w="20rem"
        h="4rem"
        textColor="text.main"
        backgroundColor="#fff"
        defaultValue={props.value}
        resize="none"
        {...register(`schedules.${props.month - 1}.schedule`, {
          value: props.value,
        })}
      />
    </Stack>
  )
}

type scheduleObjType = Record<number, string>

type FormScheduleType = {
  schedules: Array<Schedule>
}

export const ScheduleEditor: React.FC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<Schedule>>(
    `/api/v1/clubs/uuid/${clubUuid!}/schedule`
  )
  const methods = useForm<FormScheduleType>()
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")
  const [schedule, setSchedule] = useState<scheduleObjType>({})

  useEffect(() => {
    if (data) {
      const obj: scheduleObjType = {}
      data.map((d) => {
        obj[d.month] = d.schedule
        methods.setValue(`schedules.${d.month - 1}.schedule`, d.schedule) // MonthInputArea 内の Textarea が壊れているので強制的に
      })
      setSchedule(obj)
    }
  }, [data, methods])

  const onSubmit = methods.handleSubmit(async (data) => {
    const payload = data.schedules.filter((d) => d.schedule !== "")
    const requestConfig: AxiosRequestConfig<Array<Schedule>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/schedule`,
      method: "put",
      data: payload,
    }
    try {
      await axiosWithPayload<Array<Schedule>, Array<Schedule>>(requestConfig)
      successToast()
    } catch (e) {
      errorToast()
    }
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>年間予定の編集</TitleArea>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <EditorBase>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              columnGap="2rem"
              rowGap="2rem"
            >
              {MONTHS.map((item) => {
                return (
                  <GridItem key={item}>
                    <MonthInputArea month={item} value={schedule[item]} />
                  </GridItem>
                )
              })}
            </Grid>
            <PortalButton type="submit">保存</PortalButton>
          </EditorBase>
        </form>
      </FormProvider>
    </VStack>
  )
}
