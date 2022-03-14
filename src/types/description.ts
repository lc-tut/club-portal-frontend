import { IconType } from "react-icons"
import type { ActivityDetail } from "./api"

export type CarouselGalleryProps = {
  imagePaths: Array<string>
}

export type IntroductionVideoProps = {
  videoPath?: string
}

export type DescriptionProps = {
  content: string
  links?: Array<{ label: string; path: string }>
}

export type DetailInformationProps = {
  activity: Array<string>
  activityDetail: Array<ActivityDetail>
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

export type SNSType = "Twitter" | "Instagram" | "YouTube" | "Discord"
export type AllSNSType = SNSType | "other"

export type RemarkProps = {
  text: string
}

export type DateType =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun"
  | "Day"
  | "Etc"
