import { Grid, GridItem, VStack } from "@chakra-ui/react"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { AchievementEditor } from "../../components/common/Editor/AchievementEditor"
import { ContentEditor } from "../../components/common/Editor/ContentEditor"
import { TimePlaceEditor } from "../../components/common/Editor/TimePlaceEditor"
import { DetailLinkEditor } from "../../components/common/Editor/DetailLinkEditor"

export const DetailEditor: React.VFC<{}> = () => {
  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>詳細情報の編集</TitleArea>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        columnGap="1rem"
        rowGap="3rem"
      >
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <ContentEditor />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <TimePlaceEditor />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <AchievementEditor />
        </GridItem>
        <GridItem>
          <DetailLinkEditor />
        </GridItem>
      </Grid>
    </VStack>
  )
}
