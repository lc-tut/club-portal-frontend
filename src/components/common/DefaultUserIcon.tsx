import { Icon } from "@chakra-ui/react"
import type { IconProps } from "@chakra-ui/react"
import type { PropsWithChildren } from "react"
import { ReactComponent as IconImage } from "../../static/DefaultUserIcon.svg"

export const DefaultUserIcon: React.VFC<PropsWithChildren<IconProps>> = (props) => {
  return <Icon as={IconImage} {...props} />
}
