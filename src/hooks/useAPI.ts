import type { AxiosError, AxiosRequestConfig } from "axios"
import useSWR from "swr"
import type { APIResponse } from "../types/api"
import { axiosFetcher } from "../utils/axios"

export const useAPI = <R extends APIResponse | {}>(endpoint: string) => {
  const axiosConfig: AxiosRequestConfig = {
    url: endpoint,
  }
  const { data, error } = useSWR<R, AxiosError | Error>(
    [endpoint, axiosConfig],
    axiosFetcher
  )

  return {
    data: data,
    isLoading: !error && data === undefined,
    isError: error,
  }
}
