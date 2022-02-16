import {
  Box,
  BoxProps,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubCardSortOptionSelect } from "../components/common/Clubs/ClubCardSortOptionSelect"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { TitleArea } from "../components/global/Header/TitleArea"

type FilterItemProps = {
  label: string
  flagKey: FilterFlagKey
  value: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type FilterAreaProps = {
  filterInput: FilterInput
  setFilterInput: Dispatch<SetStateAction<FilterInput>>
}

const filterFlagKeyList = [
  "inHachioji",
  "inKamata",
  "isCulture",
  "isSports",
  "isCommittee",
] as const
type FilterFlagKey = typeof filterFlagKeyList[number]

type FilterInput = {
  keyword: string
  flags: { [key in FilterFlagKey]: boolean }
}

const FilterItem: React.VFC<FilterItemProps> = (props) => {
  return (
    <FormControl display="flex" pl="1rem">
      <FormLabel width="8rem" fontSize="1.25rem" mb="0">
        {props.label}
      </FormLabel>
      <Switch colorScheme="green" size="lg" />
    </FormControl>
  )
}

const FilterCategoryLabel: React.VFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
      {props.children}
    </Text>
  )
}

const FilterArea: React.VFC<FilterAreaProps> = (props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>, id: FilterFlagKey) => {
    const newFilterInput = { ...props.filterInput }
    newFilterInput.flags[id] = e.target.value === "true"
    props.setFilterInput({
      ...props.filterInput,
    })
  }

  return (
    <VStack
      width="20rem"
      height="100%"
      py="2rem"
      backgroundColor="form.background"
      {...props}
    >
      <Input
        width="18rem"
        backgroundColor="#fff"
        borderColor="form.frame"
        placeholder="検索キーワード"
        _placeholder={{
          color: "text.sub",
        }}
      />

      <Stack alignSelf="start" spacing="0.5rem" pt="1rem" pl="3rem">
        <FilterCategoryLabel>キャンパス</FilterCategoryLabel>
        <FilterItem
          label="八王子"
          flagKey="inHachioji"
          value={props.filterInput.flags.inHachioji}
          onChange={(e) => {
            onChange(e, "inHachioji")
          }}
        />
        <FilterItem
          label="蒲田"
          flagKey="inKamata"
          value={props.filterInput.flags.inKamata}
          onChange={(e) => {
            onChange(e, "inKamata")
          }}
        />
        <FilterCategoryLabel>分類</FilterCategoryLabel>
        <FilterItem label="文化系" flagKey="isCulture" />
        <FilterItem label="体育系" flagKey="isSports" />
        <FilterItem label="実行委員会" flagKey="isCommittee" />
      </Stack>
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
  const [filterInput, setFilterInput] = useState<FilterInput>({
    keyword: "",
    flags: {
      inHachioji: true,
      inKamata: true,
      isCulture: true,
      isSports: true,
      isCommittee: true,
    },
  })

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
