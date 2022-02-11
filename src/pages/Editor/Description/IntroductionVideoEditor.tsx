import { AspectRatio, Input, VStack, Text, Stack, HStack, Icon, useDisclosure, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalOverlay, ModalBody, UnorderedList, ListItem } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { PortalButton } from "../../../components/common/Button"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../../static/consts"
import { BsQuestionCircle } from "react-icons/bs"

function parseVideoId(
  input: string,
  setError: Dispatch<SetStateAction<string>>,
  setVideoId: Dispatch<SetStateAction<string>>
) {
  if (input === "") {
    setError("URLを入力して下さい")
    return
  }

  let url: URL
  try {
    url = new URL(input)
  }
  catch (e) {
    if (e instanceof TypeError) {
      setError("URLの形式が正しくありません")
      return
    }
    else {
      throw e
    }
  }

  if (!["www.youtube.com", "youtube.com", "youtu.be"].includes(url.hostname)) {
    setError("YouTubeのURLではありません")
    return
  }
  if (url.pathname === "/watch") {
    const vParam = url.searchParams.get("v")
    if (!vParam) {
      setError("URLに動画IDが含まれていません")
      return
    }
    console.log("set: " + vParam);
    setVideoId(vParam)
  }
  else if (url.hostname === "youtu.be") {
    setVideoId(url.pathname.replace("/", ""))
  }

  setError("")
}

const HelpModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Icon
        as={BsQuestionCircle}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> YouTubeの動画リンクについて </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> URLは以下の形式に対応しています </Text>
            <UnorderedList pt="0.5rem">
              <ListItem> www.youtube.com/watch?v=(動画ID) </ListItem>
              <ListItem> youtube.com/watch?v=(動画ID) </ListItem>
              <ListItem> youtu.be/(動画ID) </ListItem>
            </UnorderedList>
            <Text pt="1rem"> これらのURLは以下の方法で取得できます </Text>
            <UnorderedList pt="0.5rem">
              <ListItem> ブラウザで動画視聴画面を開き、上部アドレスバーのURLをコピーする </ListItem>
              <ListItem> ブラウザ・アプリの動画視聴画面の「共有」ボタンからリンクを取得する </ListItem>
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const IntroductionVideoEditor: React.VFC<{}> = () => {
  // データベースには動画IDを保存したい
  // 既に動画IDが保存されていた場合、inputDataの初期値は
  //    https://youtu.be/<videoId>
  // にしたい
  const [ videoId, setVideoId ] = useState("")
  const [ inputData, setInputData ] = useState("")
  const [ error, setError ] = useState("")
  const onConfirm = () => {
    parseVideoId(inputData, setError, setVideoId)
    console.log("video id is: " + videoId);
  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>動画の掲載・変更</TitleArea>
      <EditorBase>
        <Stack>
          <HStack>
            <Text fontSize="0.8rem" color="text.main">
              YouTubeの動画URL
            </Text>
            <HelpModal />
          </HStack>
          <Input
            w="30rem"
            textColor="text.main"
            backgroundColor="#fff"
            errorBorderColor="red.300"
            isInvalid={error!==""}
            placeholder="URLを入力して下さい"
            value={inputData}
            onChange={(e)=>setInputData(e.target.value)}
          />
          <Text fontSize="0.8rem" color="red.500">
            {error}
          </Text>
        </Stack>
        <PortalButton
          pbstyle="solid"
          onClick={()=>onConfirm()}
        >
          確認
        </PortalButton>
        <VStack>
          <Text> ↓ここに正しく表示されることを確認した上で保存して下さい </Text>
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
              src={"https://www.youtube.com/embed/" + videoId}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </VStack>
        <PortalButton
          isDisabled={error !== ""}
        >
          保存
        </PortalButton>
        <VStack textColor="text.main">
          <Text>
            以下の内容で保存します
          </Text>
          <Text>
            動画ID: {videoId !== "" ? videoId : "(未入力)"}
          </Text>
        </VStack>
      </EditorBase>
    </VStack>
  )
}