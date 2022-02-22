import {
  Avatar,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react"
import axios from "axios"
import { BsBoxArrowRight } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { useSession } from "../../../hooks/useSession"
import { PortalButton } from "../../common/Button"
import { DefaultUserIcon } from "../../common/Icon"

export const UserMenu: React.VFC<{}> = () => {
  const { session, isLoading, isError } = useSession()
  const [isOpen, setIsOpen] = useBoolean(false)
  const loc = useLocation()

  const logout = () => {
    axios.post("/api/auth/destroy").catch((err) => console.log(err))
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
          大学Gmailアカウントでログインすると、全ての情報を閲覧することができます
        </Text>
        {/* TODO: 他にいい方法ある？ */}
        <a href={"/api/auth/signin?redirect_url=" + loc.pathname}>
          <PortalButton>ログイン</PortalButton>
        </a>
      </VStack>
    )
  } else {
    popoverContent = (
      <VStack>
        <Text>ログインしています</Text>
        <PortalButton
          onClick={logout}
          pbstyle="solid"
          leftIcon={<BsBoxArrowRight />}
        >
          ログアウト
        </PortalButton>
      </VStack>
    )
  }

  const avatarProps = {
    boxSize: "2rem",
    cursor: "pointer",
  }
  let avatar = <></>
  if (!session) {
    avatar = <DefaultUserIcon {...avatarProps} />
  } else {
    avatar = <Avatar src={session.avatar} {...avatarProps} />
  }

  return (
    <Popover isOpen={isOpen} onOpen={setIsOpen.on} onClose={setIsOpen.off}>
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
        <PopoverBody>{popoverContent}</PopoverBody>
      </PopoverContent>
    </Popover>
    // <Avatar src={session?.avatar} boxSize="2rem" />
  )
}
