// Overwrites module space "swiper" due to swiper's bug
// ref: https://github.com/nolimits4web/swiper/issues/6508
// all definition is from the original definition (swiper.d.ts)
// path: node_modules/swiper/swiper.d.ts
// SHOULD BE DELETE THIS DEFINITION FILE WHEN SWIPER RUNS WELL
declare module "swiper" {
  import type { Swiper, SwiperModule } from "swiper/types"
  export type { SwiperOptions } from "swiper/types"
  export const A11y: SwiperModule
  export const Autoplay: SwiperModule
  export const Controller: SwiperModule
  export const EffectCoverflow: SwiperModule
  export const EffectCube: SwiperModule
  export const EffectFade: SwiperModule
  export const EffectFlip: SwiperModule
  export const EffectCreative: SwiperModule
  export const EffectCards: SwiperModule
  export const HashNavigation: SwiperModule
  export const History: SwiperModule
  export const Keyboard: SwiperModule
  export const Lazy: SwiperModule
  export const Mousewheel: SwiperModule
  export const Navigation: SwiperModule
  export const Pagination: SwiperModule
  export const Parallax: SwiperModule
  export const Scrollbar: SwiperModule
  export const Thumbs: SwiperModule
  export const Virtual: SwiperModule
  export const Zoom: SwiperModule
  export const FreeMode: SwiperModule
  export const Grid: SwiperModule
  export const Manipulation: SwiperModule
  export default Swiper
}
