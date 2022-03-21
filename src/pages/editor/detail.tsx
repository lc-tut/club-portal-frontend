import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"
import { PortalButton } from "../../components/common/Button"
import { AchievementEditor } from "../../components/common/Editor/AchievementEditor"
import { ContentEditor } from "../../components/common/Editor/ContentEditor"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { PlaceAndTimeEditor } from "../../components/common/Editor/PlaceAndTimeEditor"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { Loading } from "../../components/global/LoadingPage"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type {
  Achievement,
  ActivityDetail,
  Content,
  Link,
} from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { ErrorPage } from "../error"

type FormType = {
  email: string
  homePage: string
}

const schema = z.object({
  email: z.string().email("正しいメールアドレスを入力してください。"),
  homePage: z.string().url("正しいURLを入力してください。").optional(),
})

// FIXME: should rewrite
export const DetailEditor: React.VFC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const achievementResponse = useAPI<Array<Achievement>>(
    `/api/v1/clubs/uuid/${clubUuid!}/achievement`
  )
  const timePlaceResponse = useAPI<Array<ActivityDetail>>(
    `/api/v1/clubs/uuid/${clubUuid!}/activity_detail`
  )
  const contentResponse = useAPI<Array<Content>>(
    `/api/v1/clubs/uuid/${clubUuid!}/content`
  )
  const linkResponse = useAPI<Array<Link>>(
    `/api/v1/clubs/uuid/${clubUuid!}/link`
  )
  const methods = useForm<FormType>({ resolver: zodResolver(schema) })
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")
  const [achievements, setAchievements] = useState<Array<string>>([])
  const [contents, setContents] = useState<Array<string>>([])
  const [email, setEmail] = useState<string | undefined>()
  const [HP, setHP] = useState<string | undefined>()
  const [activityDetails, setActivityDetails] = useState<Array<ActivityDetail>>(
    []
  )
  const isLoading =
    achievementResponse.isLoading ||
    contentResponse.isLoading ||
    linkResponse.isLoading ||
    timePlaceResponse.isLoading
  const isError =
    achievementResponse.isError ||
    contentResponse.isError ||
    linkResponse.isError ||
    timePlaceResponse.isError

  useEffect(() => {
    if (achievementResponse.data) {
      setAchievements(
        achievementResponse.data.map((achivement) => achivement.achievement)
      )
    }
    if (contentResponse.data) {
      setContents(contentResponse.data.map((content) => content.content))
    }
    if (linkResponse.data) {
      setEmail(
        linkResponse.data
          .filter((link) => link.label === "Email")
          .map((link) => link.url)[0]
      )
      setHP(
        linkResponse.data
          .filter((link) => link.label === "HP")
          .map((link) => link.url)?.[0]
      )
    }
    if (timePlaceResponse.data) {
      setActivityDetails(timePlaceResponse.data)
    }
  }, [
    achievementResponse.data,
    contentResponse.data,
    linkResponse.data,
    timePlaceResponse.data,
  ])

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(activityDetails)

    const achievementRequestConfig: AxiosRequestConfig<Array<Achievement>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/achievement`,
      method: "put",
      data: achievements.map((achievement) => ({ achievement: achievement })),
    }
    const activityDetailRequestConfig: AxiosRequestConfig<
      Array<ActivityDetail>
    > = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/activity_detail`,
      method: "put",
      data: activityDetails,
    }
    const contentRequestConfig: AxiosRequestConfig<Array<Content>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/content`,
      method: "put",
      data: contents.map((content) => ({ content: content })),
    }
    const links: Array<Link> = [{ label: "Email", url: data.email }]
    if (data.homePage) links.push({ label: "HP", url: data.homePage })
    const linkRequestConfig: AxiosRequestConfig<Array<Link>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/link`,
      method: "put",
      data: links,
    }
    try {
      await Promise.all([
        axiosWithPayload<Array<Achievement>, Array<Achievement>>(
          achievementRequestConfig
        ),
        axiosWithPayload<Array<ActivityDetail>, Array<ActivityDetail>>(
          activityDetailRequestConfig
        ),
        axiosWithPayload<Array<Content>, Array<Content>>(contentRequestConfig),
        axiosWithPayload<Array<Link>, Array<Link>>(linkRequestConfig),
      ])
      successToast()
    } catch {
      errorToast()
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
      <TitleArea>詳細情報の編集</TitleArea>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <EditorBase>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              columnGap="1rem"
              rowGap="3rem"
            >
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <ContentEditor items={contents} setItems={setContents} />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <PlaceAndTimeEditor
                  items={activityDetails}
                  setItems={setActivityDetails}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <AchievementEditor
                  items={achievements}
                  setItems={setAchievements}
                />
              </GridItem>
              <GridItem>
                <FormControl
                  isInvalid={methods.formState.errors.email !== undefined}
                >
                  <FormLabel color="text.main" pl="0.2rem" fontSize="1.2rem">
                    連絡先のメールアドレス
                  </FormLabel>
                  <Input
                    {...methods.register("email", {
                      value: email,
                      required: {
                        value: true,
                        message: "メールアドレスが空白です！",
                      },
                    })}
                    placeholder={"メールアドレスを入力して下さい"}
                    w="20rem"
                    backgroundColor="#fff"
                    textColor="text.main"
                    defaultValue={email}
                  />
                  <Wrap h="1.2rem">
                    <FormErrorMessage>
                      {methods.formState.errors.email &&
                        methods.formState.errors.email.message}
                    </FormErrorMessage>
                  </Wrap>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel color="text.main" pl="0.2rem" fontSize="1.2rem">
                    HPのURL
                  </FormLabel>
                </FormControl>
                <Input
                  placeholder={"HPのURLを入力して下さい"}
                  w="20rem"
                  backgroundColor="#fff"
                  textColor="text.main"
                  defaultValue={HP}
                  {...methods.register("homePage", {
                    value: HP,
                    required: false,
                  })}
                />
              </GridItem>
            </Grid>
            <PortalButton type="submit">保存</PortalButton>
          </EditorBase>
        </form>
      </FormProvider>
    </VStack>
  )
}
