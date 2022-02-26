import { GridItem, VStack, Text, HStack, Link, Button } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { BsInstagram, BsLink, BsTwitter } from "react-icons/bs"
import { DescriptionProps, SNSId, snsList } from "../../types/description"

function getSnsId(label: string): SNSId {
  if (snsList.some((value) => value === label)) {
    return label as SNSId
  }
  return "other"
}

const fgColorMap: { [key in SNSId]: string } = {
  twitter: "#fff",
  instagram: "#fff",
  other: "button.text.gray",
}
const bgColorMap: { [key in SNSId]: string } = {
  twitter: "#2E94DA",
  instagram: "#D35CCA",
  other: "button.gray",
}
const iconMap: { [key in SNSId]: IconType } = {
  twitter: BsTwitter,
  instagram: BsInstagram,
  other: BsLink,
}

export const DescriptionText: React.VFC<DescriptionProps> = (props) => {
  const snsLinks = props.snslinks ?? []

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
          {snsLinks.map((link) => {
            const snsId = getSnsId(link[0])
            const LeftIcon = iconMap[snsId]
            return (
              <Link href={link[1]} key={link[1]}>
                <Button
                  color={fgColorMap[snsId]}
                  backgroundColor={bgColorMap[snsId]}
                  leftIcon={<LeftIcon />}
                  fontSize="0.75rem"
                  borderRadius="2px"
                  height="2rem"
                  minWidth="6rem"
                >
                  {link[0]}
                </Button>
              </Link>
            )
          })}
        </HStack>
      </VStack>
    </GridItem>
  )
}
