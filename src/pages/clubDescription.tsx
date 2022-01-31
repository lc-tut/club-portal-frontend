import { Flex, Text, Grid, GridItem, HStack, Icon, VStack, AspectRatio, Image } from "@chakra-ui/react"
import { BsClock } from "react-icons/bs"
import { FavoriteButton } from "../components/common/Button"
import { ClubTypeBadge } from "../components/common/ClubTypeBadge"
import { TitleArea } from "../components/global/TitleArea"

import SwiperCore, { Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/bundle"

SwiperCore.use([Pagination, Navigation])

const IntroductionMovie: React.VFC<{url: string}> = (props) => {
  return <GridItem colSpan={6}>
    <VStack spacing="1rem">
      <Text fontSize="1.5rem">
        紹介動画
      </Text>
      <AspectRatio ratio={16/9} width="100%">
        <iframe
          width="100%"
          height="100%"
          src={props.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
    </VStack>
  </GridItem>
}

const Carousel: React.VFC<{}> = (props) => {
  const slides: Array<JSX.Element> = []
  const images: Array<string> = [
    "https://placekitten.com/g/640/360",
    "https://placehold.jp/400x400.png",
    "https://loremflickr.com/400/400",
    "https://placehold.jp/640x360.png",
    "https://www.fillmurray.com/400/400",
    "https://baconmockup.com/640/360"
  ]

  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <AspectRatio ratio={16/9}>
          <Image
            src={images[i]}
            maxHeight="15rem"
          />
        </AspectRatio>
      </SwiperSlide>
    )
  }

  return (
    <GridItem colSpan={12}>
      <Swiper
        slidesPerView={3}
        spaceBetween={32}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {slides}
      </Swiper>
    </GridItem>
  )
}

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
        width="60%"
        columnGap="1rem"
        rowGap="2rem"
        pb="6rem"
      >
        <IntroductionMovie url="https://www.youtube.com/embed/dy90tA3TT1c" />
        <Carousel />
      </Grid>
    </VStack>
  )
}

export const ClubDescription: React.VFC<{}> = () => {
  return <AnimatedClubDescription />
}