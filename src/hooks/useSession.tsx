import useSWR from "swr"
import type { Session } from "../types/session"
import { axiosFetcher } from "../utils/axios"

export const useSession = () => {
  const { data, error } = useSWR<Session>("/api/auth", axiosFetcher)

  return {
    session: data as Session,
    isLoading: !error && data === undefined,
    isError: error,
  }
}
