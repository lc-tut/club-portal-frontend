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
import { HeaderProps } from "../../../types/header"
import { PortalButton } from "../../common/Button"
import { DefaultUserIcon } from "../../common/Icon"

export const UserMenu: React.VFC<HeaderProps> = (props) => {
  const [isOpen, setIsOpen] = useBoolean(false)
  const loc = useLocation()

  const onLogout = async () => {
    try {
      await axios.post(`/api/auth/destroy`)
    } catch (e) {
      // TODO: code errors
    } finally {
      window.location.reload()
    }
  }

  const onLogin = () => {
    window.location.href = `/api/auth/signin?redirect_url=${loc.pathname}`
  }

  const avatarProps = {
    boxSize: "2rem",
    cursor: "pointer",
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
          {props.avatar ? (
            <Avatar src={props.avatar} {...avatarProps} />
          ) : (
            <DefaultUserIcon {...avatarProps} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {props.avatar ? (
            <VStack>
              <Text>ログインしています</Text>
              <PortalButton
                onClick={onLogout}
                pbstyle="solid"
                leftIcon={<BsBoxArrowRight />}
              >
                ログアウト
              </PortalButton>
            </VStack>
          ) : (
            <VStack>
              <Text>
                大学Gmailアカウントでログインすると、全ての情報を閲覧することができます
              </Text>
              <PortalButton onClick={() => onLogin()}>ログイン</PortalButton>
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
    // <Avatar src={session?.avatar} boxSize="2rem" />
  )
}
