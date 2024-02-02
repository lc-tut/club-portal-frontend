import type { AxiosError } from "axios"
import { useEffect } from "react"
import useSWR from "swr"

import { useSetLoadingStateContext } from "../contexts/loading"
import type { Session } from "../types/api"

export function useSession() {
  const { setIsLoadingInner } = useSetLoadingStateContext()
  const { data, error, isLoading, mutate } = useSWR<
    Session,
    Error | AxiosError
  >("/api/auth")

  useEffect(() => {
    if (isLoading) {
      setIsLoadingInner(true)
    }
  }, [isLoading, setIsLoadingInner])

  return {
    session: data,
    isLoading: isLoading,
    error: error,
    mutate: mutate,
  }
}
