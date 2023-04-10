import { Icon, type IconProps } from "@chakra-ui/react"

import IconImage from "../../../static/DefaultUserIcon.svg"

export const DefaultUserIcon: React.FC<IconProps> = (props) => {
  return <Icon as={IconImage} {...props} />
}
