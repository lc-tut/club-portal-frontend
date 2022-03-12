import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { PADDING_BEFORE_FOOTER } from "../../../static/consts"
import { PortalButton } from "../Button"

const filterFlagKeyList = [
  "inHachioji",
  "inKamata",
  "isCulture",
  "isSports",
  "isCommittee",
] as const
type FilterFlagKey = typeof filterFlagKeyList[number]

export type Filter = {
  keyword: string
  flags: { [key in FilterFlagKey]: boolean }
}

export const defaultFilter: Filter = {
  keyword: "",
  flags: {
    inHachioji: true,
    inKamata: true,
    isCulture: true,
    isSports: true,
    isCommittee: true,
  },
}

type FilterAreaProps = {
  filterInputData: Filter
  setFilterInputData: Dispatch<SetStateAction<Filter>>
  setFilter: Dispatch<SetStateAction<Filter>>
}

type FilterItemProps = {
  label: string
  flagKey: FilterFlagKey
  filterInputData: Filter
  isChecked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
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

export const ClubFilter: React.VFC<FilterAreaProps> = (props) => {
  const onFlagChange = (
    e: ChangeEvent<HTMLInputElement>,
    flagKey: FilterFlagKey
  ) => {
    const newFilterInput = { ...props.filterInputData }
    newFilterInput.flags = { ...props.filterInputData.flags }
    newFilterInput.flags[flagKey] = e.target.checked
    props.setFilterInputData(newFilterInput)
  }
  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilterInput = { ...props.filterInputData }
    newFilterInput.keyword = e.target.value
    props.setFilterInputData(newFilterInput)
  }
  const onReset = () => {
    const newFilterInput = { ...defaultFilter }
    newFilterInput.flags = { ...defaultFilter.flags }
    props.setFilterInputData(newFilterInput)
    props.setFilter(newFilterInput)
  }
  const onSearch = () => {
    const newFilter = { ...props.filterInputData }
    props.setFilter(newFilter)
  }

  const filterItemWrapper = (label: string, flagKey: FilterFlagKey) => {
    return (
      <FilterItem
        label={label}
        flagKey={flagKey}
        filterInputData={props.filterInputData}
        isChecked={props.filterInputData.flags[flagKey]}
        onChange={(e) => onFlagChange(e, flagKey)}
      />
    )
  }

  return (
    <VStack
      width="20rem"
      height="100%"
      pt="2rem"
      pb={PADDING_BEFORE_FOOTER}
      backgroundColor="form.background"
    >
      <Input
        width="18rem"
        backgroundColor="#fff"
        borderColor="form.frame"
        textColor="text.main"
        placeholder="検索キーワード"
        value={props.filterInputData.keyword}
        onChange={onKeywordChange}
        _placeholder={{
          color: "text.sub",
        }}
      />

      <Stack alignSelf="start" spacing="0.5rem" pt="1rem" pl="3rem">
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
      <HStack w="80%" pt="1.5rem">
        <PortalButton pbstyle="solid" width="7rem" onClick={onReset}>
          リセット
        </PortalButton>
        <Spacer flex="1" />
        <PortalButton width="7rem" onClick={onSearch}>
          検索
        </PortalButton>
      </HStack>
    </VStack>
  )
}
