type Role = "domain" | "general" | "admin"

export type Session = {
  sessionUUID: string
  userUUID: string
  email: string
  name: string
  role: Role
} | null

export type UserInfo = {
  userUUID: string
  email: string
  name: string
  role: Role
  clubUUID?: string
}

export type Thumbnail = {
  thumbnailID: number
  path: string
}

export type Content = {
  content: string
}

export type Link = {
  label: string
  url: string
}

export type Schedule = {
  month: number // 1 to 12 (uint8)
  schedule: string
  remarks: string | null
}

export type Achievement = {
  achievement: string
}

export type Image = {
  imageID: number
}

export type Video = {
  path: string
}

export type Time = {
  date: string
  time: string
  remarks: string | null
}

export type Place = {
  place: string
  remarks: string | null
}

export type ClubPageExternal = {
  clubUUID: string
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
  clubUUID: string
  name: string
  description: string
  shortDescription: string
  campus: number // 0, 1
  clubType: number // 0, 1, 2
  updatedAt: string // RFC3339
  contents: Array<Content>
  links: Array<Link>
  schedules: Array<Schedule>
  achievements: Array<Achievement>
  images: Array<Image>
  videos: Array<Video>
  times: Array<Time>
  places: Array<Place>
}

export type ActivityDetail = {
  timeID: number
  date: string
  time: string
  timeRemark: string | null
  placeID: number
  place: string
  placeRemark: string | null
}

type ClubUUIDObject = {
  clubUUID: string
}

export type CreateGeneralUserPayload = {
  email: string
  name: string
}

export type ChangeUserPayload = {
  name: string
  role: string
  clubUUID?: string
}

export type RegisterFavoriteClubPayload = ClubUUIDObject

export type UnregisterFavoriteClubPayload = ClubUUIDObject

export type CreateClubPayload = {
  name: string
  description: string
  campus: number // 0, 1
  clubType: number // 0, 1, 2
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
  contents: Array<Content>
  links: Array<Link>
  schedules: Array<Schedule>
  achievements: Array<Achievement>
  images: Array<Image>
  videos: Array<Video>
  activityDetails: Array<ActivityDetail>
}

export type APIPayload =
  | CreateGeneralUserPayload
  | ChangeUserPayload
  | RegisterFavoriteClubPayload
  | UnregisterFavoriteClubPayload
  | CreateClubPayload
  | UpdateClubPayload

export type APIResponse =
  | UserInfo
  | ClubPageExternal
  | ClubPageInternal
  | (Image & { path: string })
  | Thumbnail
