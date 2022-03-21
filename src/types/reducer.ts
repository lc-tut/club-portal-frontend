export type TimePlaceStateType = {
  isDateDisabled: boolean
  isTimeDisabled: boolean
  isRoomDisabled: boolean
}

export type TimePlaceActionType = {
  type: "date" | "time" | "room"
}
