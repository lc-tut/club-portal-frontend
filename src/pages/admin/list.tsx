import { VStack } from "@chakra-ui/react"
import type React from "react"

import { AdminMenu } from "../../components/common/Admin/AdminMenu"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

export const AdminMenuList: React.FC<{}> = () => {
  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>管理者メニュー</TitleArea>
      <AdminMenu
        items={[
          {
            content: "サークルアカウントの追加",
            to: "add-circle-account",
            remark: "新規サークルアカウントの名前・メールアドレスを追加します",
          },
          {
            content: "ユーザ管理",
            to: "users",
            remark: "サークル管理アカウントの名前・メールアドレスを変更します",
          },
        ]}
      />
    </VStack>
  )
}
