import { Center, Flex, HStack, Spacer, Text } from "@chakra-ui/react"
import { PortalLogo } from "../common/Icon"

// TODO: サイトページの説明用のページ/コンポーネントを作成する
export const Footer: React.VFC<{}> = () => {
  return (
    <Center h="12rem" backgroundColor="green.500">
      <Flex direction="column">
        <Center>
          <PortalLogo boxSize="3em" mr="5" />
          <Text color="white" fontSize="xl" fontWeight="bold">
            TUT Club Portal
          </Text>
        </Center>
        <Center>
          <Text color="white" fontSize="xs">
            東京工科大学サークルホームページ
          </Text>
        </Center>
        <HStack py="2.5" spacing={8}>
          <Text as="u" color="white" fontSize="xs">
            このサイトについて
          </Text>
          <Text as="u" color="white" fontSize="xs">
            プライバシーポリシー
          </Text>
          <Text as="u" color="white" fontSize="xs">
            サイトの使い方
          </Text>
        </HStack>
        <Spacer />
        <Center>
          <Text color="white" fontSize="xs">
            Made by LinuxClub under MIT License.
          </Text>
        </Center>
      </Flex>
    </Center>
  )
}
