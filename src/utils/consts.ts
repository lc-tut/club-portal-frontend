import type { BadgeActivity, BadgeCampus } from "../types/badge"
import { SNSType } from "../types/description"

export const PADDING_BEFORE_FOOTER = "6rem"
export const VALID_SNS_LIST: ReadonlyArray<SNSType> = ["twitter", "instagram"]
export const CAMPUS: ReadonlyArray<BadgeCampus> = ["hachioji", "kamata"]
export const ACTIVITY: ReadonlyArray<BadgeActivity> = [
  "sports",
  "culture",
  "committee",
]
export const MONTHS: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
