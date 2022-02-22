export type CarouselGalleryProps = {
  images: string[]
}

export type IntroductionMovieProps = {
  youtubeurl: string
}

export type DescriptionProps = {
  // [label: url] i.g. ["twitter": "twitter.com/~~"]
  snslinks?: [string, string][]
  content: string
}

export type DetailInformationProps = {
  activity?: string[]
  datetime?: { [key: string]: string }
  place?: string[]
  mail?: string[]
  website?: string[]
  remark?: string[]
}

export type AnnualPlanProps = {
  month: number
  schedules: string
  remarks?: string
}

export type SNSType = "twitter" | "instagram"
export type AllSNSType = SNSType | "other"
