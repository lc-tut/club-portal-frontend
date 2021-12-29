import { Box, VStack } from "@chakra-ui/react"
import { TitleArea } from "../components/global/TitleArea"

const ClubCard: React.VFC<{}> = (props) => {
  return (
    <Box>this is card</Box>
  )
}

const AnimatedClubs: React.VFC<{}> = () => {
  return (
    <VStack alignItems="start" backgroundColor="background.main">
      {/* TODO: ここはHeaderに含めたい */}
      <TitleArea>サークル一覧</TitleArea>
      <Box flex="1">
        <ClubCard></ClubCard>
      </Box>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
