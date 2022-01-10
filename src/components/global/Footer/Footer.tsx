import { Button, Center, Flex, HStack, Spacer, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { PortalLogo } from "../../common/Icon"
import { About } from "./About"
import { FooterModal, FooterModalProps } from "./FooterModal"
import { Howto } from "./Howto"
import { Policy } from "./Policy"

type elementKeysType = "about" | "policy" | "howto"
type elementValueType = Pick<FooterModalProps, "title" | "element">

const elementKeysArray: ReadonlyArray<elementKeysType> = ["about", "policy", "howto"] as const

const elements: {[key in elementKeysType]: elementValueType} = {
  "about": {
    title: "このサイトについて",
    element: <About />
  },
  "policy": {
    title: "プライバシーポリシー",
    element: <Policy />
  },
  "howto": {
    title: "サイトの使い方",
    element: <Howto />
  }
}

// TODO: サイトページの説明用のページ/コンポーネントを作成する
export const Footer: React.VFC<{}> = () => {
  const [elementKey, setElementKey] = useState<elementKeysType>("about")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickLinkButton = (k: elementKeysType) => {
    setElementKey(k)
    onOpen()
  }

  return (
    <>
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
          {elementKeysArray.map(k => (
            <Button color="white" fontSize="xs" variant='link' onClick={() => onClickLinkButton(k)} key={k}>
              {elements[k].title}
            </Button>
          ))}
        </HStack>
        <Spacer />
        <Center>
          <Text color="white" fontSize="xs">
            Made by LinuxClub under MIT License.
          </Text>
        </Center>
      </Flex>
    </Center>

    <FooterModal title={elements[elementKey].title} element={elements[elementKey].element} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
