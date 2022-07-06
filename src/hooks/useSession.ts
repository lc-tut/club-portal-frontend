import type { AxiosError } from "axios"
import { useEffect } from "react"
import useSWR from "swr"
import { useSetLoadingStateContext } from "../contexts/loading"
import type { Session } from "../types/api"
import { axiosFetcher } from "../utils/axios"

export const useSession = () => {
  const { data, error } = useSWR<Session, Error | AxiosError>(
    "/api/auth",
    axiosFetcher
  )
  const setLoadingState = useSetLoadingStateContext()
  const isLoading = !error && data === undefined

  useEffect(() => {
    if (!isLoading || error) {
      setLoadingState.setIsLoading(isLoading)
      setLoadingState.setIsError(error)
    }
  })

  return {
    session: data as Session,
    isLoading: isLoading,
    isError: error,
  }
}
