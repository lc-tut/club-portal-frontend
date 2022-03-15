import { Flex, Grid, HStack, Icon, VStack } from "@chakra-ui/react"
import { AxiosRequestConfig } from "axios"
import { BsClock } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { FavoriteButton } from "../components/common/Button"
import {
  IntroductionVideo,
  CarouselGallery,
  DescriptionText,
  DetailInformation,
  AnnualPlan,
} from "../components/common/ClubDescription"
import { ClubTypeBadge } from "../components/common/Clubs/ClubTypeBadge"
import { TitleArea } from "../components/global/Header/TitleArea"
import { Loading } from "../components/global/LoadingPage"
import { useAPI } from "../hooks/useAPI"
import { useErrorToast } from "../hooks/useErrorToast"
import type {
  ClubPageInternal,
  FavoriteClubStatus,
  RegisterFavoriteClubPayload,
} from "../types/api"
import { axiosWithPayload } from "../utils/axios"
import { ACTIVITY, CAMPUS } from "../utils/consts"
import { ErrorPage } from "./error"

type ClubPageProps = {
  userUUID?: string
}

// TODO: アニメーションをつける
export const ClubPage: React.VFC<ClubPageProps> = (props) => {
  const clubSlug = useLocation()
  console.log(clubSlug)
  const { data, isLoading, isError } = useAPI<ClubPageInternal | null>(
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

  if (isLoading) return <Loading fullScreen />

  if (isError || favs.isError)
    return (
      // TODO: 存在しない clubSlug に対しては NotFound ページを出す
      <ErrorPage />
    )

  const schedule: { [key in number]: string } = {}

  data?.schedules.map((sch) => {
    schedule[sch.month] = sch.schedule
  })

  const onClick = async () => {
    try {
      const requestConfig: AxiosRequestConfig<RegisterFavoriteClubPayload> = {
        url: favs.data?.status
          ? `/api/v1/users/${props.userUUID!}/unfav`
          : `/api/v1/users/${props.userUUID!}/favs`,
        method: "post",
        data: { clubUuid: data!.clubUuid },
      }
      await favs.mutate({ status: !favs.data?.status })
      await axiosWithPayload<RegisterFavoriteClubPayload, unknown>(
        requestConfig
      )
      await favs.mutate()
    } catch (e) {
      toast()
      console.error(e)
    }
  }

  return (
    <VStack flex="1">
      <TitleArea subtitle={data?.shortDescription}>{data?.name}</TitleArea>
      <HStack spacing="2rem" pb="3rem">
        <Flex gap="10px" width="12rem" justifyContent="end">
          <ClubTypeBadge content={CAMPUS[data?.campus ?? 0]} badgetype="page" />
          <ClubTypeBadge
            content={ACTIVITY[data?.clubType ?? 0]}
            badgetype="page"
          />
        </Flex>
        <Flex color="text.sub" alignItems="center">
          <Icon as={BsClock} mr="5px" />
          最終更新: {data?.updatedAt}
        </Flex>
        <FavoriteButton
          isDisabled={props.userUUID === undefined || favs.isError}
          isRegistered={favs.data?.status}
          isLoading={props.userUUID ? favs.isLoading : false}
          onClick={onClick}
        />
      </HStack>
      <Grid
        templateColumns="repeat(12, 1fr)"
        width={{ base: "80%", xl: "60%", lg: "80%" }}
        columnGap="1rem"
        rowGap="3rem"
        pb="6rem"
        alignItems="center"
      >
        <IntroductionVideo videoPath={data?.videos[0]?.path} />
        <CarouselGallery imagePaths={data?.images.map((im) => im.path) ?? []} />
        <DescriptionText
          links={data?.links
            .filter((link) => link.label !== "HP" && link.label !== "Email")
            .map((link) => ({ label: link.label, path: link.url }))}
          content={data?.description ?? ""}
        />
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
      </Grid>
    </VStack>
  )
}
