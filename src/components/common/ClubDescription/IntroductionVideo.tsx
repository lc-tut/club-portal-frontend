import { AspectRatio, GridItem, Text, VStack } from "@chakra-ui/react"

import type { IntroductionVideoProps } from "../../../types/description"

export const IntroductionVideo: React.FC<IntroductionVideoProps> = (props) => {
  return props.videoPath ? (
    <GridItem colSpan={12} justifySelf="center">
      <VStack spacing="1rem" w="100%">
        <Text fontSize="1.5rem" color="text.main">
          紹介動画
        </Text>
        <AspectRatio
          ratio={16 / 9}
          width={{ base: "90vw", md: "70vw", lg: "50vw", xl: "40vw" }}
        >
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
