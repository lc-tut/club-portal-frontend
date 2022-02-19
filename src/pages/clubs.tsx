import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubCardSortOptionSelect } from "../components/common/Clubs/ClubCardSortOptionSelect"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { TitleArea } from "../components/global/Header/TitleArea"
import { PortalButton } from "../components/common/Button/PortalButton"
import { PADDING_BEFORE_FOOTER } from "../static/consts"

const filterFlagKeyList = [
  "inHachioji",
  "inKamata",
  "isCulture",
  "isSports",
  "isCommittee",
] as const
type FilterFlagKey = typeof filterFlagKeyList[number]

const defaultFilterInput: FilterInput = {
  keyword: "",
  flags: {
    inHachioji: true,
    inKamata: true,
    isCulture: true,
    isSports: true,
    isCommittee: true,
  },
}

type FilterItemProps = {
  label: string
  flagKey: FilterFlagKey
  filterInput: FilterInput
  isChecked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type FilterAreaProps = {
  filterInput: FilterInput
  setFilterInput: Dispatch<SetStateAction<FilterInput>>
}

type FilterInput = {
  keyword: string
  flags: { [key in FilterFlagKey]: boolean }
}

const FilterCategoryLabel: React.VFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
      {props.children}
    </Text>
  )
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

const FilterArea: React.VFC<FilterAreaProps> = (props) => {
  const onFlagChange = (
    e: ChangeEvent<HTMLInputElement>,
    flagKey: FilterFlagKey
  ) => {
    const newFilterInput = { ...props.filterInput }
    newFilterInput.flags[flagKey] = e.target.checked
    props.setFilterInput(newFilterInput)
  }
  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilterInput = { ...props.filterInput }
    newFilterInput.keyword = e.target.value
    props.setFilterInput(newFilterInput)
  }
  const onReset = () => {
    console.log("猫リセット")
    props.setFilterInput(defaultFilterInput)
  }

  const filterItemWrapper = (label: string, flagKey: FilterFlagKey) => {
    return (
      <FilterItem
        label={label}
        flagKey={flagKey}
        filterInput={props.filterInput}
        isChecked={props.filterInput.flags[flagKey]}
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
        placeholder="検索キーワード"
        value={props.filterInput.keyword}
        onChange={onKeywordChange}
        _placeholder={{
          color: "text.sub",
        }}
      />

      <Stack alignSelf="start" spacing="0.5rem" pt="1rem" pl="3rem">
        <FilterCategoryLabel>キャンパス</FilterCategoryLabel>
        {filterItemWrapper("八王子", "inHachioji")}
        {filterItemWrapper("蒲田", "inKamata")}
        <FilterCategoryLabel>分類</FilterCategoryLabel>
        {filterItemWrapper("文化系", "isCulture")}
        {filterItemWrapper("体育系", "isSports")}
        {filterItemWrapper("実行委員会", "isCommittee")}
      </Stack>
      <Spacer h="1.5rem" />
      <HStack w="80%">
        <PortalButton pbstyle="solid" width="7rem" onClick={onReset}>
          リセット
        </PortalButton>
        <Spacer flex="1" />
        <PortalButton width="7rem">検索</PortalButton>
      </HStack>
    </VStack>
  )
}

const TestCards: React.VFC<{}> = () => {
  const cards: Array<JSX.Element> = []

  for (let i = 0; i < 5; i++) {
    cards.push(
      <GridItem key={i} colSpan={{ xl: 4, lg: 6, sm: 12 }}>
        <ClubCard
          thumbnail="https://placehold.jp/400x400.png"
          name="アミューズメントメディア研究会"
          campus="hachioji"
          activity="culture"
          brief="the most exciting club"
        />
      </GridItem>
    )
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" rowGap="1rem" columnGap="2rem">
      {cards}
    </Grid>
  )
}

const AnimatedClubs: React.VFC<{}> = () => {
  const [filterInput, setFilterInput] =
    useState<FilterInput>(defaultFilterInput)

  return (
    <VStack
      flex="1"
      alignItems="start"
      backgroundColor="background.main"
      spacing="1rem"
    >
      {/* TODO: TitleAreaはHeaderに含めたい */}
      <TitleArea>サークル一覧</TitleArea>
      <HStack width="100%" height="100%" spacing="0">
        <FilterArea filterInput={filterInput} setFilterInput={setFilterInput} />
        <Box
          py="2rem"
          px="3rem"
          pb={PADDING_BEFORE_FOOTER}
          flex="1"
          height="100%"
          alignItems="start"
          backgroundColor="background.cards"
        >
          <Stack spacing="3rem">
            <ClubCardSortOptionSelect />
            <TestCards />
          </Stack>
        </Box>
      </HStack>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
