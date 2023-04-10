import { HStack } from "@chakra-ui/react"

import type { HeaderProps } from "../../../types/header"
import { HEADER_HEIGHT } from "../../../utils/consts"
import { HamburgerMenu } from "./HamburgerMenu"
import { UserMenu } from "./UserMenu"

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HStack
      px="1rem"
      h={HEADER_HEIGHT}
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
