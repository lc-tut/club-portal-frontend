import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { HamburgerIcon, menuItems } from "./HamburgerMenu"

export const BrowserHamburgerMenu: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const stackItems = []

  for (const key in menuItems) {
    stackItems.push(
      <Link to={menuItems[key]} key={key}>
        <Button
          borderRadius="0"
          backgroundColor="transparent"
          p="0"
          pl="1rem"
          w="100%"
          justifyContent="start"
          onClick={onClose}
        >
          {key}
        </Button>
      </Link>
    )
  }

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
          <HamburgerIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="10rem">
        <PopoverCloseButton />
        <PopoverHeader> Menu </PopoverHeader>
        <PopoverBody p="0">
          <Stack spacing="0">{stackItems}</Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
