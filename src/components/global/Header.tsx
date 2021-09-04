import { BellIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react"
import { stat } from "fs"
import { PortalLogo } from "../common/Logo"

export const Header: React.VFC<{}> = () => {
  const headerHeight: number = 52

  return (
    <Flex px="15" h={headerHeight + "px"} w="100%" backgroundColor="green.200">
      <Center>
        <HamburgerIcon boxSize="2em" />
      </Center>
      <Spacer />
      <Center>
        <BellIcon boxSize="2em" mx="3" />
      </Center>
      <Center>
        <Avatar icon={<PortalLogo />} size="sm" />
      </Center>
    </Flex>
  )
}
