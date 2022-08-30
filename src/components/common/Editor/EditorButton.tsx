import { Button, Icon } from "@chakra-ui/react"
import type { IconType } from "react-icons"
import { BsCheck2Circle, BsPlusCircle, BsTrash } from "react-icons/bs"
import type { EditorButtonProps } from "../../../types/editor"

type MapKeys = "add" | "remove" | "check"

const iconMap: { [key in MapKeys]: IconType } = {
  add: BsPlusCircle,
  remove: BsTrash,
  check: BsCheck2Circle,
}

export const EditorButton: React.VFC<EditorButtonProps> = (props) => {
  return (
    <Button
      backgroundColor="#fff"
      border="1px"
      borderColor="gray.200"
      p="0"
      mt={props.paddingTop ?? "1.2rem"}
      onClick={props.onClick}
      type={props.type}
    >
      <Icon as={iconMap[props.icon]} color="text.main" />
    </Button>
  )
}
