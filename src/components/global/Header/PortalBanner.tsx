import { Center, Flex, Text } from "@chakra-ui/react"

import { PortalLogo } from "../../common/Icon"

export const PortalBanner: React.FC<{}> = () => {
  return (
    <Flex direction="column" alignSelf="center">
      <Center>
        <PortalLogo width="70px" height="100%" mr="8px" />
        <Text color="text.title.sub" fontSize="30px" fontWeight="bold">
          TUT Club Portal
        </Text>
      </Center>
      <Text
        color="text.main"
        fontSize="16px"
        width="100%"
        letterSpacing="4.7px"
      >
        東京工科大学サークルホームページ
      </Text>
    </Flex>
  )
}
