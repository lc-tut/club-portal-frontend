import { AspectRatio, GridItem, Text, VStack } from "@chakra-ui/react"
import { IntroductionVideoProps } from "../../../types/description"

export const IntroductionVideo: React.VFC<IntroductionVideoProps> = (props) => {
  return props.videoPath ? (
    <GridItem colSpan={12} width="50%" justifySelf="center">
      <VStack spacing="1rem">
        <Text fontSize="1.5rem" color="text.main">
          紹介動画
        </Text>
        <AspectRatio ratio={16 / 9} width="100%">
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/" + props.videoPath}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      </VStack>
    </GridItem>
  ) : (
    <></>
  )
}
