import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { useReducer, useState } from "react"
import { Link } from "react-router-dom"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubSortOptionSelect } from "../components/common/Clubs/ClubSortOptionSelect"
import { ClubFilter } from "../components/common/Clubs/ClubFilter"
import { TitleArea } from "../components/global/Header/TitleArea"
import { Loading } from "../components/global/LoadingPage"
import { useAPI } from "../hooks/useAPI"
import type { ClubPageExternal } from "../types/api"
import { PADDING_BEFORE_FOOTER } from "../utils/consts"
import { getActivity, getCampus } from "../utils/functions"
import { ErrorPage } from "./error"
import { filterReducer } from "../reducer/filter"
import { useClubDisplay } from "../hooks/useClubDisplay"

const AnimatedClubs: React.VFC<{}> = () => {
  const { data, isLoading, isError } =
    useAPI<Array<ClubPageExternal>>("/api/v1/clubs")
  const [state, dispatch] = useReducer(filterReducer, {
    isHachiojiCampus: true,
    isKamataCampus: true,
    isSportsClub: true,
    isCultureClub: true,
    isCommittee: true,
    isAscending: true,
  })
  const [keyword, setKeyword] = useState<string>("")
  const [isMobileLayout] = useMediaQuery("(max-width: 62em)")
  const [isSmallPadding] = useMediaQuery("(max-width: 30em)")
  const sortedClubs = useClubDisplay(data, state, keyword)

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
        <ClubFilter
          filterValues={state}
          dispatchFilterValues={dispatch}
          setKeyword={setKeyword}
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
              isAscending={state.isAscending}
              dispatchIsAscending={dispatch}
            />
            {!isLoading && sortedClubs ? (
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
                  {sortedClubs.map((club, i) => (
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
                {sortedClubs.length === 0 && (
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
