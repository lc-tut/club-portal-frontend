import { Flex, Grid, GridItem, useMediaQuery, VStack } from "@chakra-ui/react"
import { ClubCard } from "../components/common/Clubs/ClubCard"
import { ClubCardSortOptionSelect } from "../components/common/Clubs/ClubCardSortOptionSelect"
import { TitleArea } from "../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../static/consts"

const TestCards: React.VFC<{}> = () => {
  const items: JSX.Element[] = []
  for (let i = 0; i < 10; i++) {
    items.push(
      <GridItem key={i}>
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

  return <>{items}</>
}

export const AnimatedFavorites: React.VFC<{}> = () => {
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
            <ClubCardSortOptionSelect />
          </Flex>
          <Grid
            templateColumns={templateColumns}
            rowGap="1rem"
            columnGap="2rem"
            w="100%"
          >
            <TestCards />
          </Grid>
        </VStack>
      </Flex>
    </VStack>
  )
}

export const Favorites: React.VFC<{}> = () => {
  return <AnimatedFavorites />
}
