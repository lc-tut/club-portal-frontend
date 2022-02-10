import { Button, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { BsPlusCircle, BsTrash } from "react-icons/bs"
import { EditorButtonProps } from "../../../types/editor"

const iconMap: {[key in string]: IconType} = {
  "add": BsPlusCircle,
  "remove": BsTrash
}

export const EditorButton: React.VFC<EditorButtonProps> = (props) => {
  return (
    <Button
      backgroundColor="#fff"
      border="1px"
      borderColor="gray.200"
      p="0"
      onClick={props.onClick}
    >
      <Icon as={iconMap[props.icon]} color="text.main" />
    </Button>
  )
}