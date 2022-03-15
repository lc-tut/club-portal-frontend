import { Center, Flex, Spacer } from "@chakra-ui/react"
import type { HeaderProps } from "../../../types/header"
import { HamburgerMenu } from "./HamburgerMenu"
import { UserMenu } from "./UserMenu"

export const headerHeight = "3rem"

export const Header: React.VFC<HeaderProps> = (props) => {
  return (
    <Flex px="1rem" h={headerHeight} w="100%" backgroundColor="green.200">
      <HamburgerMenu />
      <Spacer />
      {/* <Center mr="1rem">
        <Icon as={BsBellFill} boxSize="2em" color="text.title.sub" />
      </Center> */}
      <Center>
        <UserMenu session={props.session} />
      </Center>
    </Flex>
  )
}
