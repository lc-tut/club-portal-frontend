import { Icon } from "@chakra-ui/react"
import Logo from "../../../static/Logo.svg"
import type { IconComponent } from "../../../types/icon"

export const PortalLogo: IconComponent = (props) => {
  return <Icon as={Logo} {...props} />
}
