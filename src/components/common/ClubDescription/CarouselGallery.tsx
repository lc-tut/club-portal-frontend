import {
  GridItem,
  Image,
  AspectRatio,
  Center,
  useMediaQuery,
} from "@chakra-ui/react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import type { CarouselGalleryProps } from "../../../types/description"
import "swiper/css/bundle"

SwiperCore.use([Pagination, Navigation])

export const CarouselGallery: React.VFC<CarouselGalleryProps> = (props) => {
  const numImages = props.imagePaths.length

  const [is1slides, is2slides] = useMediaQuery([
    "(min-width: 30em)",
    "(min-width: 48em)",
  ])
  let slidesPerView = 0
  if (is1slides) slidesPerView = 1
  if (is2slides && numImages >= 2) slidesPerView = 2

  return (
    <GridItem colSpan={12}>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={32}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {props.imagePaths.map((path, i) => (
          <SwiperSlide key={i}>
            <Center>
              <AspectRatio
                ratio={16 / 9}
                w={{ sm: "90%", md: "70%", lg: "60%" }}
              >
                <Image src={`${location.protocol}//${location.host}/${path}`} />
              </AspectRatio>
            </Center>
          </SwiperSlide>
        ))}
      </Swiper>
    </GridItem>
  )
}
