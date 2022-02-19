export type CarouselGalleryProps = {
  images: Array<string>
}

export type IntroductionMovieProps = {
  youtubeurl: string
}

export type DescriptionProps = {
  // [label: url] i.g. ["twitter": "twitter.com/~~"]
  snslinks?: Array<[string, string]>
  content: string
}

export type PlaceAndTime = {
  date: string
  time: string
  place: string
  timeRemark?: string
  placeRemark?: string
}

export type DetailInformationProps = {
  activity: Array<string>
  placeAndTimes: Array<PlaceAndTime>
  mail?: Array<string>
  website?: Array<string>
  remark?: Array<string>
}

export type AnnualPlanProps = {
  schedules: { [key: number]: string }
  remark?: Array<string>
}

export const snsList = ["twitter", "instagram"] as const

export type SNSId = typeof snsList[number] | "other"

export type RemarkProps = {
  texts: Array<string>
  width?: string
}