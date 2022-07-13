import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react"
import { EditorButton } from "./EditorButton"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Content } from "../../../types/api"
import { useState, useEffect } from "react"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import { useAPI } from "../../../hooks/useAPI"
import { useOutletUser } from "../../../hooks/useOutletUser"
import type { AxiosRequestConfig } from "axios"
import { axiosWithPayload } from "../../../utils/axios"
import { EditorBase } from "./EditorBase"

type ContentType = {
  content: string
}

const schema = z.object({
  content: z.string().nonempty(),
})

export const ContentEditor: React.VFC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<Content>>(
    `/api/v1/clubs/uuid/${clubUuid!}/content`
  )
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContentType>({
    resolver: zodResolver(schema),
  })
  const [contents, setContents] = useState<Array<Content>>([])
  const errorAddToast = useErrorToast("データの追加に失敗しました。")
  const errorRemoveToast = useErrorToast("データの削除に失敗しました。")
  const successAddToast = useSuccessToast("データの追加が完了しました！")
  const successRemoveToast = useSuccessToast("データの削除が完了しました！")

  useEffect(() => {
    if (data) {
      setContents(data)
    }
  }, [data])

  const onSubmit = handleSubmit(async (data) => {
    const resultData = [data, ...contents]
    const requestConfig: AxiosRequestConfig<Array<Content>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/content`,
      method: "put",
      data: resultData,
    }
    try {
      await axiosWithPayload<Array<Content>, Array<Content>>(requestConfig),
        successAddToast()
      setContents(resultData)
    } catch (e) {
      errorAddToast()
    }
  })

  const onRemove = async (item: Content) => {
    const filteredContents = contents.filter(
      (content) => !Object.is(content, item)
    )
    const requestConfig: AxiosRequestConfig<Array<Content>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/content`,
      method: "put",
      data: filteredContents,
    }
    try {
      await axiosWithPayload<Array<Content>, Array<Content>>(requestConfig)
      successRemoveToast()
      setContents(filteredContents)
    } catch (e) {
      errorRemoveToast()
    }
  }

  return (
    <Stack spacing="0" align="center">
      <EditorBase>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={errors.content !== undefined} w="45rem">
            <FormLabel color="text.main" fontSize="1.2rem">
              活動内容
            </FormLabel>
            <HStack alignItems="start">
              <EditorButton icon="add" paddingTop="0" type="submit" />
              <Stack spacing="0" flex="1">
                <Input
                  backgroundColor="#fff"
                  textColor="text.main"
                  placeholder="活動内容を1つ入力して下さい"
                  {...register("content")}
                />
                <Wrap h="1.2rem">
                  <FormErrorMessage>
                    {errors.content && errors.content.message}
                  </FormErrorMessage>
                </Wrap>
              </Stack>
            </HStack>
          </FormControl>
          <Stack>
            {contents.map((item, index) => {
              return (
                <HStack key={index} textColor="text.main">
                  <EditorButton
                    icon="remove"
                    onClick={() => onRemove(item)}
                    paddingTop="0"
                  />
                  <Text>{item.content}</Text>
                </HStack>
              )
            })}
          </Stack>
        </form>
      </EditorBase>
    </Stack>
  )
}
