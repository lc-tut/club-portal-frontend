import applyCaseMiddleware from "axios-case-converter"
import axios, { AxiosResponse } from "axios"
import type { AxiosRequestConfig } from "axios"
import type { APIPayload, APIResponse } from "../types/api"

const client = applyCaseMiddleware(axios.create())

const axiosFetcher = async <T = AxiosRequestConfig, R = APIResponse>(
  url: string,
  args?: T
) => {
  const axiosConfig: AxiosRequestConfig = args ?? { url: url }
  const { data } = await client.request<R>(axiosConfig)
  return data
}

const axiosWithPayload = async <
  D extends APIPayload,
  T extends AxiosRequestConfig<D>,
  R extends APIResponse
>(
  config: T
) => {
  const res = await client.request<R, AxiosResponse<R, D>, D>(config)
  return res
}

export { axiosFetcher }
