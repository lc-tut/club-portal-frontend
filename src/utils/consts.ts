import type { BadgeActivity, BadgeCampus } from "../types/badge"
import { DateType, SNSType } from "../types/description"

export const PADDING_BEFORE_FOOTER = "6rem"
export const VALID_SNS_LIST: ReadonlyArray<SNSType> = [
  "Twitter",
  "Instagram",
  "Discord",
  "LINE",
  "YouTube",
  "Blog",
]
export const CAMPUS: ReadonlyArray<BadgeCampus> = ["hachioji", "kamata"]
export const ACTIVITY: ReadonlyArray<BadgeActivity> = [
  "sports",
  "culture",
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
