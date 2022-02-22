export type CarouselGalleryProps = {
  imagePaths: string[]
}

export type IntroductionVideoProps = {
  videoPath: string
}

export type DescriptionProps = {
  content: string
  links?: Array<{ label: string, path: string }>
}

export type DetailInformationProps = {
  activity?: string[]
  datetime?: { [key: string]: string }
  place?: string[]
  mail?: string[]
  website?: string[]
  remark?: string[]
}

export type AnnualPlanProps = {[key in number]?: { schedule: string, remarks?: string }}

export type SNSType = "twitter" | "instagram"
export type AllSNSType = SNSType | "other"
