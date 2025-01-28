import { FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Input, Stack, Textarea, VStack } from "@chakra-ui/react"
import { z } from "zod"

import { AxiosRequestConfig } from "axios"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PortalButton } from "../../components/common/Button"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { CreateClubPayload } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"

const schema = z.object({
    description: z.string().nonempty(),
})

export const InitializeEditor: React.FC<{}> = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateClubPayload>({
        resolver: zodResolver(schema),
    })

    const errorToast = useErrorToast("データの保存に失敗しました。")
    const successToast = useSuccessToast("データの保存が完了しました！")

    const onSubmit = handleSubmit(async (data) => {
        const requestConfig: AxiosRequestConfig<CreateClubPayload> = {
            url: "/api/v1/clubs",
            method: "post",
            data: data
        }
        try {
            await axiosWithPayload<CreateClubPayload, CreateClubPayload>(requestConfig)
            successToast()
        } catch (e) {
            errorToast()
        }
    })

    return (
        <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
            <TitleArea>サークル情報の初期設定</TitleArea>
            <Stack>
                <form onSubmit={onSubmit}>
                    <EditorBase>
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            columnGap="1rem"
                            rowGap="4rem"
                        >
                            <GridItem colSpan={{ base: 1, md: 2 }}>
                                <FormControl isInvalid={errors.description !== undefined}>
                                    <FormLabel color="text.main"
                                        fontSize="1.6rem"
                                        m="0"
                                        pb="2rem"
                                    >
                                        サークル名
                                    </FormLabel>
                                    <Input
                                        backgroundColor="#fff"
                                        color="text.main"
                                        w="30rem"
                                        h="3rem"
                                        placeholder="サークル名を入力してください"
                                        {...register("name", {
                                            required: true,
                                            minLength: 1,
                                        })}
                                    />
                                    <FormLabel color="text.main"
                                        fontSize="1.6rem"
                                        m="0"
                                        pt="4rem"
                                        pb="2rem"
                                    >
                                        サークルの説明文
                                    </FormLabel>
                                    <Textarea
                                        backgroundColor="#fff"
                                        color="text.main"
                                        w="30rem"
                                        h="10rem"
                                        placeholder="サークルの説明文を入力して下さい"
                                        resize="none"
                                        {...register("description", {
                                            required: true,
                                            minLength: 1,
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.description && errors.description.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </EditorBase>
                    <PortalButton type="submit">登録</PortalButton>
                </form>
            </Stack>
        </VStack>
    )
}