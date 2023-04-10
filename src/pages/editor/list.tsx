import { VStack } from "@chakra-ui/react"

import { EditorMenu } from "../../components/common/Editor/EditorMenu"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

export const EditorList: React.FC<{}> = () => {
  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>編集者メニュー</TitleArea>
      <EditorMenu
        items={[
          {
            content: "サークル説明文の編集",
            to: "description",
          },
          {
            content: "詳細情報の編集",
            to: "detail",
          },
          {
            content: "年間予定の編集",
            to: "schedule",
          },
          {
            content: "よくある質問の編集",
            to: "",
            isNotAvailable: true,
          },
          {
            content: "外部リンクの編集",
            to: "link",
          },
          {
            content: "動画の掲載・変更",
            to: "video",
          },
          {
            content: "写真の掲載・変更",
            to: "image",
          },
          {
            content: "お知らせの投稿",
            to: "",
            isNotAvailable: true,
          },
          {
            content: "サークルアイコンの変更",
            to: "icon",
          },
        ]}
      />
    </VStack>
  )
}
