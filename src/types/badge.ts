export type BadgeCampus = "hachioji" | "kamata"
export type BadgeActivity = "culture" | "sports" | "committee"
export type BadgeContent = BadgeCampus | BadgeActivity
export type BadgeSize = "card" | "page"

export type ClubTypeBadgeProp = {
  content: BadgeContent
  badgetype?: BadgeSize
}
