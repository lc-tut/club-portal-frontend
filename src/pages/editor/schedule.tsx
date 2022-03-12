import { Grid, GridItem, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { MONTHS, PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import type { Schedule } from "../../types/api"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useAPI } from "../../hooks/useAPI"
import { Loading } from "../../components/global/LoadingPage"
import { ErrorPage } from "../error"
import { axiosWithPayload } from "../../utils/axios"
import type { AxiosRequestConfig } from "axios"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useEffect, useState } from "react"

type MonthInputAreaProps = {
  month: number
  value?: string
}

const MonthInputArea: React.VFC<MonthInputAreaProps> = (props) => {
  const { register } = useFormContext<Array<Schedule>>()

  return (
    <Stack>
      <input
        width={0}
        height={0}
        value={props.month}
        {...register(`${props.month - 1}.month`)}
        hidden
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
        {...register(`${props.month - 1}.schedule`)}
        resize="none"
      />
    </Stack>
  )
}

type scheduleObjType = { [key in number]?: string }

export const ScheduleEditor: React.VFC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data, isLoading, isError } = useAPI<Array<Schedule>>(
    `/api/v1/clubs/uuid/${clubUuid!}/schedule`
  )
  const methods = useForm<Array<Schedule>>()
  const toast = useErrorToast("データの保存に失敗しました。")
  const [schedule, setSchedule] = useState<scheduleObjType>({})

  useEffect(() => {
    if (data) {
      const obj: scheduleObjType = {}
      data.map((d) => (obj[d.month] = d.schedule))
      setSchedule(obj)
    }
  }, [data])

  const onSubmit = methods.handleSubmit(async (data) => {
    const payload = data.filter((d) => d.schedule !== "")
    const requestConfig: AxiosRequestConfig<Array<Schedule>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/schedule`,
      method: "put",
      data: payload,
    }
    try {
      await axiosWithPayload<Array<Schedule>, Array<Schedule>>(requestConfig)
    } catch (e) {
      toast()
    }
  })

  if (isLoading) {
    return <Loading fullScreen />
  }

  if (isError) {
    return <ErrorPage />
  }

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
