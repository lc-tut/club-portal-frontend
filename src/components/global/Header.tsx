import { BellIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react"
import { PortalLogo } from "../common/Logo"

export const Header: React.VFC<{}> = () => {
  return (
    <Flex px="5" h="5%" w="100%" backgroundColor="green.200">
      <Center>
        <HamburgerIcon boxSize="2em"/>
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
