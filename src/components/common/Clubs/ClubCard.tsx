import { Flex, HStack, VStack, Text, Image } from "@chakra-ui/react"
import { ClubCardProps } from "../../../types/clubs"
import { ClubTypeBadge } from "../ClubTypeBadge"

export const ClubCard: React.VFC<ClubCardProps> = (props) => {
  return (
    <Flex
      height="7rem"
      boxShadow="md"
      backgroundColor="#fff"
      borderRadius="3px"
    >
      <HStack spacing="1rem">
        <Image src={props.thumbnail} height="4rem" ml="1.5rem" />
        <VStack alignSelf="start" pt="1rem" alignItems="start" spacing="0">
          <HStack spacing="10px">
            <ClubTypeBadge content="hachioji" />
            <ClubTypeBadge content="culture" />
          </HStack>
          <Text fontSize="1.2rem" color="text.card.main" pt="0.5rem">
            {props.name}
          </Text>
          <Text fontSize="0.8rem" color="text.card.sub" pt="0.2rem">
            {props.brief}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  )
}