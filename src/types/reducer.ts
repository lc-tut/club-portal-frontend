export type TimePlaceStateType = {
  isDateDisabled: boolean
  isTimeDisabled: boolean
  isPlaceDisabled: boolean
  isRoomDisabled: boolean
}

export type TOGGLE_DATE_ACITON = "TOGGLE_DATE"
export type TOGGLE_TIME_ACTION = "TOGGLE_TIME"
export type TOGGLE_PLACE_ACTION = "TOGGLE_PLACE"
export type TOGGLE_ROOM_ACTION = "TOGGLE_ROOM"

export type TimePlaceActionType = {
  type:
    | TOGGLE_DATE_ACITON
    | TOGGLE_TIME_ACTION
    | TOGGLE_PLACE_ACTION
    | TOGGLE_ROOM_ACTION
}

export type FilterStateType = {
  isHachiojiCampus: boolean
  isKamataCampus: boolean
  isSportsClub: boolean
  isCultureClub: boolean
  isCommittee: boolean
  isAscending: boolean
}

export type TOGGLE_IS_HACHIOJI_CAMPUS_ACTION = "TOGGLE_IS_HACHIOJI_CAMPUS"
export type TOGGLE_IS_KAMATA_CAMPUS_ACTION = "TOGGLE_IS_KAMATA_CAMPUS"
export type TOGGLE_IS_SPORTS_CLUB_ACTION = "TOGGLE_IS_SPORTS_CLUB"
export type TOGGLE_IS_CULTURE_CLUB_ACTION = "TOGGLE_IS_CULTURE_CLUB"
export type TOGGLE_IS_COMMITTEE_ACTION = "TOGGLE_IS_COMMITTEE"
export type SET_NAME_ASC_ACTION = "SET_NAME_ASC"
export type SET_NAME_DESC_ACTION = "SET_NAME_DESC"
export type RESET_FILTER_ACTION = "RESET_FILTER"

export type FilterActionType = {
  type:
    | TOGGLE_IS_HACHIOJI_CAMPUS_ACTION
    | TOGGLE_IS_KAMATA_CAMPUS_ACTION
    | TOGGLE_IS_SPORTS_CLUB_ACTION
    | TOGGLE_IS_CULTURE_CLUB_ACTION
    | TOGGLE_IS_COMMITTEE_ACTION
    | SET_NAME_ASC_ACTION
    | SET_NAME_DESC_ACTION
    | RESET_FILTER_ACTION
}
