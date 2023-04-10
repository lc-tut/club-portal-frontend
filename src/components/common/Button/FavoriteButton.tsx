import { Button } from "@chakra-ui/react"
import { BsStarFill } from "react-icons/bs"

import type { FavoriteButtonProps } from "../../../types/button"

export const FavoriteButton: React.FC<FavoriteButtonProps> = (props) => {
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
      _hover={{
        opacity: 0.6,
      }}
    >
      {text}
    </Button>
  )
}
