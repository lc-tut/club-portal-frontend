import type { AxiosError } from "axios"
import { useEffect } from "react"
import useSWR from "swr"

import { useSetLoadingStateContext } from "../contexts/loading"
import type { Session } from "../types/api"

export function useSession() {
  const { setIsLoading } = useSetLoadingStateContext()
  const { data, error, isLoading, mutate } = useSWR<
    Session,
    Error | AxiosError
  >("/api/auth")

  useEffect(() => {
    if (isLoading) {
      setIsLoading(true)
    }
  })

  return {
    session: data as Session,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  }
}
