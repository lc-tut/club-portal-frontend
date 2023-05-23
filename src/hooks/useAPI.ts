import type { AxiosError } from "axios"
import { useEffect } from "react"
import useSWR from "swr"

import { useSetLoadingStateContext } from "../contexts/loading"
import type { APIResponse } from "../types/api"

type EndpointArg<T> = T extends null ? null : string

export function useAPI<R extends APIResponse | null>(
  endpoint: EndpointArg<R> | (() => EndpointArg<R>),
  isImmutable?: boolean,
  isNotUpdateLoadingState?: boolean
) {
  const { setIsLoading } = useSetLoadingStateContext()
  const { data, error, isLoading, mutate } = useSWR<
    R | undefined,
    AxiosError | Error
  >(
    endpoint,
    isImmutable
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
  )

  // XXX: Add dependency and testing.
  useEffect(() => {
    if (isLoading && !isNotUpdateLoadingState) {
      setIsLoading(true)
    }
  })

  return {
    data: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  }
}
