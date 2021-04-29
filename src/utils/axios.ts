import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"

const client = applyCaseMiddleware(axios.create())

const axiosFetcher = async <T = AxiosRequestConfig | undefined>(
  url: string,
  args: T
) => {
  const axiosConfig: AxiosRequestConfig = args ? args : { url: url }
  const { data } = await client.request(axiosConfig)
  return data
}

export { axiosFetcher }
