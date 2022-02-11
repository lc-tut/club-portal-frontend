import type { AxiosError, AxiosRequestConfig } from "axios"
import useSWR from "swr"
import type { APIPayload, APIResponse } from "../types/api"
import { axiosFetcher } from "../utils/axios"

export const useAPI = <
  R extends APIResponse | {},
  D = unknown extends APIPayload ? APIPayload : undefined
>(
  endpoint: string,
  method: "get" | "post" | "put" | "patch" | "delete",
  payload?: D
) => {
  const axiosConfig: AxiosRequestConfig<D> = {
    url: endpoint,
    method: method,
    data: payload,
  }
  const { data, error } = useSWR<R, AxiosError<{}, D> | Error>(
    [endpoint, axiosConfig],
    axiosFetcher
  )

  return {
    data: data,
    isLoading: !error && data === undefined,
    isError: error,
  }
}
