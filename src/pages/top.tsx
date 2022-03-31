import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  useMediaQuery,
  VStack,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react"
import React from "react"
import {
  BsBoxArrowUpRight,
  BsClockHistory,
  BsMegaphone,
  BsSearch,
  BsStar,
} from "react-icons/bs"
import { Link } from "react-router-dom"
import { MenuButton } from "../components/common/Button"
import { PortalLogo } from "../components/common/Icon"
import { PADDING_BEFORE_FOOTER } from "../utils/consts"

const AnimatedTop: React.VFC<{}> = () => {
  const [isTitleSmall] = useMediaQuery(["(max-width: 600px)"])
  const [is1Col] = useMediaQuery(["(max-width: 1000px)"])
  const [isAdjustMenuWidth] = useMediaQuery(["(max-width: 380px)"])

  return (
    <Flex flex="1" bgGradient="radial(#ffffff, green.100)">
      <VStack
        flex="1"
        spacing={is1Col ? "1rem" : "4rem"}
        pb={PADDING_BEFORE_FOOTER}
      >
        <VStack alignItems="end" spacing="0">
          <Heading
            pt={isTitleSmall ? "3.5rem" : "5rem"}
            pb="0"
            fontFamily="futura-pt-bold"
            fontSize={isTitleSmall ? "2.5rem" : "4.4rem"}
            color="green.900"
            textAlign="justify"
          >
            TUT Club Portal
          </Heading>
          <Text
            fontFamily="futura-pt-bold"
            fontSize="1.2rem"
            color="green.700"
            pr="2rem"
          >
            Preview
          </Text>
        </VStack>

        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns={is1Col ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
          columnGap="2.5rem"
          rowGap="1rem"
        >
          {/* ----- left content ----- */}
          <GridItem rowSpan={3}>
            <Grid
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(1, 1fr)"
              h="100%"
              rowGap="1rem"
            >
              <GridItem rowSpan={2}>
                <Center h="100%">
                  <PortalLogo minH="100%" w="auto" />
                </Center>
              </GridItem>
              <GridItem rowSpan={1}>
                <Flex
                  w={isAdjustMenuWidth ? "90vw" : "20rem"}
                  p="0"
                  m="0"
                  fontSize="1rem/18"
                  color="text.main"
                  textAlign="center"
                >
                  TUT Club
                  Portalは東京工科大学のサークル情報を掲載する大学公認Webサイトです。
                </Flex>
              </GridItem>
            </Grid>
          </GridItem>
          {/* ----- right content ----- */}
          <GridItem>
            <Link to="/clubs">
              <MenuButton
                leftIcon={<BsSearch />}
                width={isAdjustMenuWidth ? "90vw" : undefined}
              >
                サークルを探す
              </MenuButton>
            </Link>
          </GridItem>
          <GridItem>
            <MenuButton
              pbstyle="solid"
              leftIcon={<BsMegaphone />}
              width={isAdjustMenuWidth ? "90vw" : undefined}
              isPreparing
            >
              お知らせ
            </MenuButton>
          </GridItem>
          <GridItem>
            <Flex width={isAdjustMenuWidth ? "90vw" : "20rem"}>
              <MenuButton
                flex="4"
                mbtype="sub"
                pbstyle="solid"
                leftIcon={<BsClockHistory />}
                isPreparing
              >
                履歴
              </MenuButton>
              <Spacer width="1.5rem" />
              <Link to="/users/favs">
                <MenuButton
                  flex="6"
                  mbtype="sub"
                  pbstyle="solid"
                  leftIcon={<BsStar />}
                >
                  お気に入り
                </MenuButton>
              </Link>
            </Flex>
          </GridItem>
        </Grid>
        <ChakraLink href="https://tutkamata-sinkan.jp" color="green.800">
          <HStack>
            <Text>蒲田キャンパスのサークル紹介はこちら</Text>
            <BsBoxArrowUpRight />
          </HStack>
        </ChakraLink>
      </VStack>
    </Flex>
  )
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
