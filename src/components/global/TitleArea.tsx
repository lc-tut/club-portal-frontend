import {
  Flex,
  Heading,
  HStack,
  Center,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { PortalBanner } from "../common/PortalBanner"
import {
  BsChevronRight,
  BsClockHistory,
  BsMegaphone,
  BsSearch,
  BsStar,
} from "react-icons/bs"
import { IconType } from "react-icons"

type WebGlobalMenuProps = {
  icon: IconType
  label: string | JSX.Element
  islast?: boolean
}

const WebGlobalMenu: React.VFC<PropsWithChildren<WebGlobalMenuProps>> = (
  props
) => {
  const borderRight = props.islast ? "1px" : "0"

  return (
    <Center
      width="5rem"
      height="5rem"
      borderLeft="1px"
      borderRight={borderRight}
      color="text.sub"
    >
      <VStack alignSelf="flex-start" height="100%">
        {<props.icon size="2rem" />}
        <Center flex="1">
          <Text textAlign="center" fontSize="0.85rem">
            {props.label}
          </Text>
        </Center>
      </VStack>
    </Center>
  )
}

export const TitleArea: React.VFC<PropsWithChildren<{}>> = (props) => {
  return (
    <Flex flex="1" mt="2rem" justifyContent="center" mx="3rem">
      <VStack spacing="1rem">
        <PortalBanner alignSelf="center" />
        <Breadcrumb
          separator={<BsChevronRight />}
          fontSize="0.8rem"
          color="green.700"
          alignSelf="start"
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">PageA</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">PageB</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </VStack>
      <Heading
        justifySelf="center"
        alignSelf="center"
        fontSize="2.5rem"
        flex="1"
        textAlign="center"
      >
        {props.children}
      </Heading>
      <HStack spacing="0">
        <WebGlobalMenu
          icon={BsSearch}
          label={
            <>
              サークル
              <br />
              <></>検索
            </>
          }
        />
        <WebGlobalMenu icon={BsMegaphone} label="お知らせ" />
        <WebGlobalMenu icon={BsStar} label="お気に入り" />
        <WebGlobalMenu icon={BsClockHistory} label="履歴" islast={true} />
      </HStack>
    </Flex>
  )
}
