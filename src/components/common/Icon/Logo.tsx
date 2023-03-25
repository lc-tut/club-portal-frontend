import { Icon, type IconProps } from "@chakra-ui/react"
import Logo from "../../../static/Logo.svg"

export const PortalLogo: React.FC<IconProps> = (props) => {
  return <Icon as={Logo} {...props} />
}
