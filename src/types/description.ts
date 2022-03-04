import { IconType } from "react-icons"

export type CarouselGalleryProps = {
  imagePaths: Array<string>
}

export type IntroductionVideoProps = {
  videoPath: string
}

export type DescriptionProps = {
  content: string
  links?: Array<{ label: string; path: string }>
}

export type TimePlace = {
  date: string
  time: string
  place: string
  timeRemark?: string
  placeRemark?: string
}

export type DetailInformationProps = {
  activity: Array<string>
  timePlaces: Array<TimePlace>
  achievements?: Array<string>
  mail?: Array<string>
  website?: Array<string>
  remark?: string
}

export type AnnualPlanProps = {
  remark?: string
  schedules: {
    [key in number]: string
  }
}

export type RowComponentProps = {
  icon: IconType
  label: string
  lastIndex?: boolean
}

export type ActivityRemarkButtonProps = {
  text: string
}

export type SNSType = "twitter" | "instagram"
export type AllSNSType = SNSType | "other"

export type RemarkProps = {
  text: string
}
