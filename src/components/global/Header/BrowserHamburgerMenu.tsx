import { Button, Popover, PopoverTrigger, PopoverContent, PopoverCloseButton, PopoverHeader, PopoverBody, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { HamburgerIcon, menuItems } from "./HamburgerMenu"

export const BrowserHamburgerMenu: React.VFC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const open  = () => setIsOpen(true)
  const close = () => setIsOpen(false)

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
          onClick={close}
          _focus={{}}
          _active={{}}
        >
          {key}
        </Button>
      </Link>
    )
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={open}
        onClose={close}
      >
        <PopoverTrigger>
          <Button
            h="100%"
            p="0"
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "transparent"
            }}
            _focus={{}}
            _active={{
              color: "text.sub"
            }}
          >
            <HamburgerIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent w="10rem">
          <PopoverCloseButton />
          <PopoverHeader> Menu </PopoverHeader>
          <PopoverBody p="0">
            <Stack spacing="0">
              {stackItems}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}