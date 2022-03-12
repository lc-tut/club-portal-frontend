import type { BadgeCampus, BadgeActivity } from "../types/badge"
import { CAMPUS, ACTIVITY } from "./consts"

export function toAbsolutePath(path: string): string {
  return path.startsWith("blob")
    ? path
    : `${location.protocol}//${location.host}/${path}`
}

export const getCampus = (num: number): BadgeCampus => CAMPUS[num]
export const getActivity = (num: number): BadgeActivity => ACTIVITY[num]
