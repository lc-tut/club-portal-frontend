import type { AxiosError } from "axios"
import useSWRImmutable from "swr/immutable"
import type { APIResponse } from "../types/api"
import { axiosFetcher } from "../utils/axios"

export const useAPI = <R extends APIResponse>(endpoint: string) => {
  const { data, error } = useSWRImmutable<R, AxiosError | Error>(
    endpoint,
    axiosFetcher
  )

  return {
    data: data,
    isLoading: !error && data === undefined,
    isError: error,
  }
}
