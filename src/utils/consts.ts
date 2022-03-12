import type { BadgeActivity, BadgeCampus } from "../types/badge"
import { DateType, SNSType } from "../types/description"

export const PADDING_BEFORE_FOOTER = "6rem"
export const VALID_SNS_LIST: ReadonlyArray<SNSType> = ["twitter", "instagram"]
export const CAMPUS: ReadonlyArray<BadgeCampus> = ["hachioji", "kamata"]
export const ACTIVITY: ReadonlyArray<BadgeActivity> = [
  "sports",
  "culture",
  "committee",
]
export const MONTHS: ReadonlyArray<number> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
]

export const BUILDING_ID_MAP: { [key in number]: string } = {
  1: "サークル棟",
  10: "研究棟A",
  11: "研究棟B",
  12: "研究棟C",
  13: "研究棟D",
  20: "講義実験棟",
}

export const DATE_MAP: { [key in DateType]: string } = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
  Day: "平日",
  Etc: "その他",
}
