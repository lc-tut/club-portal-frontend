import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import {
  AspectRatio,
  Center,
  GridItem,
  Image,
  useMediaQuery,
} from "@chakra-ui/react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import type { CarouselGalleryProps } from "../../../types/description"

export const CarouselGallery: React.FC<CarouselGalleryProps> = (props) => {
  const numImages = props.imagePaths.length

  const [is2slides] = useMediaQuery(["(min-width: 48em)"])
  let slidesPerView = 1
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
                w={{ base: "90vw", md: "70vw", lg: "50vw", xl: "40vw" }}
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
