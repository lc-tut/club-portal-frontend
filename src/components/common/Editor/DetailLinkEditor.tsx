import {
  FormControl,
  FormLabel,
  Input,
  Wrap,
  FormErrorMessage,
  GridItem,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAPI } from "../../../hooks/useAPI"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useOutletUser } from "../../../hooks/useOutletUser"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import type { Link } from "../../../types/api"
import { axiosWithPayload } from "../../../utils/axios"

type FormType = {
  email: string
}

const schema = z.object({
  email: z.string().email("正しいメールアドレスを入力してください。"),
})

export const DetailLinkEditor: React.VFC<{}> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<Link>>(`/api/v1/clubs/uuid/${clubUuid!}/link`)
  const [email, setEmail] = useState<string>("")
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")

  useEffect(() => {
    if (data) {
      data.map((d) => {
        if (d.label === "Email") setEmail(d.url)
      })
    }
  }, [data])

  const onSubmit = handleSubmit(async (data) => {
    const links: Array<Link> = [{ label: "Email", url: data.email }]
    const requestConfig: AxiosRequestConfig<Array<Link>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/link`,
      method: "put",
      data: links,
    }
    try {
      await axiosWithPayload<Array<Link>, Array<Link>>(requestConfig)
      successToast()
      setEmail(data.email)
    } catch (e) {
      errorToast()
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <GridItem>
        <FormControl isInvalid={errors.email !== undefined}>
          <FormLabel color="text.main" pl="0.2rem" fontSize="1.2rem">
            連絡先のメールアドレス
          </FormLabel>
          <Input
            placeholder={"メールアドレスを入力して下さい"}
            w="20rem"
            backgroundColor="#fff"
            textColor="text.main"
            defaultValue={email}
            {...register("email", {
              value: email,
              required: {
                value: true,
                message: "メールアドレスが空白です！",
              },
            })}
          />
          <Wrap h="1.2rem">
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </Wrap>
        </FormControl>
      </GridItem>
    </form>
  )
}
