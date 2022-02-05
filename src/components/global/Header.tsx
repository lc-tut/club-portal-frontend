import {
  Avatar,
  Button,
  Center,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  useBoolean,
  VStack
} from "@chakra-ui/react"
import axios from "axios"
import { BsBellFill, BsList } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { useSession } from "../../hooks/useSession"
import { DefaultUserIcon } from "../common/Icon"

const UserIcon: React.VFC<{}> = () => {
  const { session, isLoading, isError } = useSession()
  const [ isOpen, setIsOpen ] = useBoolean(false)
  const loc = useLocation()

  const logout = () => {
    axios.post("/api/auth/destroy")
      .catch((err)=>console.log(err))
    // "F5" しないとセッションが残ったままになる
    location.reload()
  }

  if (isLoading || isError) {
    return <DefaultUserIcon />
  }

  let popoverContent = <></>
  if (session === null) {
    popoverContent = (
      <VStack>
        <Text>
          you are not logged in
        </Text>
        {/* TODO: 他にいい方法ある？ */}
        <a href={"/api/auth/signin?redirect_url="+loc.pathname}>
          <Button>
            Login
          </Button>
        </a>
      </VStack>
    )
  }
  else {
    popoverContent = (
      <VStack>
        <Text>
          you have logged in
        </Text>
        <Button onClick={logout}>
          Logout
        </Button>
      </VStack>
    )
  }

  const avatarProps = {
    boxSize: "2rem",
    cursor: "pointer"
  }
  let avatar = <></>
  if (session === null) {
    avatar = <DefaultUserIcon {...avatarProps} />
  }
  else {
    avatar = <Avatar src={session.avatar} {...avatarProps} />
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpen={setIsOpen.on}
      onClose={setIsOpen.off}
    >
      <PopoverTrigger>
        <Button
          p="0"
          backgroundColor="transparent"
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          {avatar}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {popoverContent}
        </PopoverBody>
      </PopoverContent>
    </Popover>
    // <Avatar src={session?.avatar} boxSize="2rem" />
  )
}

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
        <UserIcon />
      </Center>
    </Flex>
  )
}
