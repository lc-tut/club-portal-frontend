import { VStack } from "@chakra-ui/react"
import { EditorMenu } from "../../../components/common/Editor/EditorMenu"
import { TitleArea } from "../../../components/global/TitleArea"

export const DescriptionEditors: React.VFC<{}> = () => {
  return (
    <VStack
      flex="1"
    >
      <TitleArea>
        サークル紹介ページ
      </TitleArea>
      <EditorMenu
        items={[
          {
            content: "サークル説明文の編集",
            to: "club-description",
          },
          {
            content: "詳細情報の編集",
            to: ""
          },
          {
            content: "年間予定の編集",
            to: ""
          },
          {
            content: "よくある質問の編集",
            to: "",
            isNotAvailable: true
          },
          {
            content: "SNSリンクの編集",
            to: ""
          },
          {
            content: "動画の掲載・変更",
            to: ""
          },
          {
            content: "写真の掲載・変更",
            to: ""
          },
        ]}
      />
    </VStack>
  )
}