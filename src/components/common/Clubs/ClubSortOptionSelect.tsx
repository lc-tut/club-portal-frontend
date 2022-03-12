import { Select } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"

type ClubSortOptionSelectProps = {
  sortOption: string
  setSortOption: Dispatch<SetStateAction<string>>
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
      value={props.sortOption}
      onChange={(e) => {
        props.setSortOption(e.target.value)
      }}
    >
      <option value="name-asc">名前 昇順</option>
      <option value="name-desc">名前 降順</option>
    </Select>
  )
}
