import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { EditorButton } from "../../components/common/Editor/EditorButton"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER, VALID_SNS_LIST } from "../../utils/consts"
import * as z from "zod"
import { PortalButton } from "../../components/common/Button"
import { SNSType } from "../../types/description"
import { useAPI } from "../../hooks/useAPI"
import { Link } from "../../types/api"
import { useOutletUser } from "../../hooks/useOutletUser"

type SNSLinkItem = {
  label: string
  url: string
}

const schema = z.object({
  label: z.string(),
  url: z.string().url(),
})

export const LinkEditor: React.VFC<{}> = () => {
  // const { clubUUID } = useOutletUser()
  // const { data, isLoading, isError } = useAPI<Array<Link>>(
  //   `/api/v1/uuid/${clubUUID!}/link`
  // )
  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SNSLinkItem>({
    defaultValues: { label: "", url: "" },
    resolver: zodResolver(schema),
  })
  const [items, setItems] = useState<Array<SNSLinkItem>>([])

  const values = watch()

  const onAdd = () => {
    console.log(values)
    let err = false
    if (values.label === "") {
      err = true
      setError("label", { type: "required", message: "SNSを選択してください." })
    } else {
      clearErrors("label")
    }
    if (values.url === "" || !z.string().url().safeParse(values.url).success) {
      err = true
      setError("url", { type: "validate", message: "有効なURLではありません." })
    } else {
      clearErrors("url")
    }
    if (!err) {
      setItems([values, ...items])
    }
  }

  const onRemove = (item: SNSLinkItem) => {
    setItems(items.filter((obj) => !Object.is(obj, item)))
  }

  const onSubmit = handleSubmit((data) => {
    // TODO: Submit process
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>SNSリンクの編集</TitleArea>
      <form onSubmit={onSubmit}>
        <EditorBase>
          <HStack alignItems="end">
            <EditorButton icon="add" onClick={() => onAdd()} />
            <Stack spacing="0">
              <FormControl isInvalid={errors.label !== undefined}>
                <FormLabel htmlFor="sns" fontSize="0.8rem" color="text.sub">
                  SNS
                </FormLabel>
                <Select
                  backgroundColor="#fff"
                  w="12rem"
                  {...register("label")}
                  defaultValue=""
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
                </Select>
                <FormErrorMessage>
                  {errors.label && errors.label.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack spacing="0">
              <FormControl isInvalid={errors.url !== undefined}>
                <FormLabel htmlFor="url" fontSize="0.8rem" color="text.sub">
                  URL
                </FormLabel>
                <Input
                  w="25rem"
                  placeholder="URLを入力して下さい"
                  backgroundColor="#fff"
                  {...register("url", {
                    required: true,
                  })}
                />
                <FormErrorMessage>
                  {errors.url && errors.url.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </HStack>
          <Stack w="100%">
            {items.map((item) => {
              return (
                <HStack key={item.label} textColor="text.main">
                  <EditorButton icon="remove" onClick={() => onRemove(item)} />
                  <Text>{item.label + " - "}</Text>
                  <Text>{item.url}</Text>
                </HStack>
              )
            })}
          </Stack>
          <PortalButton type="submit">保存</PortalButton>
        </EditorBase>
      </form>
    </VStack>
  )
}
