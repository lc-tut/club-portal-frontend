import { Flex, Grid, HStack, Icon, VStack } from "@chakra-ui/react"
import React from "react"
import { BsClock } from "react-icons/bs"
import { FavoriteButton } from "../../components/common/Button"
import { ClubTypeBadge } from "../../components/common/ClubTypeBadge"
import { TitleArea } from "../../components/global/TitleArea"

import { IntroductionMovie } from "./IntroductionMovie"
import { DescriptionText } from "./DescriptionText"
import { CarouselGallery } from "./CarouselGallery"
import { DetailInformation } from "./DetailInformation"
import { AnnualPlan } from "./AnnualPlan"

const AnimatedClubDescription: React.VFC<{}> = () => {
  return (
    <VStack flex="1">
      <TitleArea subtitle="サークルの簡単な説明">
        サークル名
      </TitleArea>
      <HStack spacing="2rem" pb="3rem">
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
      <Grid
        templateColumns="repeat(12, 1fr)"
        width={{ base: "95%", xl: "60%", lg: "80%" }}
        columnGap="1rem"
        rowGap="2rem"
        pb="6rem"
        alignItems="center"
      >
        <IntroductionMovie youtubeurl="https://www.youtube.com/embed/dy90tA3TT1c" />
        <CarouselGallery />
        <DescriptionText
          snslinks={[
            ["twitter", "https://twitter.com/lc_tut"],
            ["instagram", "https://www.instagram.com/instagram/"]
          ]}
          content="サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明"
        />
        <DetailInformation />
        <AnnualPlan />
      </Grid>
    </VStack>
  )
}

export const ClubDescription: React.VFC<{}> = () => {
  return <AnimatedClubDescription />
}