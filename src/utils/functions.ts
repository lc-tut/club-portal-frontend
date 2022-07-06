import { useMediaQuery } from "@chakra-ui/react"
import type { BadgeCampus, BadgeActivity } from "../types/badge"
import type { DateType, SNSType } from "../types/description"
import { CAMPUS, ACTIVITY, DATE_NUMBER_MAP } from "./consts"

export const toAbsolutePath = (path: string) => {
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
  label === "YouTube" ||
  label === "LINE" // || label === "Blog"

export const toTimeID = (
  date: DateType,
  startHourTime: number,
  startMinuteTime: number,
  endHourTime: number,
  endMinuteTime: number
) => {
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

export const toPlaceID = (buildingID: number, roomNumber: number) => {
  return Number(`${buildingID}${roomNumber.toString().padStart(6, "0")}`)
}

export const useIsMobile = () => {
  const [isMobile] = useMediaQuery("(max-width: 32em)")
  return isMobile
}
