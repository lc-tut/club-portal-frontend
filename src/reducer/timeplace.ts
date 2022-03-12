import { Reducer } from "react"
import type { TimePlaceStateType, TimePlaceActionType } from "../types/reducer"

export const timePlaceReducer: Reducer<
  TimePlaceStateType,
  TimePlaceActionType
> = (state: TimePlaceStateType, action: TimePlaceActionType) => {
  switch (action.type) {
    case "time":
      return {
        isTimeDisabled: !state.isTimeDisabled,
        isPlaceDisabled: state.isPlaceDisabled,
        isRoomDisabled: !state.isRoomDisabled,
      }
    case "place":
      return {
        isTimeDisabled: state.isTimeDisabled,
        isPlaceDisabled: !state.isPlaceDisabled,
        isRoomDisabled: !state.isRoomDisabled,
      }
    case "room":
      return {
        isTimeDisabled: state.isTimeDisabled,
        isPlaceDisabled: state.isPlaceDisabled,
        isRoomDisabled: !state.isRoomDisabled,
      }
  }
}
