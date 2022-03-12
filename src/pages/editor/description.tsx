import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useOutletUser } from "../../hooks/useOutletUser"
import { Description } from "../../types/api"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loading } from "../../components/global/LoadingPage"
import { ErrorPage } from "../error"
import { axiosWithPayload } from "../../utils/axios"
import { AxiosRequestConfig } from "axios"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useEffect, useState } from "react"

const schema = z.object({
  desciption: z.string(),
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
  const toast = useErrorToast("データの保存に失敗しました。")

  useEffect(() => {
    if (data) {
      setDesc(data.description)
    }
  }, [data])

  const onSubmit = handleSubmit(async (data) => {
    const requestConfig: AxiosRequestConfig<Description> = {
      url: `/api/v1/uuid/${clubUuid!}/description`,
      method: "put",
      data: data,
    }
    try {
      await axiosWithPayload<Description, Description>(requestConfig)
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
      <TitleArea>サークル説明文の編集</TitleArea>
      <form onSubmit={onSubmit}>
        <EditorBase>
          <FormControl isInvalid={errors.description !== undefined}>
            <FormLabel fontSize="0.8rem" color="text.sub">
              サークルの説明文
            </FormLabel>
            <Textarea
              {...(register("description"),
              {
                required: true,
                minLength: 1,
              })}
              backgroundColor="#fff"
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
    </VStack>
  )
}
