import { VStack } from "@chakra-ui/react"
import React from "react"
import { EditorMenu } from "../../components/common/Editor/EditorMenu"
import { TitleArea } from "../../components/global/Header/TitleArea"

export const Editors: React.VFC<{}> = () => {
  return (
    <VStack flex="1">
      <TitleArea>編集者メニュー</TitleArea>
      <EditorMenu
        items={[
          {
            content: "サークル紹介ページの編集",
            to: "/edit/description",
          },
          {
            content: "お知らせの投稿",
            to: "",
            isNotAvailable: true,
          },
          {
            content: "サークルアイコンの変更",
            to: "/edit/club-icon",
          },
        ]}
      />
    </VStack>
  )
}
