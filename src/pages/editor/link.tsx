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
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { EditorButton } from "../../components/common/Editor/EditorButton"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER, VALID_SNS_LIST } from "../../utils/consts"
import * as z from "zod"
import { PortalButton } from "../../components/common/Button"
import type { SNSType } from "../../types/description"
import { useAPI } from "../../hooks/useAPI"
import type { Link } from "../../types/api"
import { useOutletUser } from "../../hooks/useOutletUser"
import { Loading } from "../../components/global/LoadingPage"
import { ErrorPage } from "../error"
import type { AxiosRequestConfig } from "axios"
import { axiosWithPayload } from "../../utils/axios"
import { useErrorToast } from "../../hooks/useErrorToast"
import { EditorLabel } from "../../components/common/Editor/CommonEditorComponent"
import { useSuccessToast } from "../../hooks/useSuccessToast"

const schema = z.object({
  label: z.string(),
  url: z.string().url(),
  otherLabel: z.string().optional(),
})

export const LinkEditor: React.VFC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data, isLoading, isError } = useAPI<Array<Link>>(
    `/api/v1/clubs/uuid/${clubUuid!}/link`
  )
  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Link & { otherLabel?: string }>({
    resolver: zodResolver(schema),
  })
  const [items, setItems] = useState<Array<Link>>([])
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")
  const [isOther, setIsOther] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      const v = data.filter((d) => d.label !== "HP" && d.label !== "Email")
      setItems(v)
    }
  }, [data])

  const values = watch()

  const onAdd = () => {
    let err = false
    if (values.label === "" && !isOther) {
      err = true
      setError("label", {
        type: "required",
        message: "SNSを選択してください。",
      })
    } else {
      clearErrors("label")
    }

    if (isOther) {
      if (values.otherLabel === undefined || values.otherLabel === "") {
        err = true
        setError("otherLabel", {
          type: "required",
          message: "その他のSNSを入力してください",
        })
      } else if (
        !z
          .string()
          .regex(/^[A-Z]/)
          .safeParse(values.otherLabel).success
      ) {
        err = true
        setError("otherLabel", {
          type: "required",
          message: "先頭大文字の半角英数字で入力して下さい",
        })
      } else {
        clearErrors("otherLabel")
      }
    } else {
      clearErrors("otherLabel")
    }

    if (values.url === "" || !z.string().url().safeParse(values.url).success) {
      err = true
      setError("url", {
        type: "validate",
        message: "有効なURLではありません。",
      })
    } else {
      clearErrors("url")
    }

    let isExist = false
    for (const item of items) {
      const label = isOther ? values.otherLabel!.trim() : values.label.trim()
      if (label === item.label && values.url.trim() === item.url) {
        isExist = true
      }
    }
    if (isExist) {
      err = true
      setError("url", {
        type: "validate",
        message: "既に登録済みです",
      })
    }

    if (!err) {
      const v: Link = {
        label: isOther ? values.otherLabel!.trim() : values.label.trim(),
        url: values.url,
      }
      setItems([v, ...items])
    }
  }

  const onRemove = (item: Link) => {
    setItems(items.filter((obj) => !Object.is(obj, item)))
  }

  const onSubmit = handleSubmit(async () => {
    const requestConfig: AxiosRequestConfig<Array<Link>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/link`,
      method: "put",
      data: items,
    }
    try {
      await axiosWithPayload<Array<Link>, Array<Link>>(requestConfig)
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
      <TitleArea>SNSリンクの編集</TitleArea>
      <form onSubmit={onSubmit}>
        <EditorBase>
          <Stack>
            <HStack alignItems="start">
              <EditorButton icon="add" onClick={onAdd} />
              <Stack spacing="0">
                <FormControl isInvalid={errors.label !== undefined}>
                  <EditorLabel label="SNS" />
                  <Stack>
                    <Select
                      backgroundColor="#fff"
                      w="12rem"
                      {...register("label", {
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          setIsOther(e.target.value === "other")
                        },
                      })}
                    >
                      <option value="" hidden>
                        -
                      </option>
                      {VALID_SNS_LIST.map((item: SNSType) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      })}
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
                      placeholder="その他のSNSを入力"
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
              {items.map((item) => {
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
          <PortalButton type="submit">保存</PortalButton>
        </EditorBase>
      </form>
    </VStack>
  )
}
