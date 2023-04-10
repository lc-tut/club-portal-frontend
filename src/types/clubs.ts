import type { BadgeActivity, BadgeCampus } from "./badge"

export type ClubCardProps = {
  thumbnail: string
  name: string
  brief: string
  campus: BadgeCampus
  activity: BadgeActivity
}
