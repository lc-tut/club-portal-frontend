import type { AxiosError } from "axios"
import useSWR from "swr"
import type { Session } from "../types/api"
import { axiosFetcher } from "../utils/axios"

export const useSession = () => {
  const { data, error } = useSWR<Session, Error | AxiosError>(
    "/api/auth",
    axiosFetcher
  )

  return {
    session: data as Session,
    isLoading: !error && data === undefined,
    isError: error,
  }
}
