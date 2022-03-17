import {
  AspectRatio,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsQuestionCircle } from "react-icons/bs"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import type { Video } from "../../types/api"
import { useErrorToast } from "../../hooks/useErrorToast"
import type { AxiosRequestConfig } from "axios"
import { useOutletUser } from "../../hooks/useOutletUser"
import { axiosWithPayload } from "../../utils/axios"
import { useAPI } from "../../hooks/useAPI"
import { Loading } from "../../components/global/LoadingPage"
import { ErrorPage } from "../error"

const parseVideoId = (
  input: string
): { success: boolean; message: string; videoID: string } => {
  if (input === "") {
    return { success: false, message: "URLを入力して下さい。", videoID: "" }
  }

  let url: URL
  try {
    url = new URL(input)
  } catch (e) {
    if (e instanceof TypeError) {
      return {
        success: false,
        message: "URLの形式が正しくありません。",
        videoID: "",
      }
    } else {
      throw e
    }
  }

  if (!["www.youtube.com", "youtube.com", "youtu.be"].includes(url.hostname)) {
    return {
      success: false,
      message: "YouTubeのURLではありません。",
      videoID: "",
    }
  }
  if (url.pathname === "/watch") {
    const vParam = url.searchParams.get("v")
    if (!vParam) {
      return {
        success: false,
        message: "URLに動画IDが含まれていません。",
        videoID: "",
      }
    }
    return { success: true, message: "", videoID: vParam }
  } else if (url.hostname === "youtu.be") {
    return {
      success: true,
      message: "",
      videoID: url.pathname.replace("/", ""),
    }
  } else {
    return {
      success: false,
      message: "URLの形式が正しくありません。",
      videoID: "",
    }
  }
}

const HelpModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Icon as={BsQuestionCircle} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>YouTubeの動画リンクについて</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>URLは以下の形式に対応しています</Text>
            <UnorderedList pt="0.5rem">
              <ListItem>www.youtube.com/watch?v=(動画ID)</ListItem>
              <ListItem>youtube.com/watch?v=(動画ID)</ListItem>
              <ListItem>youtu.be/(動画ID)</ListItem>
            </UnorderedList>
            <Text pt="1rem">これらのURLは以下の方法で取得できます</Text>
            <UnorderedList pt="0.5rem">
              <ListItem>
                ブラウザで動画視聴画面を開き、上部アドレスバーのURLをコピーする
              </ListItem>
              <ListItem>
                ブラウザ・アプリの動画視聴画面の「共有」ボタンからリンクを取得する
              </ListItem>
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const VideoEditor: React.VFC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Video>()
  const { data, isLoading, isError } = useAPI<Array<Video>>(`/api/v1/clubs/uuid/${clubUuid!}/video`)
  const [videoID, setVideoID] = useState<string>("")
  const toast = useErrorToast("データの保存に失敗しました。")

  const watchPath = watch("path")

  useEffect(() => {
    if (data) {
      data.length === 0 ? undefined : setVideoID(data[0].path)
    }
  }, [data])

  const onConfirm = () => {
    const res = parseVideoId(watchPath)
    if (res.success) {
      setVideoID(res.videoID)
      clearErrors("path")
    } else {
      setError("path", { type: "validate", message: res.message })
    }
  }

  const onSubmit = handleSubmit(async () => {
    const requestConfig: AxiosRequestConfig<Array<Video>> = {
      url: `/api/v1/clubs/uuid/${clubUuid!}/video`,
      method: "put",
      data: [{path:videoID}],
    }
    try {
      await axiosWithPayload<Array<Video>, Array<Video>>(requestConfig)
    } catch (e) {
      toast()
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
      <TitleArea>動画の掲載・変更</TitleArea>
      <form onSubmit={onSubmit}>
        <EditorBase>
          <Stack>
            <FormControl isInvalid={errors.path !== undefined}>
              <HStack>
                <FormLabel fontSize="0.8rem" color="text.main">
                  YouTubeの動画URL
                </FormLabel>
                <HelpModal />
              </HStack>
              <Input
                w="30rem"
                textColor="text.main"
                backgroundColor="#fff"
                errorBorderColor="red.300"
                placeholder="URLを入力して下さい"
                {...register("path")}
              />
              <Wrap h="1.2rem">
                <FormErrorMessage>
                  {errors.path && errors.path.message}
                </FormErrorMessage>
              </Wrap>
            </FormControl>
          </Stack>
          <PortalButton pbstyle="solid" onClick={onConfirm}>
            確認
          </PortalButton>
          <VStack>
            <Text>↓ここに正しく表示されることを確認した上で保存して下さい</Text>
            <AspectRatio
              ratio={16 / 9}
              width="100%"
              boxShadow="md"
              border="2px"
              borderColor="text.sub"
            >
              <iframe
                width="100%"
                height="100%"
                src={"https://www.youtube.com/embed/" + videoID}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </VStack>
          <VStack textColor="text.main">
            <PortalButton
              type="submit"
              isDisabled={videoID === "" || errors.path !== undefined}
            >
              保存
            </PortalButton>
            <Text>
              以下の内容で保存します
              <br />
              動画ID: {videoID !== "" ? videoID : "(未入力)"}
            </Text>
          </VStack>
        </EditorBase>
      </form>
    </VStack>
  )
}
