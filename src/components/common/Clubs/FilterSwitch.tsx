import { FormControl, FormLabel, Stack, Switch, Text } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { Filter } from "./ClubFilter"

const filterFlagKeyList = [
  "inHachioji",
  "inKamata",
  "isCulture",
  "isSports",
  "isCommittee",
] as const

export type FilterFlagKey = typeof filterFlagKeyList[number]

type FilterSwitchProps = {
  filter: Filter
  setFilter: Dispatch<SetStateAction<Filter>>
}

type FilterItemProps = {
  label: string
  flagKey: FilterFlagKey
  filterInputData: Filter
  isChecked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterItem: React.VFC<FilterItemProps> = (props) => {
  return (
    <FormControl display="flex" pl="1rem">
      <FormLabel width="8rem" fontSize="1.25rem" mb="0">
        {props.label}
      </FormLabel>
      <Switch
        colorScheme="green"
        size="lg"
        isChecked={props.isChecked}
        onChange={(e) => props.onChange(e)}
      />
    </FormControl>
  )
}

export const FilterSwitch: React.VFC<FilterSwitchProps> = (props) => {
  const onFlagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    flagKey: FilterFlagKey
  ) => {
    const newFilterInput = { ...props.filter }
    newFilterInput.flags = { ...props.filter.flags }
    newFilterInput.flags[flagKey] = e.target.checked
    props.setFilter(newFilterInput)
  }

  const filterItemWrapper = (label: string, flagKey: FilterFlagKey) => {
    return (
      <FilterItem
        label={label}
        flagKey={flagKey}
        filterInputData={props.filter}
        isChecked={props.filter.flags[flagKey]}
        onChange={(e) => onFlagChange(e, flagKey)}
      />
    )
  }

  return (
    <Stack spacing="0.5rem" pt="1rem">
      <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
        キャンパス
      </Text>
      {filterItemWrapper("八王子", "inHachioji")}
      {filterItemWrapper("蒲田", "inKamata")}
      <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
        分類
      </Text>
      {filterItemWrapper("文化系", "isCulture")}
      {filterItemWrapper("体育系", "isSports")}
      {filterItemWrapper("委員会", "isCommittee")}
    </Stack>
  )
}
