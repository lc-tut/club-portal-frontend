import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import type { StateDispatch } from "../../../types/utils"
import { EditorButton } from "./EditorButton"

type AchievementEditorProps = {
  items: Array<string>
  setItems: StateDispatch<Array<string>>
}

type AchievementType = {
  achievement: string
}

export const AchievementEditor: React.VFC<AchievementEditorProps> = (props) => {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<AchievementType>()
  const { items, setItems } = props

  const achievement = watch("achievement")

  const onAdd = () => {
    if (achievement === "") {
      setError("achievement", {
        type: "required",
        message: "内容を入力してください。",
      })
    } else {
      clearErrors("achievement")
      setItems([achievement, ...items])
    }
  }
  const onRemove = (item: string) => {
    setItems(items.filter((achievement) => achievement !== item))
  }

  return (
    <Stack>
      <FormControl isInvalid={errors.achievement !== undefined}>
        <FormLabel color="text.main" fontSize="1.2rem">
          実績
        </FormLabel>
        <HStack>
          <EditorButton icon="add" onClick={onAdd} />
          <Input
            backgroundColor="#fff"
            textColor="text.main"
            placeholder="実績を入力して下さい"
            {...register("achievement")}
          />
        </HStack>
        <FormErrorMessage>
          {errors.achievement && errors.achievement.message}
        </FormErrorMessage>
      </FormControl>
      {props.items.map((item, index) => {
        return (
          <HStack key={index} textColor="text.main">
            <EditorButton icon="remove" onClick={() => onRemove(item)} />
            <Text>{item}</Text>
          </HStack>
        )
      })}
    </Stack>
  )
}
