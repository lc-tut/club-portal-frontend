import { Select } from "@chakra-ui/react"

export const ClubCardSortOptionSelect: React.VFC<{}> = () => {
  return (
    <Select
      width="9rem"
      backgroundColor="#fff"
      color="text.main"
      borderColor="text.card.main"
      iconColor="text.card.main"
    >
      <option value="name-asc">名前順</option>
      <option value="opt-01">Option 01</option>
      <option value="opt-02">Option 02</option>
      <option value="opt-03">Option 03</option>
    </Select>
  )
}