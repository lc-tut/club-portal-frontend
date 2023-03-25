import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs"
import { Link } from "react-router-dom"
import { HEADER_HEIGHT } from "../../../utils/consts"
import { HamburgerIcon, menuItems } from "./HamburgerMenu"

const textColor = "#FFFFFC"

export const MobileHamburgerMenu: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const stackContent = []
  for (const key in menuItems) {
    stackContent.push(
      <Link to={menuItems[key]} key={key}>
        <Button
          w="100%"
          h="4rem"
          p="0"
          pl="2em"
          pr="1em"
          flex="1"
          justifyContent="space-between"
          backgroundColor="transparent"
          textColor={textColor}
          fontWeight="bold"
          fontSize="1.5rem"
          borderRadius="0"
          onClick={onClose}
          _hover={{
            opacity: "0.6",
          }}
        >
          <Text>{key}</Text>
          <BsChevronRight />
        </Button>
      </Link>
    )
  }

  return (
    <>
      <Center as="button" onClick={onOpen}>
        <HamburgerIcon />
      </Center>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerContent mt={HEADER_HEIGHT} backgroundColor="green.500">
          <DrawerHeader textColor={textColor}>Menu</DrawerHeader>
          <DrawerBody p="0">
            <Stack spacing="0">{stackContent}</Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
