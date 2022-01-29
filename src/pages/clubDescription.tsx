import { Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { BsClock } from "react-icons/bs"
import { FavoriteButton } from "../components/common/Button"
import { ClubTypeBadge } from "../components/common/ClubTypeBadge"
import { TitleArea } from "../components/global/TitleArea"

const AnimatedClubDescription: React.VFC<{}> = () => {
  return <VStack flex="1">
    <TitleArea subtitle="サークルの簡単な説明">
      サークル名
    </TitleArea>
    <HStack spacing="2rem">
      <Flex gap="10px" width="12rem" justifyContent="end">
        <ClubTypeBadge content="hachioji" badgetype="page" />
        <ClubTypeBadge content="culture" badgetype="page" />
      </Flex>
      <Flex color="text.sub" alignItems="center">
        <Icon as={BsClock} mr="5px" />
        最終更新: 2022 1/30
      </Flex>
      <FavoriteButton registered={false} />
    </HStack>
  </VStack>
}

export const ClubDescription: React.VFC<{}> = () => {
  return <AnimatedClubDescription />
}