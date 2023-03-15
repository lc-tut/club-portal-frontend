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
import { useForm } from "react-hook-form"
import { useAPI } from "../../../hooks/useAPI"
import { useOutletUser } from "../../../hooks/useOutletUser"
import type { Achievement } from "../../../types/api"
import { EditorButton } from "./EditorButton"
import * as z from "zod"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosRequestConfig } from "axios"
import { axiosWithPayload } from "../../../utils/axios"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import { useErrorToast } from "../../../hooks/useErrorToast"

const schema = z.object({
  achievement: z.string().nonempty(),
})

export const AchievementEditor: React.FC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<Achievement>>(
    `/api/v1/clubs/uuid/${clubUuid!}/achievement`
  )
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Achievement>({
    resolver: zodResolver(schema),
  })
  const [achievements, setAchievements] = useState<Array<Achievement>>([])
  const errorAddToast = useErrorToast("データの追加に失敗しました。")
  const errorRemoveToast = useErrorToast("データの削除に失敗しました。")
  const successAddToast = useSuccessToast("データの追加が完了しました！")
  const successRemoveToast = useSuccessToast("データの削除が完了しました！")

  useEffect(() => {
    if (data) {
      setAchievements(data)
    }
  }, [data])

  const onSubmit = handleSubmit(async (data) => {
    const resultData = [data, ...achievements]
    const requestConfig: AxiosRequestConfig<Array<Achievement>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/achievement`,
      method: "put",
      data: resultData,
    }
    try {
      await axiosWithPayload<Array<Achievement>, Array<Achievement>>(
        requestConfig
      )
      successAddToast()
      setAchievements(resultData)
    } catch (e) {
      errorAddToast()
    }
  })

  const onRemove = async (item: Achievement) => {
    const filteredAchievements = achievements.filter(
      (achievement) => !Object.is(achievement, item)
    )
    const requestConfig: AxiosRequestConfig<Array<Achievement>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/achievement`,
      method: "put",
      data: filteredAchievements,
    }
    try {
      await axiosWithPayload<Array<Achievement>, Array<Achievement>>(
        requestConfig
      )
      successRemoveToast()
      setAchievements(filteredAchievements)
    } catch (e) {
      errorRemoveToast()
    }
  }

  return (
    <Stack spacing="0" align="center">
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={errors.achievement !== undefined} w="45rem">
          <FormLabel
            color="text.main"
            fontSize="1.6rem"
            textAlign="center"
            m="0"
            pb="2rem"
          >
            実績
          </FormLabel>
          <HStack alignItems="start">
            <EditorButton icon="add" paddingTop="0" type="submit" />
            <Stack spacing="0" flex="1">
              <Input
                backgroundColor="#fff"
                textColor="text.main"
                placeholder="実績を入力して下さい"
                {...register("achievement", {
                  minLength: 1,
                })}
              />
              <Wrap h="1.2rem">
                <FormErrorMessage>
                  {errors.achievement && errors.achievement.message}
                </FormErrorMessage>
              </Wrap>
            </Stack>
          </HStack>
        </FormControl>
        <Stack>
          {achievements.map((item, index) => {
            return (
              <HStack key={index} textColor="text.main">
                <EditorButton
                  icon="remove"
                  onClick={() => onRemove(item)}
                  paddingTop="0"
                />
                <Text>{item.achievement}</Text>
              </HStack>
            )
          })}
        </Stack>
      </form>
    </Stack>
  )
}
