import { Icon } from "@chakra-ui/react"
import type { IconProps } from "@chakra-ui/react"
import type { PropsWithChildren } from "react"
import IconImage from "../../static/DefaultUserIcon.svg"

export const DefaultUserIcon: React.VFC<PropsWithChildren<IconProps>> = (
  props
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <Icon as={IconImage} {...props} />
}
