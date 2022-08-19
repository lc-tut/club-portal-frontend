import type { BadgeActivity, BadgeCampus } from "../types/badge"
import type { DateType, LinkType } from "../types/description"
import type {
  RESET_FILTER_ACTION,
  SET_NAME_ASC_ACTION,
  SET_NAME_DESC_ACTION,
  TOGGLE_DATE_ACITON,
  TOGGLE_IS_COMMITTEE_ACTION,
  TOGGLE_IS_CULTURE_CLUB_ACTION,
  TOGGLE_IS_HACHIOJI_CAMPUS_ACTION,
  TOGGLE_IS_KAMATA_CAMPUS_ACTION,
  TOGGLE_IS_SPORTS_CLUB_ACTION,
  TOGGLE_PLACE_ACTION,
  TOGGLE_ROOM_ACTION,
  TOGGLE_TIME_ACTION,
} from "../types/reducer"

export const PADDING_BEFORE_FOOTER = "6rem"
export const VALID_SNS_LIST: ReadonlyArray<LinkType> = [
  "Twitter",
  "Instagram",
  "Discord",
  "LINE",
  "YouTube",
  "Blog",
  "HP",
]
export const CAMPUS: ReadonlyArray<BadgeCampus> = ["hachioji", "kamata"]
export const ACTIVITY: ReadonlyArray<BadgeActivity> = [
  "culture",
  "sports",
  "committee",
]
export const MONTHS: ReadonlyArray<number> = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3,
]

export const BUILDING_ID_MAP: { [key in number]: string } = {
  110: "講義棟A",
  111: "講義棟D",
  120: "研究棟A",
  130: "片柳研究棟",
  131: "片柳研究棟KC",
  132: "片柳研究棟KE",
  133: "片柳研究棟KW",
  140: "講義実験棟",
  150: "サークル棟",
  160: "メディアホール",
  161: "厚生棟2階学生ラウンジ",
  170: "体育館稽古場",
  171: "演劇稽古場",
  172: "体育館裏プレハブ棟",
  173: "体育館アリーナ",
  174: "弓道場",
  180: "総合グラウンド",
  181: "多目的グラウンド",
  182: "テニスコート",
  301: "外部",
  302: "未定",
}

export const DATE_MAP: { [key in DateType]: string } = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
  Day: "平日",
  Etc: "その他",
}

export const DATE_NUMBER_MAP: { [key in DateType]: number } = {
  Mon: 10,
  Tue: 11,
  Wed: 12,
  Thu: 13,
  Fri: 14,
  Sat: 15,
  Sun: 16,
  Day: 17,
  Etc: 20,
}

export const TOGGLE_DATE: TOGGLE_DATE_ACITON = "TOGGLE_DATE"
export const TOGGLE_TIME: TOGGLE_TIME_ACTION = "TOGGLE_TIME"
export const TOGGLE_PLACE: TOGGLE_PLACE_ACTION = "TOGGLE_PLACE"
export const TOGGLE_ROOM: TOGGLE_ROOM_ACTION = "TOGGLE_ROOM"

export const TOGGLE_IS_HACHIOJI_CAMPUS: TOGGLE_IS_HACHIOJI_CAMPUS_ACTION =
  "TOGGLE_IS_HACHIOJI_CAMPUS"
export const TOGGLE_IS_KAMATA_CAMPUS: TOGGLE_IS_KAMATA_CAMPUS_ACTION =
  "TOGGLE_IS_KAMATA_CAMPUS"
export const TOGGLE_IS_SPORTS_CLUB: TOGGLE_IS_SPORTS_CLUB_ACTION =
  "TOGGLE_IS_SPORTS_CLUB"
export const TOGGLE_IS_CULTURE_CLUB: TOGGLE_IS_CULTURE_CLUB_ACTION =
  "TOGGLE_IS_CULTURE_CLUB"
export const TOGGLE_IS_COMMITTEE: TOGGLE_IS_COMMITTEE_ACTION =
  "TOGGLE_IS_COMMITTEE"
export const SET_NAME_ASC: SET_NAME_ASC_ACTION = "SET_NAME_ASC"
export const SET_NAME_DESC: SET_NAME_DESC_ACTION = "SET_NAME_DESC"
export const RESET_FILTER: RESET_FILTER_ACTION = "RESET_FILTER"
