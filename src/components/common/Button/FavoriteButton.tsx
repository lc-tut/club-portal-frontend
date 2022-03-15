import { Button } from "@chakra-ui/react"
import type { FavoriteButtonProps } from "../../../types/button"
import { BsStarFill } from "react-icons/bs"

export const FavoriteButton: React.VFC<FavoriteButtonProps> = (props) => {
  const { isRegistered, isLoading } = props
  const fgColor = isRegistered ? "button.text.gray" : "#fff"
  const bgColor = isRegistered ? "button.gray" : "button.yellow"
  const text = isRegistered ? "お気に入り登録済み" : "お気に入り登録"

  return (
    <Button
      leftIcon={<BsStarFill color={fgColor} />}
      color={fgColor}
      backgroundColor={bgColor}
      width="12rem"
      m={0}
      isDisabled={props.isDisabled}
      onClick={props.onClick}
      isLoading={isLoading}
    >
      {text}
    </Button>
  )
}
