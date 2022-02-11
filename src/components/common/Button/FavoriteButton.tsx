import { Button } from "@chakra-ui/react"
import type { FavoriteButtonProps } from "../../../types/button"
import { BsStarFill } from "react-icons/bs"

export const FavoriteButton: React.VFC<FavoriteButtonProps> = (props) => {
  const fgColor = props.registered ? "button.text.gray" : "#fff"
  const bgColor = props.registered ? "button.gray" : "button.yellow"
  const text = props.registered ? "お気に入り登録済み" : "お気に入り登録"

  return (
    <Button
      leftIcon={<BsStarFill color={fgColor} />}
      color={fgColor}
      backgroundColor={bgColor}
      width="12rem"
      m={0}
    >
      {text}
    </Button>
  )
}
