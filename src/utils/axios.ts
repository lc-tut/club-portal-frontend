import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"
import type { APIPayload, APIResponse, Session } from "../types/api"

const client = applyCaseMiddleware(axios.create())

const axiosFetcher = async <
  R extends APIResponse | Session | unknown = APIResponse,
  T = AxiosRequestConfig
>(
  url: string,
  args?: T
) => {
  const axiosConfig: AxiosRequestConfig = { url: url, ...args }
  const { data } = await client.request<R>(axiosConfig)
  return data
}

const axiosWithPayload = async <
  D extends APIPayload | FormData,
  R extends APIResponse | unknown,
  T = AxiosRequestConfig<D>
>(
  config: T
) => {
  const res = await client.request<R, AxiosResponse<R, D>, D>(config)
  return res
}

export { axiosFetcher, axiosWithPayload }
