import { GridItem, VStack, Text, HStack, Link, Button } from "@chakra-ui/react"
import { BsInstagram, BsLink, BsTwitter } from "react-icons/bs"

import type { DescriptionProps, SNSType } from "../../../types/description"

const isRegisteredSNS = (label: string): label is SNSType =>
  label === "twitter" || label === "instagram"

const fgColorMap: { [key in SNSType]: string } = {
  twitter: "#fff",
  instagram: "#fff",
}

const bgColorMap: { [key in SNSType]: string } = {
  twitter: "#2E94DA",
  instagram: "#D35CCA",
}

const iconMap: { [key in SNSType]: JSX.Element } = {
  twitter: <BsTwitter />,
  instagram: <BsInstagram />,
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
              <Link href={link.path} key={link.path} isExternal>
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
