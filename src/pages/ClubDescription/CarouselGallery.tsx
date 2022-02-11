import { GridItem, Image } from "@chakra-ui/react"
import { AspectRatio } from "@chakra-ui/react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { CarouselGalleryProps } from "../../types/description"
import "swiper/css/bundle"

SwiperCore.use([Pagination, Navigation])

export const CarouselGallery: React.VFC<CarouselGalleryProps> = (props) => {
  const slides: Array<JSX.Element> = []

  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <AspectRatio ratio={16 / 9}>
          <Image src={props.images[i]} maxHeight="15rem" />
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
