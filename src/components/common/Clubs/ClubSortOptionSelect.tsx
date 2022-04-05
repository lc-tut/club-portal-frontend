import { Select } from "@chakra-ui/react"
import type { Dispatch } from "react"
import type { FilterActionType, FilterStateType, SET_NAME_ASC_ACTION, SET_NAME_DESC_ACTION } from "../../../types/reducer"

type ClubSortOptionSelectProps = {
  isAscending: FilterStateType["isAscending"]
  dispatchIsAscending: Dispatch<FilterActionType>
}

export const ClubSortOptionSelect: React.VFC<ClubSortOptionSelectProps> = (
  props
) => {
  return (
    <Select
      width="9rem"
      backgroundColor="#fff"
      color="text.main"
      borderColor="text.card.main"
      iconColor="text.card.main"
      value={props.isAscending ? "SET_NAME_ASC" : "SET_NAME_DESC"}
      onChange={(e) => {
        props.dispatchIsAscending({ type: e.target.value as unknown as SET_NAME_ASC_ACTION | SET_NAME_DESC_ACTION })
      }}
    >
      <option value="SET_NAME_ASC">名前 - 昇順</option>
      <option value="SET_NAME_DESC">名前 - 降順</option>
    </Select>
  )
}
