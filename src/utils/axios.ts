import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import type { APIResponse } from "../types/api"

const client = applyCaseMiddleware(axios.create())

const axiosFetcher = async <T = AxiosRequestConfig, R = APIResponse>(
  url: string,
  args?: T
) => {
  const axiosConfig: AxiosRequestConfig = args ?? { url: url }
  const { data } = await client.request<R>(axiosConfig)
  return data
}

export { axiosFetcher }
