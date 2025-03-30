import { VStack, Text } from "@chakra-ui/react"
import type { AxiosRequestConfig } from "axios"
import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { AdminBase } from "../../components/common/Admin/AdminBase"
import { PortalButton } from "../../components/common/Button"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { UserInfo } from "../../types/api"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

export const DeleteGeneralUser: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // ルートが "/admin/users/delete" で始まっていれば API を叩く
  const { data: userData } = useAPI<UserInfo | null>(
    !location.pathname.startsWith("/admin/users/delete")
      ? null
      : `/api/v1/admin/users${location.pathname.replace("/admin/users/delete", "")}`
  )

  const errorToast = useErrorToast("ユーザーの削除に失敗しました。")
  const successToast = useSuccessToast("ユーザーを削除しました。")

  // 削除ボタンを押したときのハンドラ
  const handleDelete = async () => {
    if (!userData || !userData.userUuid) return

    const requestConfig: AxiosRequestConfig = {
      url: `/api/v1/clubs/uuid/${userData.clubUuid}`,
      method: "delete",
    }

    try {
      await axiosWithPayload(requestConfig)
      successToast()
      // 削除後、任意のページへリダイレクト
      navigate("/admin/users")
    } catch (e) {
      errorToast()
    }
  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークルアカウントの削除</TitleArea>
      <AdminBase>
        <VStack spacing="2rem">
          <Text>
            以下のアカウントを削除します。よろしいですか？
          </Text>
          <Text>サークル名: {userData?.name}</Text>
          <Text>メールアドレス: {userData?.email}</Text>

          <PortalButton
            pbcolor="red"
            onClick={handleDelete}
          >
            公開停止
          </PortalButton>
        </VStack>
      </AdminBase>
    </VStack>
  )
}
