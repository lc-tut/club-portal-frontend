export type CarouselGalleryProps = {
  imagePaths: Array<string>
}

export type IntroductionVideoProps = {
  videoPath: string
}

export type DescriptionProps = {
  content: string
  links?: Array<{ label: string, path: string }>
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
  achievements?: Array<string>
  mail?: Array<string>
  website?: Array<string>
  remark?: Array<string>
}

export type AnnualPlanProps = {[key in number]?: { schedule: string, remarks?: string }}

export type SNSType = "twitter" | "instagram"
export type AllSNSType = SNSType | "other"

export type RemarkProps = {
  texts: Array<string>
  width?: string
}
