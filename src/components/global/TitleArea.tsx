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

const WebGlobalMenu: React.VFC<React.PropsWithChildren<WebGlobalMenuProps>> = (
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
        <props.icon size="2rem" />
        <Center flex="1">
          <Text textAlign="center" fontSize="0.85rem">
            {props.label}
          </Text>
        </Center>
      </VStack>
    </Center>
  )
}

export const TitleArea: React.VFC<React.PropsWithChildren<{subtitle?: string}>> = (props) => {
  return (
    <HStack mt="2rem" px="3rem" justifyContent="center" width="100%">
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
      <VStack flex="1">
        <Heading
          justifySelf="center"
          alignSelf="center"
          fontSize="2.5rem"
          textAlign="center"
          textColor="green.900"
        >
          {props.children}
        </Heading>
        <Text
          height="1rem"
          textColor="text.title.sub"
        >
          {props.subtitle}
        </Text>
      </VStack>
      <Flex alignItems="center">
        <WebGlobalMenu
          icon={BsSearch}
          label={
            <>
              サークル
              <br />
              検索
            </>
          }
        />
        <WebGlobalMenu icon={BsMegaphone} label="お知らせ" />
        <WebGlobalMenu icon={BsStar} label="お気に入り" />
        <WebGlobalMenu icon={BsClockHistory} label="履歴" islast={true} />
      </Flex>
    </HStack>
  )
}
