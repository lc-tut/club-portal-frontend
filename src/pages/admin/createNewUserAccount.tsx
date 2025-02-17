import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  VStack,
  Input,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosRequestConfig } from "axios"
import type React from "react"
import { z } from "zod"

import { AdminBase } from "../../components/common/Admin/AdminBase"
import { PortalButton } from "../../components/common/Button"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { AddGeneralUserPayload, UserInfo } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

// eslint-disable-next-line import/order
import { useForm } from "react-hook-form"

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export const CreateNewUserAccount: React.FC<{}> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const errorToast = useErrorToast("ユーザの作成に失敗しました。")
  const successToast = useSuccessToast("ユーザの作成が完了しました！")

  const onSubmit = handleSubmit(async (data) => {
    const requestConfig: AxiosRequestConfig<AddGeneralUserPayload> = {
      url: `/api/v1/users`,
      method: "post",
      data: {
        name: data.name,
        email: data.email,
      },
    }

    try {
      await axiosWithPayload<AddGeneralUserPayload, UserInfo>(requestConfig)
      successToast()
    } catch (e) {
      errorToast()
    }
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークルアカウント新規追加</TitleArea>
      <Stack>
        <form onSubmit={onSubmit}>
          <AdminBase>
            <VStack spacing="2rem">
              <FormControl isInvalid={errors.name != undefined}>
                <FormLabel>サークル名</FormLabel>
                <Input
                  w="30rem"
                  bg={"white"}
                  placeholder="LinuxClub"
                  {...register("name", { required: true })}
                />
                <FormErrorMessage>
                  サークル名を入力してください
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email != undefined}>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  w="30rem"
                  bg={"white"}
                  placeholder="tut.clubportal.dev@gmail.com"
                  {...register("email", { required: true })}
                />
                <FormErrorMessage>
                  メールアドレスを入力してください。
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <PortalButton type="submit">保存</PortalButton>
          </AdminBase>
        </form>
      </Stack>
    </VStack>
  )
}
