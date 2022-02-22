import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Select,
  Spinner,
  Stack,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { ClubTypeBadge } from "../components/common/ClubTypeBadge"
import { TitleArea } from "../components/global/Header/TitleArea"
import { useAPI } from "../hooks/useAPI"
import type { BadgeActivity, BadgeCampus } from "../types/badge"
import type { ClubPageExternal } from "../types/api"
import { ACTIVITY, CAMPUS } from "../utils/consts"
import { Link } from "react-router-dom"

type ClubCardProps = {
  thumbnail: string
  name: string
  brief: string
  campus: BadgeCampus
  activity: BadgeActivity
}

const FilterArea: React.VFC<BoxProps> = (props) => {
  const FilterCategory = (props: { text: string }) => {
    return (
      <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
        {props.text}
      </Text>
    )
  }

  const FilterItem = (props: { label: string; id: string }) => {
    return (
      <FormControl display="flex" pl="1rem">
        <FormLabel width="8rem" fontSize="1.25rem" mb="0">
          {props.label}
        </FormLabel>
        <Switch colorScheme="green" id={props.id} size="lg" />
      </FormControl>
    )
  }

  return (
    <VStack
      width="20rem"
      height="100%"
      py="2rem"
      backgroundColor="form.background"
      {...props}
    >
      <Input
        width="18rem"
        backgroundColor="#fff"
        borderColor="form.frame"
        placeholder="検索キーワード"
        _placeholder={{
          color: "text.sub",
        }}
      />

      <Stack alignSelf="start" spacing="0.5rem" pt="1rem" pl="3rem">
        <FilterCategory text="キャンパス" />
        <FilterItem label="八王子" id="filter-campus-hachioji" />
        <FilterItem label="蒲田" id="filter-campus-kamata" />
        <FilterCategory text="分類" />
        <FilterItem label="文化系" id="filter-activity-culture" />
        <FilterItem label="体育系" id="filter-activity-sports" />
        <FilterItem label="実行委員会" id="filter-activity-committee" />
      </Stack>
    </VStack>
  )
}

const ClubCard: React.VFC<ClubCardProps> = (props) => {
  return (
    <Flex
      height="7rem"
      boxShadow="md"
      backgroundColor="#fff"
      borderRadius="3px"
    >
      <HStack spacing="1rem">
        <Image src={props.thumbnail} height="4rem" ml="1.5rem" />
        <VStack alignSelf="start" pt="1rem" alignItems="start" spacing="0">
          <HStack spacing="10px">
            <ClubTypeBadge content="hachioji" />
            <ClubTypeBadge content="culture" />
          </HStack>
          <Text fontSize="1.2rem" color="text.card.main" pt="0.5rem">
            {props.name}
          </Text>
          <Text fontSize="0.8rem" color="text.card.sub" pt="0.2rem">
            {props.brief}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  )
}

const AnimatedClubs: React.VFC<{}> = () => {
  const { data, isLoading, isError } =
    useAPI<Array<ClubPageExternal>>("/api/v1/clubs")
  const toast = useToast()

  const getCampus = (num: number): BadgeCampus => CAMPUS[num]
  const getActivity = (num: number): BadgeActivity =>
    ACTIVITY[num]

  return (
    <VStack
      flex="1"
      alignItems="start"
      backgroundColor="background.main"
      spacing="1rem"
    >
      {isError ? (
        toast({
          title: "Error!",
          description: "データ取得中にエラーが発生しました！",
          status: "error",
          isClosable: true,
          duration: 6000,
          position: "top-right",
        })
      ) : (
        <></>
      )}
      {/* TODO: TitleAreaはHeaderに含めたい */}
      <TitleArea>サークル一覧</TitleArea>
      <HStack width="100%" height="100%" spacing="0">
        <FilterArea />
        <Box
          py="2rem"
          px="3rem"
          flex="1"
          height="100%"
          alignItems="start"
          backgroundColor="background.cards"
        >
          <Stack spacing="3rem">
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
            {!isLoading ? (
              <Grid
                templateColumns="repeat(12, 1fr)"
                rowGap="1rem"
                columnGap="2rem"
              >
                {data?.map((club, i) => (
                  <GridItem colSpan={{ xl: 4, lg: 6, sm: 12 }} key={i}>
                    <Link to={club.clubSlug}>
                      <ClubCard
                        name={club.name}
                        brief={club.shortDescription}
                        campus={getCampus(club.campus)}
                        activity={getActivity(club.clubType)}
                        thumbnail={club.thumbnail.path}
                      />
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Spinner />
            )}
          </Stack>
        </Box>
      </HStack>
    </VStack>
  )
}

export const Clubs: React.VFC<{}> = () => {
  return <AnimatedClubs />
}
