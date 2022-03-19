import {
  Button,
  Center,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { PortalLogo } from "../../common/Icon"
import { About } from "./About"
import { FooterModal, FooterModalProps } from "./FooterModal"
import { Howto } from "./Howto"
import { Policy } from "./Policy"

type elementKeysType = "about" | "policy" | "howto"
type elementValueType = Pick<FooterModalProps, "title" | "element">

const elementKeysArray: ReadonlyArray<elementKeysType> = [
  "about",
  "policy",
  "howto",
] as const

const elements: { [key in elementKeysType]: elementValueType } = {
  about: {
    title: "このサイトについて",
    element: <About />,
  },
  policy: {
    title: "プライバシーポリシー",
    element: <Policy />,
  },
  howto: {
    title: "サイトの使い方",
    element: <Howto />,
  },
}

// TODO: サイトページの説明用のページ/コンポーネントを作成する
export const Footer: React.VFC<{}> = () => {
  const [elementKey, setElementKey] = useState<elementKeysType>("about")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isStackVertical] = useMediaQuery("(max-width: 26em)")

  const onClickLinkButton = (k: elementKeysType) => {
    setElementKey(k)
    onOpen()
  }

  return (
    <>
      <VStack spacing="1rem" backgroundColor="green.500" py="1.5rem">
        <Link to="/">
          <VStack>
            <HStack spacing="0">
              <PortalLogo boxSize="3em" mr="5px" />
              <Text color="white" fontSize="1.5rem" fontWeight="bold">
                TUT Club Portal
              </Text>
            </HStack>
            <Center>
              <Text color="white" fontSize="0.8rem" letterSpacing="0.15rem">
                東京工科大学サークルホームページ
              </Text>
            </Center>
          </VStack>
        </Link>
        <Stack
          spacing={isStackVertical ? "1rem" : "2rem"}
          direction={isStackVertical ? "column" : "row"}
        >
          {elementKeysArray.map((k) => (
            <Button
              color="white"
              fontSize="0.8rem"
              variant="link"
              onClick={() => onClickLinkButton(k)}
              key={k}
            >
              {elements[k].title}
            </Button>
          ))}
        </Stack>
        <Center>
          <Text color="white" fontSize="0.8rem">
            Made by LinuxClub under MIT License.
          </Text>
        </Center>
      </VStack>

      <FooterModal
        title={elements[elementKey].title}
        element={elements[elementKey].element}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
