import { Flex, Grid, GridItem, useMediaQuery, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubSortOptionSelect } from "../components/common/Clubs/ClubSortOptionSelect"
import { TitleArea } from "../components/global/Header/TitleArea"
import { Loading } from "../components/global/LoadingPage"
import { useAPI } from "../hooks/useAPI"
import { useOutletUser } from "../hooks/useOutletUser"
import { PADDING_BEFORE_FOOTER } from "../utils/consts"
import type { ClubPageExternal } from "../types/api"
import { getCampus, getActivity } from "../utils/functions"
import { ErrorPage } from "./error"

export const AnimatedFavorites: React.VFC<{}> = () => {
  const { userUuid } = useOutletUser()
  const { data, isLoading, isError } = useAPI<Array<ClubPageExternal>>(
    `/api/v1/users/${userUuid}/favs`
  )
  const [is1col, is2col, is3col] = useMediaQuery([
    "(min-width: 440px)",
    "(min-width: 980px)",
    "(min-width: 1480px)",
  ])
  let templateColumns = ""
  if (is3col) templateColumns = "repeat(3, 1fr)"
  else if (is2col) templateColumns = "repeat(2, 1fr)"
  else if (is1col) templateColumns = "repeat(1, 1fr)"
  else templateColumns = "repeat(1, 1fr)"

  const [sortOption, setSortOption] = useState<string>("name-asc")
  const [sortedClubs, setSortedClubs] = useState<Array<ClubPageExternal>>([])

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

  if (isError) {
    return <ErrorPage />
  }

  return (
    <VStack flex="1" spacing="2rem">
      <TitleArea>お気に入りのサークル</TitleArea>
      <Flex
        justifyContent="center"
        flex="1"
        w="100%"
        pb={PADDING_BEFORE_FOOTER}
        pt="2rem"
        backgroundColor="background.cards"
      >
        <VStack w="80%" spacing="3rem">
          <Flex w="100%">
            <ClubSortOptionSelect
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </Flex>
          {!isLoading ? (
            <Grid
              templateColumns={templateColumns}
              rowGap="1rem"
              columnGap="2rem"
              w="100%"
            >
              {sortedClubs.map((club, index) => (
                <GridItem key={index}>
                  <Link to={`/clubs/${club.clubSlug}`}>
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
            <Loading />
          )}
        </VStack>
      </Flex>
    </VStack>
  )
}

export const Favorites: React.VFC<{}> = () => {
  return <AnimatedFavorites />
}
