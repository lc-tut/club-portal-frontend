import { Button, Center, Container, Flex, Grid, GridItem, Heading, VStack } from "@chakra-ui/react"
import React from "react"
import { PortalLogo } from "../components/common/Logo";

const AnimatedTop: React.VFC<{}> = () => {
  return (
    <Container m="0" p="0" minW="100%" bgGradient="radial(#ffffff, green.100)">
      <VStack>
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
          {/* ----- right content ----- */}
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
                <Container
                  w="360px" p="0" m="0"
                  fontSize="16px/18"
                  color="text.main"
                  textAlign="center">
                  TUT Club Portalは東京工科大学のサークル情報を掲載する大学公認Webサイトです。
                </Container>
              </GridItem>
            </Grid>
          </GridItem>
          {/* ----- left content ----- */}
          <GridItem>
            <Button>サークルを探す</Button>
          </GridItem>
          <GridItem>
            <Button>お知らせ</Button>
          </GridItem>
          <GridItem>
            <Flex>
              <Button>履歴</Button>
              <Button>お気に入り</Button>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
