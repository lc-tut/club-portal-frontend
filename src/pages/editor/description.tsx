import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { Loading } from "../../components/global/LoadingPage"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { Description } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { ErrorPage } from "../error"

const schema = z.object({
  description: z.string().nonempty(),
})

export const DescriptionEditor: React.VFC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data, isLoading, isError } = useAPI<Description>(
    `/api/v1/clubs/uuid/${clubUuid!}/description`
  )
  const [desc, setDesc] = useState<string>("")
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Description>({
    resolver: zodResolver(schema),
  })
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")

  useEffect(() => {
    if (data) {
      setDesc(data.description)
    }
  }, [data])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const requestConfig: AxiosRequestConfig<Description> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/description`,
      method: "put",
      data: data,
    }
    try {
      await axiosWithPayload<Description, Description>(requestConfig)
      successToast()
    } catch (e) {
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
      <TitleArea>サークル説明文の編集</TitleArea>
      <Stack>
        <form onSubmit={onSubmit}>
          <EditorBase>
            <FormControl isInvalid={errors.description !== undefined}>
              <FormLabel fontSize="0.8rem" color="text.sub">
                サークルの説明文
              </FormLabel>
              <Textarea
                {...register("description", {
                  required: true,
                  minLength: 1,
                  value: data?.description,
                })}
                backgroundColor="#fff"
                color="text.main"
                w="30rem"
                h="10rem"
                placeholder="サークルの説明文を入力して下さい"
                defaultValue={desc}
                resize="none"
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <PortalButton type="submit">保存</PortalButton>
          </EditorBase>
        </form>
      </Stack>
    </VStack>
  )
}
