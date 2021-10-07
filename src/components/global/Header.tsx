import { BellIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Center, Flex, Spacer } from "@chakra-ui/react"
import { DefaultUserIcon } from "../common/DefaultUserIcon"

export const Header: React.VFC<{}> = () => {
  const headerHeight = 52

  return (
    <Flex px="15" h={`${headerHeight}px`} w="100%" backgroundColor="green.200">
      <Center>
        <HamburgerIcon boxSize="2em" />
      </Center>
      <Spacer />
      <Center>
        <BellIcon boxSize="2em" mx="3" />
      </Center>
      <Center>
        <DefaultUserIcon boxSize="2em" />
      </Center>
    </Flex>
  )
}
