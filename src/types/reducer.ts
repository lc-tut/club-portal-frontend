export type TimePlaceStateType = {
  isTimeDisabled: boolean
  isPlaceDisabled: boolean
  isRoomDisabled: boolean
}

export type TimePlaceActionType = {
  type: "time" | "place" | "room"
}
