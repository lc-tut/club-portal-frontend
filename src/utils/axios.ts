import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import { Session } from "../types/session"

const client = applyCaseMiddleware(axios.create())

const axiosFetcher = async <T = AxiosRequestConfig | undefined>(
  url: string,
  args: T
) => {
  const axiosConfig: AxiosRequestConfig = args ? args : { url: url }
  const { data } = await client.request<Session>(axiosConfig)
  return data
}

export { axiosFetcher }
