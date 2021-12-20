import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  VStack,
  Center
} from "@chakra-ui/react"
import React from "react"
import { PortalLogo } from "../components/common/Logo"
import { MenuButton, PortalButton } from "../components/common/Button"
import { BsSearch, BsMegaphone, BsClockHistory, BsStar } from "react-icons/bs"

const AnimatedTop: React.VFC<{}> = () => {
  return (
    <Flex flex="1" bgGradient="radial(#ffffff, green.100)">
      <VStack flex="1" spacing="4rem">
        <Heading
          pt="5rem"
          fontFamily="futura-pt-bold"
          fontSize="4.5rem"
          color="green.900"
          textAlign="justify"
        >
          TUT Club Portal
        </Heading>

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
                  TUT Club Portalは東京工科大学のサークル情報を掲載する大学公認Webサイトです。
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
            <Flex width="20rem">
              <MenuButton
                flex="4"
                mbtype="sub"
                pbstyle="solid"
                leftIcon={<BsClockHistory />}
              >
                履歴
              </MenuButton>
              <Spacer width="1.5rem" />
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
