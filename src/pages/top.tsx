import { Button, Center, Flex, Grid, GridItem, Heading, VStack } from "@chakra-ui/react"
import React from "react"
import { PortalLogo } from "../components/common/Logo";
import { PortalButton } from "../components/common/Button";
import { Search } from "react-bootstrap-icons";

const AnimatedTop: React.VFC<{}> = () => {
  return (
    <Flex flex="1" bgGradient="radial(#ffffff, green.100)">
      <VStack flex="1">
        <Heading
          pt="80px"
          fontFamily="futura-pt-bold" fontSize="70px"
          color="green.900"
          textAlign="justify">
          TUT Club Portal
        </Heading>

        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(2, 1fr)"
        >
          {/* ----- left content ----- */}
          <GridItem rowSpan={3}>
            <Grid
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(1, 1fr)"
            >
              <GridItem rowSpan={2}>
                <Center>
                  <PortalLogo h="181px" w="auto"/>
                </Center>
              </GridItem>
              <GridItem rowSpan={1}>
                <Flex
                  w="360px" p="0" m="0"
                  fontSize="16px/18"
                  color="text.main"
                  textAlign="center">
                  TUT Club Portalは東京工科大学のサークル情報を掲載する大学公認Webサイトです。
                </Flex>
              </GridItem>
            </Grid>
          </GridItem>
          {/* ----- right content ----- */}
          <GridItem>
            <PortalButton>サークルを探す</PortalButton>
          </GridItem>
          <GridItem>
            <PortalButton>お知らせ</PortalButton>
          </GridItem>
          <GridItem>
            <Flex>
              <Button>履歴</Button>
              <Button>お気に入り</Button>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  );
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
