import {
  Avatar,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { BsBoxArrowRight, BsPencil } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import { useSWRConfig } from "swr"
import type { HeaderProps } from "../../../types/header"
import { axiosFetcher } from "../../../utils/axios"
import { PortalButton } from "../../common/Button"
import { DefaultUserIcon } from "../../common/Icon"

export const UserMenu: React.VFC<HeaderProps> = (props) => {
  const [isOpen, setIsOpen] = useBoolean(false)
  const loc = useLocation()
  const { mutate } = useSWRConfig()
  const { session } = props
  const [adjustPopoverWidth] = useMediaQuery("(max-width: 21em)")

  const onLogout = async () => {
    try {
      await mutate("/api/auth", null, false)
      await axiosFetcher<unknown>("/api/auth/destroy", { method: "post" })
      await mutate("/api/auth")
    } catch (e) {
      console.error(e)
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
    <Popover
      isOpen={isOpen}
      onOpen={setIsOpen.on}
      onClose={setIsOpen.off}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Button
          p="0"
          backgroundColor="transparent"
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          {session ? (
            <Avatar src={session.avatar} {...avatarProps} />
          ) : (
            <DefaultUserIcon {...avatarProps} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent w={adjustPopoverWidth ? "90vw" : "20em"}>
        <PopoverBody>
          {session ? (
            <VStack py="1rem">
              <Text>ログインしています</Text>
              <Text>{session.name}</Text>
              {session.role == "general" && (
                <Link to="/users/club/edit">
                  <PortalButton leftIcon={<BsPencil />}>
                    サークル編集
                  </PortalButton>
                </Link>
              )}
              <PortalButton
                onClick={onLogout}
                pbstyle="solid"
                leftIcon={<BsBoxArrowRight />}
              >
                ログアウト
              </PortalButton>
            </VStack>
          ) : (
            <VStack py="1rem">
              <Text color="text.main">
                大学Gmailアカウントでログインすると、全ての情報を閲覧することができます。
              </Text>
              <Text color="text.sub" fontSize="0.8rem">
                サークル情報を編集するには、サークルのメールアドレスでログインして下さい。
              </Text>
              <PortalButton onClick={() => onLogin()}>ログイン</PortalButton>
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
