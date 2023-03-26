import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Tooltip,
  VStack,
  Wrap,
  Text,
  useMediaQuery,
  Stack,
} from "@chakra-ui/react"
import type { AxiosRequestConfig } from "axios"
import { BsClock } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { FavoriteButton, PortalButton } from "../components/common/Button"
import {
  AnnualPlan,
  CarouselGallery,
  DescriptionText,
  DetailInformation,
  IntroductionVideo,
} from "../components/common/ClubDescription"
import { ClubTypeBadge } from "../components/common/Clubs/ClubTypeBadge"
import { TitleArea } from "../components/global/Header/TitleArea"
import { useAPI } from "../hooks/useAPI"
import { useErrorToast } from "../hooks/useErrorToast"
import { useSession } from "../hooks/useSession"
import type {
  ClubPageInternal,
  FavoriteClubStatus,
  RegisterFavoriteClubPayload,
} from "../types/api"
import { axiosWithPayload } from "../utils/axios"
import { ACTIVITY, CAMPUS } from "../utils/consts"

type ClubPageProps = {
  userUUID?: string
}

// TODO: アニメーションをつける
export const ClubPage: React.FC<ClubPageProps> = (props) => {
  const [isMobile, isSmallMobile] = useMediaQuery([
    "(max-width: 40em)",
    "(max-width: 28em)",
  ])

  const { session } = useSession()
  const clubSlug = useLocation()
  const { data } = useAPI<ClubPageInternal | null>(
    !clubSlug.pathname.startsWith("/clubs/")
      ? null
      : `/api/v1/clubs/slug${clubSlug.pathname.replace("/clubs", "")}`,
    true
  )
  const favs = useAPI<FavoriteClubStatus | null>(
    props.userUUID && data
      ? `/api/v1/users/${props.userUUID}/favs/${data.clubUuid}`
      : null
  )
  const toast = useErrorToast("お気に入りの設定に失敗しました。")

  const updatedTimeArr = data?.updatedAt.split("T")[0].split("-")
  const updatedTime = updatedTimeArr
    ? updatedTimeArr[0] + " " + updatedTimeArr[1] + "/" + updatedTimeArr[2]
    : undefined

  const schedule: { [key in number]: string } = {}

  if (session !== null) {
    data?.schedules.map((sch) => {
      schedule[sch.month] = sch.schedule
    })
  }

  const onClick = async () => {
    try {
      const requestConfig: AxiosRequestConfig<RegisterFavoriteClubPayload> = {
        url: favs.data?.status
          ? `/api/v1/users/${props.userUUID!}/unfav`
          : `/api/v1/users/${props.userUUID!}/favs`,
        method: "post",
        data: { clubUuid: data!.clubUuid },
      }
      await favs.mutate(
        async (data) => {
          await axiosWithPayload<RegisterFavoriteClubPayload, unknown>(
            requestConfig
          )
          return { status: !data?.status }
        },
        {
          optimisticData: (data) => ({ status: !data?.status }),
          revalidate: false,
        }
      )
    } catch (e) {
      toast()
      console.error(e)
    }
  }

  const onLogin = () => {
    window.location.href = `/api/auth/signin?redirect_url=${clubSlug.pathname}`
  }

  return (
    <VStack flex="1">
      {!isMobile && (
        <TitleArea subtitle={data?.shortDescription}>{data?.name}</TitleArea>
      )}
      <Stack
        w={isMobile ? "100%" : "38rem"}
        px={isMobile ? "2rem" : undefined}
        py="2rem"
        alignItems="center"
        justifyContent="space-between"
        direction={isSmallMobile ? "column" : "row"}
        spacing={isSmallMobile ? "1rem" : undefined}
      >
        <Stack
          direction={isMobile ? "column" : "row-reverse"}
          alignItems="center"
          spacing={isMobile ? "0.5rem" : "2rem"}
        >
          {updatedTime && (
            <Flex color="text.sub" alignItems="center">
              <Icon as={BsClock} mr="5px" />
              最終更新: {updatedTime}
            </Flex>
          )}
          <HStack>
            <ClubTypeBadge
              content={CAMPUS[data?.campus ?? 0]}
              badgetype="page"
            />
            <ClubTypeBadge
              content={ACTIVITY[data?.clubType ?? 0]}
              badgetype="page"
            />
          </HStack>
        </Stack>
        <Tooltip
          label="利用するには学生用Gmailアカウントでログインして下さい"
          isDisabled={props.userUUID !== undefined}
        >
          <Wrap>
            <FavoriteButton
              isDisabled={props.userUUID === undefined}
              isRegistered={favs.data?.status}
              isLoading={props.userUUID ? favs.isLoading : false}
              onClick={onClick}
            />
          </Wrap>
        </Tooltip>
      </Stack>

      {isMobile && (
        <Wrap py="2rem">
          <TitleArea subtitle={data?.shortDescription}>{data?.name}</TitleArea>
        </Wrap>
      )}

      <Grid
        templateColumns="repeat(12, 1fr)"
        width={{ base: "90%", sm: "80%", xl: "60%", lg: "80%" }}
        columnGap="1rem"
        rowGap="3rem"
        pb="6rem"
        pt="2rem"
        alignItems="center"
      >
        <IntroductionVideo videoPath={data?.videos[0]?.path} />
        <CarouselGallery imagePaths={data?.images.map((im) => im.path) ?? []} />
        <DescriptionText
          links={data?.links
            .filter((link) => link.label !== "HP" && link.label !== "Email")
            .map((link) => ({ label: link.label, path: link.url }))}
          content={data?.description ?? ""}
          halfWidth={session === null && !isMobile}
        />
        {session !== null ? (
          <>
            <DetailInformation
              activity={data?.contents.map((cont) => cont.content) ?? []}
              activityDetail={
                data?.activityDetails.map((tp) => ({
                  timeId: tp.timeId,
                  date: tp.date,
                  time: tp.time,
                  timeRemark: tp.timeRemark,
                  placeId: tp.placeId,
                  place: tp.place,
                  placeRemark: tp.placeRemark,
                })) ?? []
              }
              achievements={data?.achievements.map((ach) => ach.achievement)}
              mail={data?.links
                .filter((link) => link.label === "Email")
                .map((link) => link.url)}
              website={data?.links
                .filter((link) => link.label === "HP")
                .map((link) => link.url)}
              remark={data?.clubRemark}
            />
            <AnnualPlan schedules={schedule} remark={data?.scheduleRemark} />
          </>
        ) : (
          <GridItem colSpan={12}>
            <VStack>
              <Text textColor="text.main">
                大学Gmailアカウントでログインすると、全ての情報を閲覧することができます。
              </Text>
              <PortalButton onClick={onLogin}>ログイン</PortalButton>
            </VStack>
          </GridItem>
        )}
      </Grid>
    </VStack>
  )
}
