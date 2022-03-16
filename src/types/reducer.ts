export type TimePlaceStateType = {
  isDateDisabled: boolean
  isTimeDisabled: boolean
  isPlaceDisabled: boolean
  isRoomDisabled: boolean
}

export type TimePlaceActionType = {
  type: "date" | "time" | "place" | "room"
}
