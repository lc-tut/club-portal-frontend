import type { AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"
import applyCaseMiddleware from "axios-case-converter"

import type { APIPayload, APIResponse, Session } from "../types/api"

const client = applyCaseMiddleware(axios.create())

async function axiosFetcher<
  R extends APIResponse | Session | unknown = APIResponse,
  T extends AxiosRequestConfig = AxiosRequestConfig
>(url: string, args?: T) {
  const axiosConfig: AxiosRequestConfig = { url: url, ...args }
  const { data } = await client.request<R>(axiosConfig)
  return data
}

async function axiosWithPayload<
  D extends APIPayload | FormData,
  R extends APIResponse | unknown,
  T extends AxiosRequestConfig<D> = AxiosRequestConfig<D>
>(config: T) {
  const res = await client.request<R, AxiosResponse<R, D>, D>(config)
  return res
}

export { axiosFetcher, axiosWithPayload }
