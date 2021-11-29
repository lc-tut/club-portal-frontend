import { BsBellFill, BsList } from "react-icons/bs"
import { Center, Flex, Spacer, Icon } from "@chakra-ui/react"
import { DefaultUserIcon } from "../common/DefaultUserIcon"

export const Header: React.VFC<{}> = () => {
  const headerHeight = 52

  return (
    <Flex px="15" h={`${headerHeight}px`} w="100%" backgroundColor="green.200">
      <Center>
        <Icon as={BsList} boxSize="2em" color="text.title.main" />
      </Center>
      <Spacer />
      <Center mr="15px">
        <Icon as={BsBellFill} boxSize="2em" color="text.title.sub" />
      </Center>
      <Center>
        <DefaultUserIcon boxSize="2em" />
      </Center>
    </Flex>
  )
}
