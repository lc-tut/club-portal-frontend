import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { IconType } from "react-icons"
import { BsClockHistory, BsMegaphone, BsSearch, BsStar } from "react-icons/bs"
import { Link } from "react-router-dom"
import { PortalBanner } from "./PortalBanner"

type BrowserGlobalNavItemProps = {
  icon: IconType
  label: string | JSX.Element
  href: string
  islast?: boolean
  isNotAvailable?: boolean
}

const BrowserGlobalNavItem: React.FC<
  React.PropsWithChildren<BrowserGlobalNavItemProps>
> = (props) => {
  const borderRight = props.islast ? "1px" : "0"

  return (
    <VStack>
      <Link to={props.href}>
        <Box color="text.sub" borderLeft="1px" borderRight={borderRight}>
          <Button
            backgroundColor="transparent"
            width="5rem"
            height="5rem"
            borderRadius="0"
            isDisabled={props.isNotAvailable}
            _hover={{
              backgroundColor: "transparent",
              opacity: "0.4",
            }}
            _focus={{}}
            _active={{}}
          >
            <VStack alignSelf="flex-start" height="100%">
              <props.icon size="2rem" />
              <Center flex="1">
                <Text textAlign="center" fontSize="0.85rem">
                  {props.label}
                </Text>
              </Center>
            </VStack>
          </Button>
        </Box>
      </Link>
      {props.isNotAvailable && (
        <Text fontSize="0.8rem" color="text.sub">
          準備中です
        </Text>
      )}
    </VStack>
  )
}

const BrowserGlobalNav: React.FC<{}> = () => {
  return (
    <HStack alignItems="start" spacing="0">
      <BrowserGlobalNavItem
        label={
          <>
            サークル
            <br />
            検索
          </>
        }
        icon={BsSearch}
        href="/clubs"
      />
      <BrowserGlobalNavItem
        label="お気に入り"
        icon={BsStar}
        href="/users/favs"
      />
      <BrowserGlobalNavItem
        label="お知らせ"
        icon={BsMegaphone}
        href="#"
        isNotAvailable
      />
      <BrowserGlobalNavItem
        icon={BsClockHistory}
        href="#"
        label="履歴"
        islast={true}
        isNotAvailable
      />
    </HStack>
  )
}

export const TitleArea: React.FC<
  React.PropsWithChildren<{ subtitle?: string }>
> = (props) => {
  const [isTitleOnly] = useMediaQuery(["(min-width: 80em)"])

  return (
    <HStack mt="2rem" px="3rem" justifyContent="center" width="100%">
      <VStack spacing="1rem">
        {isTitleOnly && (
          <Link to="/">
            <PortalBanner alignSelf="center" />
          </Link>
        )}
        {/* {isMobile && (
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
        )} */}
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
        <Text height="1rem" textColor="text.title.sub">
          {props.subtitle}
        </Text>
      </VStack>
      {isTitleOnly && <BrowserGlobalNav />}
    </HStack>
  )
}
