import {
  Button,
  Center,
  GridItem,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  BsDiscord,
  BsInstagram,
  BsLine,
  BsLink,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs"

import type { DescriptionProps, LinkType } from "../../../types/description"
import { isRegisteredSNS } from "../../../utils/functions"

const fgColorMap: { [key in LinkType]?: string } = {
  Twitter: "#fff",
  Instagram: "#fff",
  YouTube: "#fff",
  Discord: "#fff",
  LINE: "#fff",
}

const bgColorMap: { [key in LinkType]?: string } = {
  Twitter: "#2E94DA",
  Instagram: "#D35CCA",
  YouTube: "#FF0000",
  Discord: "#5865F2",
  LINE: "#29C755",
}

const iconMap: { [key in LinkType]?: JSX.Element } = {
  Twitter: <BsTwitter />,
  Instagram: <BsInstagram />,
  YouTube: <BsYoutube />,
  Discord: <BsDiscord />,
  LINE: <BsLine />,
}

export const DescriptionText: React.FC<DescriptionProps> = (props) => {
  const colSpan = props.halfWidth ? 12 : { base: 12, md: 6 }
  const width = props.halfWidth ? "50%" : "100%"

  return (
    <GridItem colSpan={colSpan}>
      <Center>
        <VStack spacing="1rem" w={width}>
          <Text fontSize="1.5rem" color="text.main">
            このサークルについて
          </Text>
          <Text color="text.main" px="1rem">
            {props.content}
          </Text>
          <HStack alignSelf="start" px="1rem" flexWrap="wrap">
            {props.links?.map((link) => {
              const label = link.label
              const registerdSNS = isRegisteredSNS(label)
              return (
                <Link pt="1rem" href={link.path} key={link.path} isExternal>
                  <Button
                    color={
                      registerdSNS ? fgColorMap[label] : "button.text.gray"
                    }
                    backgroundColor={
                      registerdSNS ? bgColorMap[label] : "button.gray"
                    }
                    leftIcon={registerdSNS ? iconMap[label] : <BsLink />}
                    fontSize="0.75rem"
                    borderRadius="2px"
                    height="2rem"
                    minWidth="6rem"
                    py="1rem"
                    _hover={{
                      opacity: 0.6,
                    }}
                  >
                    {link.label}
                  </Button>
                </Link>
              )
            })}
          </HStack>
        </VStack>
      </Center>
    </GridItem>
  )
}
