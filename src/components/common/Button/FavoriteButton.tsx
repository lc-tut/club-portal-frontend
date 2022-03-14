import { Button } from "@chakra-ui/react"
import type { FavoriteButtonProps } from "../../../types/button"
import { BsStarFill } from "react-icons/bs"
import { axiosFetcher, axiosWithPayload } from "../../../utils/axios"
import type { AxiosRequestConfig } from "axios"
import type {
  FavoriteClubResponse,
  FavoriteClubStatus,
  RegisterFavoriteClubPayload,
  UnregisterFavoriteClubPayload,
} from "../../../types/api"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useEffect, useState } from "react"

export const FavoriteButton: React.VFC<FavoriteButtonProps> = (props) => {
  const getFavoriteErrortoast =
    useErrorToast("お気に入りの取得に失敗しました。")
  const postFavoriteErrortoast =
    useErrorToast("お気に入りの設定に失敗しました。")
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (props.userUUID && props.clubUUID) {
        try {
          const data = await axiosFetcher<FavoriteClubStatus>(
            `/api/v1/users/${props.userUUID}/favs/${props.clubUUID}`
          )
          setIsRegistered(data.status)
        } catch (e) {
          setIsError(true)
          throw new Error("Failed fetch")
        }
      }
    })()
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoaded(true)
      })
  }, [isError, props.clubUUID, props.userUUID])

  const fgColor = isRegistered ? "button.text.gray" : "#fff"
  const bgColor = isRegistered ? "button.gray" : "button.yellow"
  const text = isRegistered ? "お気に入り登録済み" : "お気に入り登録"

  const onClick = async () => {
    if (props.clubUUID && props.userUUID) {
      const requestConfig: AxiosRequestConfig<
        RegisterFavoriteClubPayload | UnregisterFavoriteClubPayload
      > = {
        url: isRegistered
          ? `/api/v1/users/${props.userUUID}/unfav`
          : `/api/v1/users/${props.userUUID}/favs`,
        method: "post",
        data: { clubUuid: props.clubUUID },
      }
      try {
        await axiosWithPayload<
          RegisterFavoriteClubPayload | UnregisterFavoriteClubPayload,
          FavoriteClubResponse
        >(requestConfig)
        setIsRegistered(!isRegistered)
      } catch (e) {
        postFavoriteErrortoast()
      }
    }
  }

  if (isError) {
    getFavoriteErrortoast()
  }

  return (
    <Button
      leftIcon={<BsStarFill color={fgColor} />}
      color={fgColor}
      backgroundColor={bgColor}
      width="12rem"
      m={0}
      isDisabled={props.isDisabled}
      onClick={onClick}
      isLoading={!isLoaded}
    >
      {text}
    </Button>
  )
}
