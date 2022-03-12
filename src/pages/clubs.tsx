import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
<<<<<<< HEAD
  Select,
  Spinner,
=======
  Spacer,
>>>>>>> refactoring/202202/CaffeineFree/clubs_filter
  Stack,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubCardSortOptionSelect } from "../components/common/Clubs/ClubCardSortOptionSelect"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { TitleArea } from "../components/global/Header/TitleArea"
<<<<<<< HEAD
import { useAPI } from "../hooks/useAPI"
import type { BadgeActivity, BadgeCampus } from "../types/badge"
import type { ClubPageExternal } from "../types/api"
import { ACTIVITY, CAMPUS } from "../utils/consts"
import { Link } from "react-router-dom"
=======
import { PortalButton } from "../components/common/Button/PortalButton"
import { PADDING_BEFORE_FOOTER } from "../static/consts"
>>>>>>> refactoring/202202/CaffeineFree/clubs_filter

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
    newFilterInput.flags = { ...props.filterInput.flags }
    newFilterInput.flags[flagKey] = e.target.checked
    props.setFilterInput(newFilterInput)
  }
  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilterInput = { ...props.filterInput }
    newFilterInput.keyword = e.target.value
    props.setFilterInput(newFilterInput)
  }
  const onReset = () => {
    const newFilterInput = { ...defaultFilterInput }
    newFilterInput.flags = { ...defaultFilterInput.flags }
    props.setFilterInput(newFilterInput)
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
        textColor="text.main"
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

const AnimatedClubs: React.VFC<{}> = () => {
  const { data, isLoading, isError } =
    useAPI<Array<ClubPageExternal>>("/api/v1/clubs")
  const toast = useToast()

  const getCampus = (num: number): BadgeCampus => CAMPUS[num]
  const getActivity = (num: number): BadgeActivity => ACTIVITY[num]

  if (isError) {
    return (
      <>
        {toast({
          title: "Error!",
          description: "データ取得中にエラーが発生しました！",
          status: "error",
          isClosable: true,
          duration: 6000,
          position: "top-right",
        })}
      </>
    )
  }

  return (
<<<<<<< HEAD
=======
    <Grid templateColumns="repeat(12, 1fr)" rowGap="1rem" columnGap="2rem">
      {cards}
    </Grid>
  )
}

const AnimatedClubs: React.VFC<{}> = () => {
  const [filterInput, setFilterInput] =
    useState<FilterInput>(defaultFilterInput)

  return (
>>>>>>> refactoring/202202/CaffeineFree/clubs_filter
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
<<<<<<< HEAD
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
            {!isLoading ? (
              <Grid
                templateColumns="repeat(12, 1fr)"
                rowGap="1rem"
                columnGap="2rem"
              >
                {data?.map((club, i) => (
                  <GridItem colSpan={{ xl: 4, lg: 6, sm: 12 }} key={i}>
                    <Link to={club.clubSlug}>
                      <ClubCard
                        name={club.name}
                        brief={club.shortDescription}
                        campus={getCampus(club.campus)}
                        activity={getActivity(club.clubType)}
                        thumbnail={club.thumbnail.path}
                      />
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Spinner />
            )}
=======
            <ClubCardSortOptionSelect />
            <TestCards />
>>>>>>> refactoring/202202/CaffeineFree/clubs_filter
          </Stack>
        </Box>
      </HStack>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
