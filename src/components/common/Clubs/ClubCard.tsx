import {
  Flex,
  HStack,
  Image,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"

import type { ClubCardProps } from "../../../types/clubs"
import { toAbsolutePath } from "../../../utils/functions"

import { ClubTypeBadge } from "./ClubTypeBadge"

export const ClubCard: React.FC<ClubCardProps> = (props) => {
  const [isSmallCard] = useMediaQuery("(max-width: 30em)")

  return (
    <Flex
      height="7rem"
      boxShadow="md"
      backgroundColor="#fff"
      borderRadius="3px"
    >
      <HStack spacing="1rem">
        <Image
          src={toAbsolutePath(props.thumbnail)}
          height="4rem"
          ml={isSmallCard ? "0.8rem" : "1.5rem"}
        />
        <VStack alignSelf="start" pt="1rem" alignItems="start" spacing="0">
          <HStack spacing="10px">
            <ClubTypeBadge content={props.campus} />
            <ClubTypeBadge content={props.activity} />
          </HStack>
          <Text
            fontSize={isSmallCard ? "1rem" : "1.2rem"}
            color="text.card.main"
            pt="0.5rem"
          >
            {props.name}
          </Text>
          <Text
            fontSize={isSmallCard ? "0.7rem" : "0.8rem"}
            color="text.card.sub"
            pt="0.2rem"
          >
            {props.brief}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  )
}
