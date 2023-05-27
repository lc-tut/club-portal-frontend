import {
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosRequestConfig } from "axios"
import type { ChangeEvent } from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { EditorLabel } from "../../components/common/Editor/CommonEditor"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { EditorButton } from "../../components/common/Editor/EditorButton"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { Link } from "../../types/api"
import type { LinkType } from "../../types/description"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER, VALID_SNS_LIST } from "../../utils/consts"

const schema = z.object({
  label: z
    .string()
    .refine((v) => VALID_SNS_LIST.includes(v as LinkType) || v === "other"),
  url: z.string().url().nonempty(),
  otherLabel: z.string().optional(),
})

export const LinkEditor: React.FC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<Link>>(`/api/v1/clubs/uuid/${clubUuid!}/link`)
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Link & { otherLabel?: string }>({
    resolver: zodResolver(schema),
  })
  const [links, setLinks] = useState<Array<Link>>([])
  const [isOther, setIsOther] = useState<boolean>(false)
  const errorAddToast = useErrorToast("データの追加に失敗しました。")
  const errorRemoveToast = useErrorToast("データの削除に失敗しました。")
  const successAddToast = useSuccessToast("データの追加が完了しました！")
  const successRemoveToast = useSuccessToast("データの削除が完了しました！")

  useEffect(() => {
    if (data) {
      const v = data.filter((d) => d.label !== "Email")
      setLinks(v)
    }
  }, [data])

  const onRemove = async (item: Link) => {
    const filteredLinks = links.filter((obj) => !Object.is(obj, item))
    const requestConfig: AxiosRequestConfig<Array<Link>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/link`,
      method: "put",
      data: filteredLinks,
    }
    try {
      await axiosWithPayload<Array<Link>, Array<Link>>(requestConfig)
      successRemoveToast()
      setLinks(filteredLinks)
    } catch (e) {
      errorRemoveToast()
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    let newData: Link
    if (isOther) {
      if (data.otherLabel === undefined || data.otherLabel === "") {
        setError("otherLabel", {
          type: "required",
          message: "その他のリンクを入力してください。",
        })
        return
      } else if (
        !z
          .string()
          .regex(/^[A-Z]/)
          .safeParse(data.otherLabel).success
      ) {
        setError("otherLabel", {
          type: "required",
          message: "先頭大文字の半角英数字で入力して下さい。",
        })
        return
      } else {
        newData = { label: data.otherLabel.trim(), url: data.url.trim() }
        clearErrors("otherLabel")
      }
    } else {
      newData = { label: data.label, url: data.url }
    }
    const resultData = [newData, ...links]
    const requestConfig: AxiosRequestConfig<Array<Link>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/link`,
      method: "put",
      data: resultData,
    }
    try {
      await axiosWithPayload<Array<Link>, Array<Link>>(requestConfig)
      successAddToast()
      setLinks(resultData)
    } catch (e) {
      errorAddToast()
    }
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>リンクの編集</TitleArea>
      <form onSubmit={onSubmit}>
        <EditorBase>
          <Stack>
            <HStack alignItems="start">
              <EditorButton icon="add" type="submit" />
              <Stack spacing="0">
                <FormControl isInvalid={errors.label !== undefined}>
                  <EditorLabel label="リンク" />
                  <Stack>
                    <Select
                      backgroundColor="#fff"
                      w="12rem"
                      {...register("label", {
                        onChange: (e: ChangeEvent<HTMLSelectElement>) =>
                          setIsOther(e.target.value === "other"),
                      })}
                    >
                      <option value="" hidden>
                        -
                      </option>
                      {VALID_SNS_LIST.map((item: LinkType, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        )
                      })}
                      <option value="HP">HP</option>
                      <option value="other">その他</option>
                    </Select>
                    <Wrap h="1.2rem">
                      <FormErrorMessage>
                        {errors.label && errors.label.message}
                      </FormErrorMessage>
                    </Wrap>
                  </Stack>
                </FormControl>
                <FormControl isInvalid={errors.otherLabel !== undefined}>
                  <Stack>
                    <Input
                      w="12rem"
                      backgroundColor="#fff"
                      textColor="text.main"
                      placeholder="その他のリンクを入力"
                      {...register("otherLabel", {
                        disabled: !isOther,
                      })}
                    />
                    <Wrap h="1.2rem">
                      <FormErrorMessage w="12rem">
                        {errors.otherLabel && errors.otherLabel.message}
                      </FormErrorMessage>
                    </Wrap>
                  </Stack>
                </FormControl>
              </Stack>
              <Stack spacing="0">
                <FormControl isInvalid={errors.url !== undefined}>
                  <EditorLabel label="URL" />
                  <Input
                    w="25rem"
                    placeholder="URLを入力して下さい"
                    backgroundColor="#fff"
                    {...register("url", {
                      required: true,
                    })}
                  />
                  <Wrap h="2.2rem">
                    <FormErrorMessage>
                      {errors.url && errors.url.message}
                    </FormErrorMessage>
                  </Wrap>
                </FormControl>
              </Stack>
            </HStack>
            <Stack w="100%">
              {links.map((item) => {
                return (
                  <HStack key={item.label + item.url} textColor="text.main">
                    <EditorButton
                      icon="remove"
                      onClick={() => onRemove(item)}
                      paddingTop="0"
                    />
                    <Text>{item.label + " - "}</Text>
                    <Text>{item.url}</Text>
                  </HStack>
                )
              })}
            </Stack>
          </Stack>
        </EditorBase>
      </form>
    </VStack>
  )
}
