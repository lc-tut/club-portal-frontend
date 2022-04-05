import type { Reducer } from "react"
import type { TimePlaceStateType, TimePlaceActionType } from "../types/reducer"
import {
  TOGGLE_DATE,
  TOGGLE_PLACE,
  TOGGLE_ROOM,
  TOGGLE_TIME,
} from "../utils/consts"

export const timePlaceReducer: Reducer<
  TimePlaceStateType,
  TimePlaceActionType
> = (state: TimePlaceStateType, action: TimePlaceActionType) => {
  switch (action.type) {
    case TOGGLE_DATE:
      return {
        ...state,
        isDateDisabled: !state.isDateDisabled,
      }
    case TOGGLE_TIME:
      return {
        ...state,
        isTimeDisabled: !state.isTimeDisabled,
      }
    case TOGGLE_PLACE:
      return {
        ...state,
        isPlaceDisabled: !state.isPlaceDisabled,
      }
    case TOGGLE_ROOM:
      return {
        ...state,
        isRoomDisabled: !state.isRoomDisabled,
      }
  }
}
