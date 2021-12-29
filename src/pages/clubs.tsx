import { Box, Flex, HStack, VStack, BoxProps, Select, Image, Text, Center } from "@chakra-ui/react"
import React from "react"
import { TitleArea } from "../components/global/TitleArea"

const FilterArea: React.VFC<BoxProps> = (props) => {
  return (
    <Flex flex="1" height="100%" backgroundColor="form.background" {...props}>
      this is filter area
    </Flex>
  )
}

const ClubCard: React.VFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <Flex
      width="24rem"
      height="7rem"
      boxShadow="md"
      backgroundColor="#fff"
      borderRadius="3px"
    >
      <HStack alignSelf="center">
        <Image src="https://placehold.jp/400x400.png" height="4rem" ml="1.5rem" />
        <VStack>
          <HStack>
            
          </HStack>
          <Text>
            {props.children}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  )
}

const AnimatedClubs: React.VFC<{}> = () => {
  return (
    <VStack flex="1" alignItems="start" backgroundColor="background.main" spacing="1rem">
      {/* TODO: ここはHeaderに含めたい */}
      <TitleArea>サークル一覧</TitleArea>
      <HStack width="100%" height="100%" spacing="0">
        <FilterArea flex="2" />
        <Box
          py="2rem"
          px="3rem"
          flex="8"
          height="100%"
          alignItems="start"
          backgroundColor="background.cards"
        >
          <VStack alignItems="start" spacing="3rem">
            <Select 
              width="9rem"
              backgroundColor="#fff"
              color="text.main"
              borderColor="text.card.main"
              iconColor="text.card.main"
            >
              <option value="name-asc">名前順</option>
              <option value="opt-01">Option 01</option>
              <option value="opt-02">Option 02</option>
              <option value="opt-03">Option 03</option>
            </Select>
            <ClubCard>
              this is club card
            </ClubCard>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
