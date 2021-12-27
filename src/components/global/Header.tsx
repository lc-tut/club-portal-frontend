import { BsBellFill, BsList } from "react-icons/bs"
import { Center, Flex, Spacer, Icon } from "@chakra-ui/react"
import { DefaultUserIcon } from "../common/Icon"

export const Header: React.VFC<{}> = () => {
  return (
    <Flex px="1rem" h="3rem" w="100%" backgroundColor="green.200">
      <Center>
        <Icon as={BsList} boxSize="2em" color="text.title.main" />
      </Center>
      <Spacer />
      <Center mr="1rem">
        <Icon as={BsBellFill} boxSize="2em" color="text.title.sub" />
      </Center>
      <Center>
        <DefaultUserIcon boxSize="2em" />
      </Center>
    </Flex>
  )
}
