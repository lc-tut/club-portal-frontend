import {
  Box,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import type { Filter } from "../components/common/Clubs/ClubFilter"
import {
  ClubFilter,
  defaultFilter,
} from "../components/common/Clubs/ClubFilter"
import { ClubSortOptionSelect } from "../components/common/Clubs/ClubSortOptionSelect"
import { TitleArea } from "../components/global/Header/TitleArea"
import { useAPI } from "../hooks/useAPI"
import { PADDING_BEFORE_FOOTER } from "../static/consts"
import type { ClubPageExternal } from "../types/api"
import type { BadgeActivity, BadgeCampus } from "../types/badge"
import { ACTIVITY, CAMPUS } from "../utils/consts"

const AnimatedClubs: React.VFC<{}> = () => {
  const { data, isLoading, isError } =
    useAPI<Array<ClubPageExternal>>("/api/v1/clubs")
  const [sortedClubs, setSortedClubs] = useState<Array<ClubPageExternal>>([])

  const toast = useToast()

  const [filterInputData, setFilterInputData] = useState<Filter>(defaultFilter)
  const [filter, setFilter] = useState<Filter>(defaultFilter)
  const [sortOption, setSortOption] = useState<string>("name-asc")

  // sort clubs
  useEffect(() => {
    const newSortedClubs: Array<ClubPageExternal> = []
    data?.map((club) => {
      newSortedClubs.push({ ...club })
    })

    newSortedClubs?.sort((val1, val2) => {
      if (sortOption == "name-asc") {
        return val1.name.localeCompare(val2.name)
      } else if (sortOption == "name-desc") {
        return val2.name.localeCompare(val1.name)
      } else {
        return 0
      }
    })
    setSortedClubs(newSortedClubs)
  }, [data, sortOption])

  // filter clubs
  function getFilteredClubs() {
    const filteredClubs: Array<ClubPageExternal> = []
    sortedClubs.map((club) => {
      // exclude by name, short_description
      if (
        !club.name.includes(filter.keyword) &&
        !club.shortDescription.includes(filter.keyword)
      )
        return

      // exclude by campus
      if (club.campus == 0 && !filter.flags.inHachioji) return
      else if (club.campus == 1 && !filter.flags.inKamata) return

      // exclude by type
      if (club.clubType == 0 && !filter.flags.isSports) return
      else if (club.clubType == 1 && !filter.flags.isCulture) return
      else if (club.clubType == 2 && !filter.flags.isCommittee) return

      filteredClubs.push({ ...club })
    })

    return filteredClubs
  }

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
    <VStack
      flex="1"
      alignItems="start"
      backgroundColor="background.main"
      spacing="1rem"
    >
      {/* TODO: TitleAreaはHeaderに含めたい */}
      <TitleArea>サークル一覧</TitleArea>
      <HStack width="100%" height="100%" spacing="0">
        <ClubFilter
          filterInputData={filterInputData}
          setFilterInputData={setFilterInputData}
          setFilter={setFilter}
        />
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
            <ClubSortOptionSelect
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            {!isLoading ? (
              <>
                <Grid
                  templateColumns="repeat(12, 1fr)"
                  rowGap="1rem"
                  columnGap="2rem"
                >
                  {getFilteredClubs().map((club, i) => (
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
                {getFilteredClubs().length === 0 && (
                  <Text color="text.main">条件に合うサークルが見つかりませんでした。</Text>
                )}
              </>
            ) : (
              <Spinner />
            )}
          </Stack>
        </Box>
      </HStack>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
