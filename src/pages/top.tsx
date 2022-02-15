import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  VStack,
  Center,
  Button,
} from "@chakra-ui/react"
import React from "react"
import { PortalLogo } from "../components/common/Icon"
import { MenuButton } from "../components/common/Button"
import { BsSearch, BsMegaphone, BsClockHistory, BsStar, BsTwitter } from "react-icons/bs"
import { Link } from "react-router-dom"
import axios from "axios"

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
        <PostTest />
        <Link to="/club-description-test">
          {" "}
          サークル紹介ページのテスト Link{" "}
        </Link>
      </VStack>
    </Flex>
  )
}

const PostTest: React.VFC<{}> = () => {
  const postClub = () => {
    const data = {
      name: "test",
      description: "これはtestのdescriptionです",
      short_description: "this is test",
      campus: 1,
      club_type: 1,
      contents: [
        {
          content: "テストを行う"
        },
        {
          content: "めっちゃテストを行う"
        }
      ],
      links: [
        {
          label: "twitter",
          url: "https://twitter.com/Caffeine0coffee"
        }
      ],
      schedules: [
        {
          month: 5,
          schedule: "５月のスケジュール"
        }
      ],
      achievements: [{}],
      images: [{}],
      videos: [{}],
      activity_details: [{}]
    }
    axios.post("/api/v1/clubs", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const postUser = () => {
    const data = {
      email: "c0119304bd@edu.teu.ac.jp",
      name: "caffeine TUT"
    }
    axios.post("/api/v1/users", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Button onClick={postClub}>
        new club POST
      </Button>
      <Button onClick={postUser}>
        new user POST
      </Button>
    </>
  )
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
