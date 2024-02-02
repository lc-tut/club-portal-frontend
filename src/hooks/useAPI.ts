import type { AxiosError } from "axios"
import { useEffect } from "react"
import useSWR from "swr"

import { useSetLoadingStateContext } from "../contexts/loading"
import type { APIResponse } from "../types/api"

type EndpointArg<T> = T extends null ? null : string

export function useAPI<R extends APIResponse | null, S = R>(
  endpoint: EndpointArg<R> | (() => EndpointArg<R>),
  isImmutable?: boolean,
  isInner?: boolean
) {
  const { setIsLoadingOuter, setIsLoadingInner } = useSetLoadingStateContext()
  const { data, error, isLoading, mutate } = useSWR<
    S | undefined,
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

  useEffect(() => {
    if (isLoading) {
      if (isInner) {
        setIsLoadingInner(true)
      } else {
        setIsLoadingOuter(true)
      }
    }
  }, [isInner, isLoading, setIsLoadingInner, setIsLoadingOuter])

  return {
    data: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  }
}
