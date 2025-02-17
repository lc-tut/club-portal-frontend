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
import { useLocation } from "react-router-dom"
import { z } from "zod"

import { AdminBase } from "../../components/common/Admin/AdminBase"
import { PortalButton } from "../../components/common/Button"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { UserInfo } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

// eslint-disable-next-line import/order
import { useForm } from "react-hook-form"

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export const EditGeneralUser: React.FC<{}> = () => {
  const clubSlug = useLocation()
  const { data: userData } = useAPI<UserInfo | null>(
    !clubSlug.pathname.startsWith("/admin/users/edit")
      ? null
      : `/api/v1/admin/users${clubSlug.pathname.replace("/admin/users/edit", "")}`
  )
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userData?.name ?? "",
      email: userData?.email ?? "",
    },
  })

  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")

  const onSubmit = handleSubmit(async (data) => {
    // TODO: 同一のデータを送信すると500になるため、修正が必要
    if (userData?.name === data.name && userData?.email === data.email) return

    if (!userData || !userData.userUuid) return

    const payload: UserInfo = {
      name: data.name,
      email: data.email,
      role: "general",
      userUuid: userData?.userUuid,
    }

    const requestConfig: AxiosRequestConfig<UserInfo> = {
      url: `/api/v1/admin/users/${userData.userUuid}`,
      method: "put",
      data: payload,
    }

    try {
      await axiosWithPayload<UserInfo, UserInfo>(requestConfig)
      successToast()
    } catch (e) {
      errorToast()
    }
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークルアカウント編集</TitleArea>
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
