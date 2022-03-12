import { GridItem, Image, AspectRatio } from "@chakra-ui/react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import type { CarouselGalleryProps } from "../../../types/description"
import "swiper/css/bundle"

SwiperCore.use([Pagination, Navigation])

export const CarouselGallery: React.VFC<CarouselGalleryProps> = (props) => {
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
        {props.imagePaths.map((path, i) => (
          <SwiperSlide key={i}>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={`${location.protocol}//${location.host}/${path}`}
                maxHeight="15rem"
              />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
    </GridItem>
  )
}
