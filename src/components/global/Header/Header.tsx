import { Center, Flex, Icon, Spacer } from "@chakra-ui/react"
import { BsBellFill } from "react-icons/bs"
import { HamburgerMenu } from "./HamburgerMenu"
import { UserMenu } from "./UserMenu"

export const headerHeight = "3rem"

export const Header: React.VFC<{}> = () => {
  return (
    <Flex px="1rem" h={headerHeight} w="100%" backgroundColor="green.200">
      <HamburgerMenu />
      <Spacer />
      <Center mr="1rem">
        <Icon as={BsBellFill} boxSize="2em" color="text.title.sub" />
      </Center>
      <Center>
        <UserMenu />
      </Center>
    </Flex>
  )
}
