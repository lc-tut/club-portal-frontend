import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubSortOptionSelect } from "../components/common/Clubs/ClubSortOptionSelect"
import {
  BrowserClubFilter,
  defaultFilter,
  Filter,
} from "../components/common/Clubs/ClubFilter"
import { TitleArea } from "../components/global/Header/TitleArea"
import { Loading } from "../components/global/LoadingPage"
import { useAPI } from "../hooks/useAPI"
import type { ClubPageExternal } from "../types/api"
import { PADDING_BEFORE_FOOTER } from "../utils/consts"
import { getActivity, getCampus } from "../utils/functions"
import { ErrorPage } from "./error"

const AnimatedClubs: React.VFC<{}> = () => {
  const { data, isLoading, isError } =
    useAPI<Array<ClubPageExternal>>("/api/v1/clubs")
  const [sortedClubs, setSortedClubs] = useState<Array<ClubPageExternal>>([])

  const [filterInputData, setFilterInputData] = useState<Filter>(defaultFilter)
  const [filter, setFilter] = useState<Filter>(defaultFilter)
  const [sortOption, setSortOption] = useState<string>("name-asc")

  const [isMobileLayout] = useMediaQuery("(max-width: 62em)")
  const [isSmallPadding] = useMediaQuery("(max-width: 30em)")

  // sort clubs
  useEffect(() => {
    if (data) {
      data.sort((val1, val2) => {
        if (sortOption == "name-asc") {
          return val1.name.localeCompare(val2.name)
        } else if (sortOption == "name-desc") {
          return val2.name.localeCompare(val1.name)
        } else {
          return 0
        }
      })
      setSortedClubs(data)
    }
  }, [data, sortOption])

  // filter clubs
  function getFilteredClubs() {
    const filteredClubs: Array<ClubPageExternal> = []
    sortedClubs.map((club) => {
      // exclude by name, short_description
      if (
        !club.name
          .toLocaleLowerCase()
          .includes(filter.keyword.toLocaleLowerCase()) &&
        !club.shortDescription
          .toLocaleLowerCase()
          .includes(filter.keyword.toLocaleLowerCase())
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

  if (isError) {
    return <ErrorPage />
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
      <Stack
        width="100%"
        height="100%"
        spacing="0"
        direction={isMobileLayout ? "column" : "row"}
      >
        <BrowserClubFilter
          filter={filterInputData}
          setFilter={setFilterInputData}
          onReset={() => {
            const newFilterInput = { ...defaultFilter }
            newFilterInput.flags = { ...defaultFilter.flags }
            setFilterInputData(newFilterInput)
            setFilter(newFilterInput)
          }}
          onApply={() => {
            const newFilter = { ...filterInputData }
            setFilter(newFilter)
          }}
          isMobileLayout={isMobileLayout}
        />
        <Box
          py="2rem"
          px={isSmallPadding ? "0.5rem" : "3rem"}
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
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                  }}
                  rowGap="1rem"
                  columnGap="2rem"
                >
                  {getFilteredClubs().map((club, i) => (
                    <GridItem colSpan={1} key={i}>
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
                  <Text color="text.main">
                    条件に合うサークルが見つかりませんでした。
                  </Text>
                )}
              </>
            ) : (
              <Loading />
            )}
          </Stack>
        </Box>
      </Stack>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
