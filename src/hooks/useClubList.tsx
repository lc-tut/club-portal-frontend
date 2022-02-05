import { AxiosError } from "axios"
import useSWR from "swr"
import { ClubExternal } from "../types/club"
import { axiosFetcher } from "../utils/axios"

export const useClubList = () => {
  const { data, error } = useSWR<ClubExternal[], Error | AxiosError>(
    "/api/v1/clubs",
    axiosFetcher
  )

  return {
    clubList: data as ClubExternal[],
    isLoading: !error && data === undefined,
    isError: error,
  }
}