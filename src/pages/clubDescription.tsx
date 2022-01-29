import { HStack, Icon, VStack, Flex } from "@chakra-ui/react"
import { TitleArea } from "../components/global/TitleArea"
import { ClubTypeBadge } from "../components/common/ClubTypeBadge"
import { BsClock, BsStar } from "react-icons/bs"
import { PortalButton } from "../components/common/Button"
import { FavoriteButton } from "../components/common/Button"

const AnimatedClubDescription: React.VFC<{}> = () => {
  return <VStack flex="1">
    <TitleArea subtitle="サークルの簡単な説明">
      サークル名
    </TitleArea>
    <HStack>
      <ClubTypeBadge content="hachioji" badgetype="page" />
      <ClubTypeBadge content="culture" badgetype="page" />
      <Flex color="text.sub" alignItems="center">
        <Icon as={BsClock} mr="5px" />
        最終更新: 2022 1/30
      </Flex>
      <FavoriteButton />
    </HStack>
  </VStack>
}

export const ClubDescription: React.VFC<{}> = () => {
  return <AnimatedClubDescription />
}