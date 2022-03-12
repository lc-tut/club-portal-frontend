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
import type { StateDispatch } from "../../../types/utils"
import { useFormContext } from "react-hook-form"

type ContentEditorProps = {
  items: Array<string>
  setItems: StateDispatch<Array<string>>
}

type ContentType = {
  content: string
}

export const ContentEditor: React.VFC<ContentEditorProps> = (props) => {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ContentType>()
  const { items, setItems } = props

  const content = watch("content")

  const onAdd = () => {
    if (content === "") {
      setError("content", {
        type: "required",
        message: "内容を入力してください。",
      })
    } else {
      clearErrors("content")
      setItems([content, ...items])
    }
  }
  const onRemove = (item: string) => {
    setItems(items.filter((content) => content !== item))
  }

  return (
    <Stack spacing="0">
      <FormControl isInvalid={errors.content !== undefined}>
        <FormLabel color="text.main" fontSize="1.2rem">
          活動内容
        </FormLabel>
        <HStack alignItems="start">
          <EditorButton icon="add" onClick={() => onAdd()} paddingTop="0" />
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
        {props.items.map((item, index) => {
          return (
            <HStack key={index} textColor="text.main">
              <EditorButton
                icon="remove"
                onClick={() => onRemove(item)}
                paddingTop="0"
              />
              <Text>{item}</Text>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
