import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"

const client = applyCaseMiddleware(axios.create())

const axiosFetcher = async <T = AxiosRequestConfig | undefined>(
  url: string,
  args: T
) => {
  const axiosConfig: AxiosRequestConfig = args ? args : { url: url }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await client.request<any>(axiosConfig)
  return data
}

export { axiosFetcher }
