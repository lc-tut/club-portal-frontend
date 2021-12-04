import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { PortalLogo } from "../components/common/Logo"
import { MenuButton } from "../components/common/Button"
import { BsSearch, BsMegaphone, BsClockHistory, BsStar } from "react-icons/bs"

const AnimatedTop: React.VFC<{}> = () => {
  return (
    <Flex flex="1" bgGradient="radial(#ffffff, green.100)">
      <VStack flex="1" spacing="66px">
        <Heading
          pt="80px"
          fontFamily="futura-pt-bold"
          fontSize="70px"
          color="green.900"
          textAlign="justify"
        >
          TUT Club Portal
        </Heading>

        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(2, 1fr)"
          columnGap="40px"
        >
          {/* ----- left content ----- */}
          <GridItem rowSpan={3}>
            <Grid
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(1, 1fr)"
            >
              <GridItem rowSpan={2}>
                <Center>
                  <PortalLogo h="181px" w="auto" />
                </Center>
              </GridItem>
              <GridItem rowSpan={1}>
                <Flex
                  w="360px"
                  p="0"
                  m="0"
                  fontSize="16px/18"
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
            <MenuButton leftIcon={<BsSearch />}>サークルを探す</MenuButton>
          </GridItem>
          <GridItem>
            <MenuButton pbstyle="solid" leftIcon={<BsMegaphone />}>
              お知らせ
            </MenuButton>
          </GridItem>
          <GridItem>
            <Flex width="340px">
              <MenuButton
                flex="4"
                mbtype="sub"
                pbstyle="solid"
                leftIcon={<BsClockHistory />}
              >
                履歴
              </MenuButton>
              <Spacer width="25px" />
              <MenuButton
                flex="6"
                mbtype="sub"
                pbstyle="solid"
                leftIcon={<BsStar />}
              >
                お気に入り
              </MenuButton>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  )
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
