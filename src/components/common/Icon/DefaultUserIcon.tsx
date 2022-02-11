import { Icon } from "@chakra-ui/react"
import IconImage from "../../../static/DefaultUserIcon.svg"
import type { IconComponent } from "../../../types/icon"

export const DefaultUserIcon: IconComponent = (props) => {
  return <Icon as={IconImage} {...props} />
}
