import type { Reducer } from "react"
import type { FilterActionType, FilterStateType } from "../types/reducer"
import {
  RESET_FILTER,
  SET_NAME_ASC,
  SET_NAME_DESC,
  TOGGLE_IS_COMMITTEE,
  TOGGLE_IS_CULTURE_CLUB,
  TOGGLE_IS_HACHIOJI_CAMPUS,
  TOGGLE_IS_KAMATA_CAMPUS,
  TOGGLE_IS_SPORTS_CLUB,
} from "../utils/consts"

export const filterReducer: Reducer<FilterStateType, FilterActionType> = (
  state: FilterStateType,
  actions: FilterActionType
) => {
  switch (actions.type) {
    case TOGGLE_IS_HACHIOJI_CAMPUS:
      return { ...state, isHachiojiCampus: !state.isHachiojiCampus }
    case TOGGLE_IS_KAMATA_CAMPUS:
      return { ...state, isKamataCampus: !state.isKamataCampus }
    case TOGGLE_IS_SPORTS_CLUB:
      return { ...state, isSportsClub: !state.isSportsClub }
    case TOGGLE_IS_CULTURE_CLUB:
      return { ...state, isCultureClub: !state.isCultureClub }
    case TOGGLE_IS_COMMITTEE:
      return { ...state, isCommittee: !state.isCommittee }
    case SET_NAME_ASC:
      return { ...state, isAscending: true }
    case SET_NAME_DESC:
      return { ...state, isAscending: false }
    case RESET_FILTER:
      return {
        isHachiojiCampus: true,
        isKamataCampus: true,
        isSportsClub: true,
        isCultureClub: true,
        isCommittee: true,
        isAscending: true,
      }
  }
}
