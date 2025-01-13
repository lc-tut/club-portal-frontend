import { centerCrop, makeAspectCrop } from "react-image-crop"

import type { BadgeActivity, BadgeCampus } from "../types/badge"
import type { DateType, LinkType } from "../types/description"

import { ACTIVITY, CAMPUS, DATE_NUMBER_MAP } from "./consts"

export function toAbsolutePath(path: string) {
  return path.startsWith("blob")
    ? path
    : `${location.protocol}//${location.host}/${path}`
}

export function getCampus(num: number): BadgeCampus {
  return CAMPUS[num]
}
export function getActivity(num: number): BadgeActivity {
  return ACTIVITY[num]
}
export function isRegisteredSNS(label: string): label is LinkType {
  return (
    label === "Twitter" ||
    label === "Instagram" ||
    label === "Discord" ||
    label === "YouTube" ||
    label === "LINE"
  )
}

export function toTimeID(
  date: DateType,
  startHourTime: number,
  startMinuteTime: number,
  endHourTime: number,
  endMinuteTime: number
) {
  const subTime =
    (endHourTime - startHourTime) * 60 + (endMinuteTime - startMinuteTime)
  return Number(
    `${DATE_NUMBER_MAP[date]}${startHourTime
      .toString()
      .padStart(2, "0")}${startMinuteTime.toString().padStart(2, "0")}${subTime
      .toString()
      .padStart(3, "0")}`
  )
}

export function toPlaceID(buildingID: number, roomNumber: number) {
  return Number(`${buildingID}${roomNumber.toString().padStart(6, "0")}`)
}

export function makeCenterCrop(width: number, height: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 50 }, 1, width, height),
    width,
    height
  )
}
