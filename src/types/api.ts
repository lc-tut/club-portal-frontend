import type { DateType } from "./description"

type Role = "domain" | "general" | "admin"

export type Session = {
  sessionUuid: string
  userUuid: string
  email: string
  name: string
  role: Role
  avatar: string
} | null

export type UserInfo = {
  userUuid: string
  email: string
  name: string
  role: Role
  clubUuid?: string
}

export type Thumbnail = {
  thumbnailId: number
  path: string
}

export type Content = {
  content: string
}

export type Description = {
  description: string
}

export type Link = {
  label: string
  url: string
}

export type Schedule = {
  month: number // 1 to 12 (uint8)
  schedule: string
}

export type Achievement = {
  achievement: string
}

export type Image = {
  imageId: number
  path: string
}

export type Video = {
  path: string
}

export type ClubPageExternal = {
  clubUuid: string
  clubSlug: string
  name: string
  description: string
  shortDescription: string
  campus: number // 0, 1
  clubType: number // 0, 1, 2
  updatedAt: string // RFC3339
  thumbnail: Thumbnail
}

export type ClubPageInternal = {
  clubUuid: string
  name: string
  description: string
  shortDescription: string
  campus: number // 0, 1
  clubType: number // 0, 1, 2
  clubRemark?: string
  scheduleRemark?: string
  updatedAt: string // RFC3339
  contents: Array<Content>
  links: Array<Link>
  schedules: Array<Schedule>
  achievements: Array<Achievement>
  images: Array<Image>
  videos: Array<Video>
  activityDetails: Array<ActivityDetail>
}

export type ActivityDetail = {
  timeId: number
  date: DateType
  time: string
  timeRemark?: string
  placeId: number
  place: string
  placeRemark?: string
}

type ClubUUIDObject = {
  clubUuid: string
}

export type UpdateImagePayload = Array<{
  imageId: number
}>

export type CreateGeneralUserPayload = {
  email: string
  name: string
}

export type ChangeUserPayload = {
  name: string
  role: string
  clubUuid?: string
}

export type RegisterFavoriteClubPayload = ClubUUIDObject

export type UnregisterFavoriteClubPayload = ClubUUIDObject

export type FavoriteClubResponse = ClubUUIDObject

export type FavoriteClubStatus = { status: boolean }

export type CreateClubPayload = {
  name: string
  description: string
  shortDescription: string
  campus: number // 0, 1
  clubType: number // 0, 1, 2
  remark?: string
  contents: Array<Content>
  links: Array<Link>
  schedules: Array<Schedule>
  achievements: Array<Achievement>
  images: Array<Image>
  videos: Array<Video>
  activityDetails: Array<ActivityDetail>
}

export type UpdateClubPayload = {
  description: string
  shortDescription: string
  remark?: string
  contents: Array<Content>
  links: Array<Link>
  schedules: Array<Schedule>
  achievements: Array<Achievement>
  images: Array<Image>
  videos: Array<Video>
  activityDetails: Array<ActivityDetail>
}

export type APIPayload =
  | UpdateImagePayload
  | CreateGeneralUserPayload
  | ChangeUserPayload
  | RegisterFavoriteClubPayload
  | UnregisterFavoriteClubPayload
  | CreateClubPayload
  | UpdateClubPayload
  | Description
  | Array<Link>
  | Array<Content>
  | Array<Schedule>
  | Array<Achievement>
  | Array<Video>
  | Array<ActivityDetail>

export type APIResponse =
  | UserInfo
  | Array<ClubPageExternal>
  | ClubPageInternal
  | Array<Image>
  | Thumbnail
  | Array<Link>
  | Array<Content>
  | Array<Schedule>
  | Array<Achievement>
  | Array<Video>
  | Array<ActivityDetail>
  | Description
  | FavoriteClubResponse
  | FavoriteClubStatus
