import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { ClubPageInternal, Name } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

const schema = z.object({
  name: z.string().nonempty("サークル名を入力してください"),
})

export const NameEditor: React.FC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<ClubPageInternal>(`/api/v1/clubs/uuid/${clubUuid!}`)
  const [name, setName] = useState<string>("")
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Name>({
    resolver: zodResolver(schema),
  })
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")

  useEffect(() => {
    if (data) {
      setName(data.name)
    }
  }, [data])

  const onSubmit = handleSubmit(async (data) => {
    const requestConfig: AxiosRequestConfig<Name> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/name`,
      method: "put",
      data: data,
    }
    try {
      await axiosWithPayload<Name, Name>(requestConfig)
      successToast()
    } catch (e) {
      errorToast()
    }
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークル名の編集</TitleArea>
      <EditorBase>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={errors.name !== undefined}>
            <FormLabel fontSize="0.8rem" color="text.sub">
              サークル名
            </FormLabel>
            <Input
              backgroundColor="#fff"
              color="text.main"
              w="30rem"
              h="3rem"
              placeholder="サークル名を入力してください"
              defaultValue={name}
              {...register("name", {
                required: true,
                minLength: 1,
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <PortalButton type="submit">保存</PortalButton>
        </form>
      </EditorBase>
    </VStack>
  )
}
