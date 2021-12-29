import { Flex, Heading, HStack, Center, Text, VStack } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { PortalBanner } from "../common/PortalBanner";
import { BsSearch } from "react-icons/bs"
import { IconType } from "react-icons"

type WebGlobalMenuProps = {
  icon: IconType
  label: string | JSX.Element
  islast?: boolean
}

const WebGlobalMenu: React.VFC<PropsWithChildren<WebGlobalMenuProps>> = (props) => {
  const borderRight = props.islast ? "1px" : "0"

  return (
    <Center
      width="6rem"
      height="6rem"
      borderLeft="1px"
      borderRight={borderRight}
      color="text.sub"
    >
      <VStack>
        {<props.icon size="2rem" />}
        <Text textAlign="center">
          {props.label}
        </Text>
      </VStack>
    </Center>
  )
}

export const TitleArea: React.VFC<PropsWithChildren<{}>> = (props) => {
  return (
    <Flex
      flex="1"
      mt="2rem"
      justifyContent="center"
    >
      <PortalBanner alignSelf="center" />
      <Heading
        justifySelf="center"
        alignSelf="center"
        fontSize="2.5rem"
      >
        {props.children}
      </Heading>
      <HStack spacing="0">
        <WebGlobalMenu
          icon={BsSearch}
          label={<>サークル<br/><></>検索</>}
        />
        <WebGlobalMenu
          icon={BsSearch}
          label="お知らせ"
        />
        <WebGlobalMenu
          icon={BsSearch}
          label="お気に入り"
        />
        <WebGlobalMenu
          icon={BsSearch}
          label="履歴"
          islast={true}
        />
      </HStack>
    </Flex>
  );
}
