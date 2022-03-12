import type { AxiosError } from "axios"
import useSWRImmutable from "swr/immutable"
import type { Session } from "../types/api"
import { axiosFetcher } from "../utils/axios"

export const useSession = () => {
  const { data, error } = useSWRImmutable<Session, Error | AxiosError>(
    "/api/auth",
    axiosFetcher
  )

  return {
    session: data as Session,
    isLoading: !error && data === undefined,
    isError: error,
  }
}
