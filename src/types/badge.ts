export const campuses = ["hachioji", "kamata"] as const
export const activities = ["sports", "culture", "committee"] as const

export type BadgeCampus = typeof campuses[number]
export type BadgeActivity = typeof activities[number]
export type BadgeContent = BadgeCampus | BadgeActivity
export type BadgeSize = "card" | "page"

export type ClubTypeBadgeProp = {
  content: BadgeContent
  badgetype?: BadgeSize
}
