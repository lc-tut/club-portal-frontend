import { HStack } from "@chakra-ui/react"
import type { HeaderProps } from "../../../types/header"
import { HamburgerMenu } from "./HamburgerMenu"
import { UserMenu } from "./UserMenu"

export const headerHeight = "3rem"

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HStack
      px="1rem"
      h={headerHeight}
      backgroundColor="green.200"
      justifyContent="space-between"
    >
      <HamburgerMenu />
      {/* <Center mr="1rem">
        <Icon as={BsBellFill} boxSize="2em" color="text.title.sub" />
      </Center> */}
      <UserMenu session={props.session} />
    </HStack>
  )
}
