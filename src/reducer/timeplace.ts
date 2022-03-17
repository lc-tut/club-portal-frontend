import type { Reducer } from "react"
import type { TimePlaceStateType, TimePlaceActionType } from "../types/reducer"

export const timePlaceReducer: Reducer<
  TimePlaceStateType,
  TimePlaceActionType
> = (state: TimePlaceStateType, action: TimePlaceActionType) => {
  switch (action.type) {
    case "date":
      return {
        ...state,
        isDateDisabled: !state.isDateDisabled,
      }
    case "time":
      return {
        ...state,
        isTimeDisabled: !state.isTimeDisabled,
      }
    case "place":
      return {
        ...state,
        isPlaceDisabled: !state.isPlaceDisabled,
      }
    case "room":
      return {
        ...state,
        isRoomDisabled: !state.isRoomDisabled,
      }
  }
}
