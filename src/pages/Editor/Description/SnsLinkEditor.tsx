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
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { EditorButton } from "../../../components/common/Editor/EditorButton"
import { TitleArea } from "../../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER, VALID_SNS_LIST } from "../../../static/consts"
import * as z from "zod"

type SNSLinkItem = {
  label: string
  url: string
}

const schema = z.object({
  label: z.string(),
  url: z.string().url(),
})

type SNSLinkEditorProps = {
  initialItems: Array<SNSLinkItem>
}

export const SNSLinkEditor: React.VFC<SNSLinkEditorProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SNSLinkItem>({
    resolver: zodResolver(schema),
  })

  const [items, setItems] = useState<Array<SNSLinkItem>>(props.initialItems)
  const [type, setType] = useState<"add" | "remove">("add")

  const onAdd = (item: SNSLinkItem) => {
    const updateItems = [...items, item]
    setItems(updateItems)
  }

  const onRemove = () => {
    // API による remove
  }

  const onSubmit = handleSubmit((data) => {
    switch (type) {
      case "add":
        onAdd({ label: data.label, url: data.url })
        break
      case "remove":
        onRemove()
        break
    }
  })

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>SNSリンクの編集</TitleArea>
      <EditorBase>
        <form onSubmit={onSubmit}>
          <FormControl
            isInvalid={errors.label !== undefined || errors.url !== undefined}
          >
            <HStack alignItems="end">
              <EditorButton
                icon="add"
                type="submit"
                onClick={() => setType("add")}
              />
              <Stack spacing="0">
                <FormLabel htmlFor="sns" fontSize="0.8rem" color="text.sub">
                  {" "}
                  SNS{" "}
                </FormLabel>
                <Select backgroundColor="#fff" w="12rem" {...register("label")}>
                  <option value=""> - </option>
                  {VALID_SNS_LIST.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {" "}
                        {item}{" "}
                      </option>
                    )
                  })}
                </Select>
              </Stack>
              <Stack spacing="0">
                <FormLabel htmlFor="url" fontSize="0.8rem" color="text.sub">
                  {" "}
                  URL{" "}
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
              </Stack>
            </HStack>
            <Stack w="100%">
              {items.map((item) => {
                return (
                  <HStack key={item.label} textColor="text.main">
                    <EditorButton
                      icon="remove"
                      type="submit"
                      onClick={() => setType("remove")}
                    />
                    <Text> {item.label + " - "} </Text>
                    <Text> {item.url} </Text>
                  </HStack>
                )
              })}
            </Stack>
          </FormControl>
        </form>
      </EditorBase>
    </VStack>
  )
}
