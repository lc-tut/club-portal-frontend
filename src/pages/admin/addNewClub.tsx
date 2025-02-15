import { FormControl, FormErrorMessage, FormLabel, Stack, Textarea, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { z } from "zod";

import { AdminBase } from "../../components/common/Admin/AdminBase";
import { PortalButton } from "../../components/common/Button";
import { TitleArea } from "../../components/global/Header/TitleArea";
import { PADDING_BEFORE_FOOTER } from "../../utils/consts";

// eslint-disable-next-line import/order
import { useForm } from "react-hook-form";

const schema = z.object({
  description: z.string().nonempty(),
})

export const CreateNewClub: React.FC<{}> = () => {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>新規サークル追加</TitleArea>
      <Stack>
        <form onSubmit={onSubmit}>
          <AdminBase>
            <VStack spacing="4rem">
              <FormControl isInvalid={false}>
                <FormLabel>サークル名</FormLabel>
                <Textarea
                  backgroundColor="#fff"
                  color="text.main"
                  w="30rem"
                  h="10rem"
                  placeholder="サークル名"
                  {...register("description", { required: true })}
                />
                <FormErrorMessage>サークル名を入力してください。</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={false}>
                <FormLabel>サークルの説明</FormLabel>
                <Textarea
                  placeholder="サークルの説明"
                  {...register("description", { required: true })}
                />
                <FormErrorMessage>サークルの説明を入力してください。</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={false}>
                <FormLabel>サークルの画像</FormLabel>
                <Textarea
                  placeholder="サークルの画像"
                  {...register("description", { required: true })}
                />
                <FormErrorMessage>サークルの画像を入力してください。</FormErrorMessage>
              </FormControl>

            </VStack>
            <PortalButton type="submit">保存</PortalButton>
          </AdminBase>
        </form>
      </Stack>
    </VStack>
  )
}
