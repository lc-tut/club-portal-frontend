import { GridItem, VStack, Text, HStack, Link, Button } from "@chakra-ui/react"
import {
  BsDiscord,
  BsInstagram,
  BsLine,
  BsLink,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs"
import type { DescriptionProps, SNSType } from "../../../types/description"
import { isRegisteredSNS } from "../../../utils/functions"

const fgColorMap: { [key in SNSType]?: string } = {
  Twitter: "#fff",
  Instagram: "#fff",
  YouTube: "#fff",
  Discord: "#fff",
  LINE: "#fff",
}

const bgColorMap: { [key in SNSType]?: string } = {
  Twitter: "#2E94DA",
  Instagram: "#D35CCA",
  YouTube: "#FF0000",
  Discord: "#5865F2",
  LINE: "#29C755",
}

const iconMap: { [key in SNSType]?: JSX.Element } = {
  Twitter: <BsTwitter />,
  Instagram: <BsInstagram />,
  YouTube: <BsYoutube />,
  Discord: <BsDiscord />,
  LINE: <BsLine />
}

export const DescriptionText: React.VFC<DescriptionProps> = (props) => {
  return (
    <GridItem colSpan={{ base: 12, md: 6 }}>
      <VStack spacing="1rem">
        <Text fontSize="1.5rem" color="text.main">
          このサークルについて
        </Text>
        <Text color="text.main" px="1rem">
          {props.content}
        </Text>
        <HStack alignSelf="start" px="1rem">
          {props.links?.map((link) => {
            const label = link.label
            const registerdSNS = isRegisteredSNS(label)
            return (
              <Link href={link.path} key={link.path} isExternal _hover={{}}>
                <Button
                  color={registerdSNS ? fgColorMap[label] : "button.text.gray"}
                  backgroundColor={
                    registerdSNS ? bgColorMap[label] : "button.gray"
                  }
                  leftIcon={registerdSNS ? iconMap[label] : <BsLink />}
                  fontSize="0.75rem"
                  borderRadius="2px"
                  height="2rem"
                  minWidth="6rem"
                  _hover={{
                    opacity: 0.6,
                  }}
                  _focus={{}}
                  _active={{}}
                >
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </HStack>
      </VStack>
    </GridItem>
  )
}
