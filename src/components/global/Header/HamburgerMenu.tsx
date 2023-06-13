import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { BsChevronRight, BsList } from "react-icons/bs"
import { Link } from "react-router-dom"

import { useMobileMediaQuery } from "../../../hooks/useMobileQuery"
import { HEADER_HEIGHT, HEADER_MENUS } from "../../../utils/consts"

const MobileStackComponent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <>
      {HEADER_MENUS.map((menu, index) => (
        <Link to={menu.url} key={index}>
          <Button
            w="100%"
            h="4rem"
            p="0"
            pl="2em"
            pr="1em"
            flex="1"
            justifyContent="space-between"
            backgroundColor="transparent"
            textColor="#FFFFFC"
            fontWeight="bold"
            fontSize="1.5rem"
            borderRadius="0"
            onClick={onClose}
            _hover={{
              opacity: "0.6",
            }}
          >
            <Text>{menu.label}</Text>
            <BsChevronRight />
          </Button>
        </Link>
      ))}
    </>
  )
}

const MobileHamburgerMenu: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Center as="button" onClick={onOpen}>
        <Icon as={BsList} boxSize="2em" color="text.title.main" />
      </Center>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerContent mt={HEADER_HEIGHT} backgroundColor="green.500">
          <DrawerHeader textColor="#FFFFFC">Menu</DrawerHeader>
          <DrawerBody p="0">
            <Stack spacing="0">
              <MobileStackComponent onClose={onClose} />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const BrowserStackComponent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <>
      {HEADER_MENUS.map((menu, index) => (
        <Link to={menu.url} key={index}>
          <Button
            borderRadius="0"
            backgroundColor="transparent"
            p="0"
            pl="1rem"
            w="100%"
            justifyContent="start"
            onClick={onClose}
          >
            {menu.label}
          </Button>
        </Link>
      ))}
    </>
  )
}

const BrowserHamburgerMenu: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          h="100%"
          p="0"
          backgroundColor="transparent"
          _hover={{
            backgroundColor: "transparent",
          }}
          _active={{
            color: "text.sub",
          }}
        >
          <Icon as={BsList} boxSize="2em" color="text.title.main" />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="10rem">
        <PopoverCloseButton />
        <PopoverHeader> Menu </PopoverHeader>
        <PopoverBody p="0">
          <Stack spacing="0">
            <BrowserStackComponent onClose={onClose} />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const HamburgerMenu: React.FC<{}> = () => {
  const isMobile = useMobileMediaQuery()

  return <>{isMobile ? <MobileHamburgerMenu /> : <BrowserHamburgerMenu />}</>
}
