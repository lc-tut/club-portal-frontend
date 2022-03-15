import type { BadgeCampus, BadgeActivity } from "../types/badge"
import type { SNSType } from "../types/description"
import { CAMPUS, ACTIVITY } from "./consts"

export function toAbsolutePath(path: string): string {
  return path.startsWith("blob")
    ? path
    : `${location.protocol}//${location.host}/${path}`
}

export const getCampus = (num: number): BadgeCampus => CAMPUS[num]
export const getActivity = (num: number): BadgeActivity => ACTIVITY[num]
export const isRegisteredSNS = (label: string): label is SNSType =>
  label === "Twitter" ||
  label === "Instagram" ||
  label === "Discord" ||
  label === "YouTube" // || label === "LINE" || label === "Blog"
