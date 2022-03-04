import { Flex, Grid, HStack, Icon, VStack } from "@chakra-ui/react"
import { BsClock } from "react-icons/bs"
import { FavoriteButton } from "../Button"
import { ClubTypeBadge } from "../ClubTypeBadge"
import { TitleArea } from "../../global/Header/TitleArea"

import { IntroductionVideo } from "./IntroductionMovie"
import { DescriptionText } from "./DescriptionText"
import { CarouselGallery } from "./CarouselGallery"
import { DetailInformation } from "./DetailInformation"
import { AnnualPlan } from "./AnnualPlan"

const AnimatedClubDescription: React.VFC<{}> = () => {
  return (
    <VStack flex="1">
      <TitleArea subtitle="サークルの簡単な説明">サークル名</TitleArea>
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
        width={{ base: "80%", xl: "60%", lg: "80%" }}
        columnGap="1rem"
        rowGap="3rem"
        pb="6rem"
        alignItems="center"
      >
        <IntroductionVideo videoPath="https://www.youtube.com/embed/dy90tA3TT1c" />
        <CarouselGallery
          imagePaths={[
            "https://placekitten.com/g/640/360",
            "https://placehold.jp/400x400.png",
            "https://loremflickr.com/400/400",
            "https://placehold.jp/640x360.png",
            "https://www.fillmurray.com/400/400",
            "https://baconmockup.com/640/360",
          ]}
        />
        <DescriptionText
          links={[
            { label: "twitter", path: "https://twitter.com/lc_tut" },
            {
              label: "instagram",
              path: "https://www.instagram.com/instagram/",
            },
          ]}
          content="サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明サークル説明サークル説明 サークル説明サークル説明サークル説明"
        />
        <DetailInformation
          activity={[
            "活動内容はああああああああああああです",
            "いいいいいという活動も行っています",
          ]}
          placeAndTimes={[
            {
              date: "月",
              time: "19:00 ~ 21:00",
              place: "サークル棟AAA",
            },
            {
              date: "水",
              time: "20:00 ~ 21:30",
              place: "講義実験棟111",
              placeRemark:
                "参加人数が少ない場合は部室(研究棟A123)で活動を行います。",
            },
            {
              date: "金",
              time: "19:00 ~ 21:00",
              place: "講義実験棟222",
              timeRemark: "参加者の都合で早めに終わる日が多いです。",
            },
          ]}
          achievements={[
            "なんとやら大会に出場",
            "あの大会で金賞獲得うおおおおおおお",
          ]}
          mail={["account@mail.example.com"]}
          website={["https://example.co.jp/introduce/this/club"]}
          remark="これは脚注ですうううううううううううううううあああああああああうおおおおおおおおおおおお

          2行目"
        />
        <AnnualPlan
          schedules={{
            2: "何かしらのイベント",
            4: "新入生歓迎会",
            8: "夏合宿",
            10: "ああああああああ大会",
            12: "クリスマスパーティ",
          }}
          remark="これは脚注ですよおおおおおおおおお"
        />
      </Grid>
    </VStack>
  )
}

export const ClubDescription: React.VFC<{}> = () => {
  return <AnimatedClubDescription />
}
