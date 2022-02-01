import { GridItem, Image } from "@chakra-ui/react"
import { AspectRatio } from "@chakra-ui/react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/bundle"

SwiperCore.use([Pagination, Navigation])

export const CarouselGallery: React.VFC<{}> = () => {
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