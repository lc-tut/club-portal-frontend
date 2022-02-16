import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { BsClockHistory, BsMegaphone, BsSearch, BsStar } from "react-icons/bs"
import { Link } from "react-router-dom"
import { MenuButton } from "../components/common/Button"
import { PortalLogo } from "../components/common/Icon"

const AnimatedTop: React.VFC<{}> = () => {
  return (
    <Flex flex="1" bgGradient="radial(#ffffff, green.100)">
      <VStack flex="1" spacing="4rem">
        <VStack alignItems="end" spacing="0">
          <Heading
            pt="5rem"
            pb="0"
            fontFamily="futura-pt-bold"
            fontSize="4.5rem"
            color="green.900"
            textAlign="justify"
          >
            TUT Club Portal
          </Heading>
          <Text fontFamily="futura-pt-bold" fontSize="1.2rem" color="green.700">
            Preview
          </Text>
        </VStack>

        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(2, 1fr)"
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
                  w="20rem"
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
              <MenuButton leftIcon={<BsSearch />}>サークルを探す</MenuButton>
            </Link>
          </GridItem>
          <GridItem>
            <MenuButton pbstyle="solid" leftIcon={<BsMegaphone />} isDisabled>
              お知らせ
            </MenuButton>
          </GridItem>
          <GridItem>
            <Flex width="20rem">
              <MenuButton
                flex="4"
                mbtype="sub"
                pbstyle="solid"
                leftIcon={<BsClockHistory />}
                isDisabled
              >
                履歴
              </MenuButton>
              <Spacer width="1.5rem" />
              <Link to="/favorites">
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
        <Link to="/club-description-test">
          {" "}
          サークル紹介ページのテスト Link{" "}
        </Link>
      </VStack>
    </Flex>
  )
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
