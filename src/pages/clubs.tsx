import { Flex } from "@chakra-ui/react"
import { TitleArea } from "../components/global/TitleArea"

const AnimatedClubs: React.VFC<{}> = () => {
  return (
    <Flex flex="1" alignItems="start" backgroundColor="background.main">
      <TitleArea>サークル一覧</TitleArea>
    </Flex>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
