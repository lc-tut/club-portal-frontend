import type { AxiosError } from "axios"
import useSWR from "swr"
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

  return {
    data: data,
    isLoading: !error && data === undefined,
    isError: error,
    mutate: mutate,
  }
}
