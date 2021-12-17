import { Icon } from "@chakra-ui/react"
import type { IconProps } from "@chakra-ui/react"
import type { PropsWithChildren } from "react"
import Logo from "../../static/Logo.svg"

export const PortalLogo: React.VFC<PropsWithChildren<IconProps>> = (props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <Icon as={Logo} {...props} />
}
