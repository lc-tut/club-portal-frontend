import {
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react"
import { BsBellFill, BsList } from "react-icons/bs"
import { DefaultUserIcon } from "../common/Icon"

const headerHeight = "3rem"

const HamburgerIcon: React.VFC<{}> = () => {
  return (
    <Icon as={BsList} boxSize="2em" color="text.title.main"/>
  )
}

const BrowserHamburgerMenu: React.VFC<{}> = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Center>
            <HamburgerIcon />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader> Menu </PopoverHeader>
          <PopoverBody>
            this is popover
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

const MobileHamburgerMenu: React.VFC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Center as="button" onClick={onOpen}>
        <HamburgerIcon />
      </Center>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size="full"
      >
        <DrawerContent mt={headerHeight}>
          <DrawerHeader> Menu </DrawerHeader>
          <DrawerBody>
            <Text>
              this is drawer
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const Header: React.VFC<{}> = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)")

  return (
    <Flex px="1rem" h={headerHeight} w="100%" backgroundColor="green.200">
      {  isMobile && <MobileHamburgerMenu /> /* for mobile */ }
      { !isMobile && <BrowserHamburgerMenu /> /* for browser */ }
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
