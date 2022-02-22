import type { BadgeActivity, BadgeCampus } from "../types/badge"
import { SNSType } from "../types/description"

export const PADDING_BEFORE_FOOTER = "6rem"
export const VALID_SNS_LIST: ReadonlyArray<SNSType> = ["twitter", "instagram"]
export const CAMPUS: ReadonlyArray<BadgeCampus> = ["hachioji", "kamata"]
export const ACTIVITY: ReadonlyArray<BadgeActivity> = ["sports", "culture", "committee"]
