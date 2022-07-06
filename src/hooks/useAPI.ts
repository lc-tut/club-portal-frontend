import type { AxiosError } from "axios"
import { useEffect } from "react"
import useSWR from "swr"
import { useSetLoadingStateContext } from "../contexts/loading"
import type { APIResponse } from "../types/api"
import { axiosFetcher } from "../utils/axios"

type EndpointArg<T> = T extends null ? null : string

export const useAPI = <R extends APIResponse | null>(
  endpoint: EndpointArg<R> | (() => EndpointArg<R>),
  isImmutable?: boolean
) => {
  const { data, error, mutate } = useSWR<R, AxiosError | Error>(
    endpoint,
    axiosFetcher,
    isImmutable
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
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
    data: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
