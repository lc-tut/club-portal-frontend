import { ChakraProvider } from "@chakra-ui/react"
import { useState } from "react"
import { SWRConfig } from "swr"

import { LoadingOverlay } from "./components/global/LoadingPage"
import { PortalTheme } from "./components/global/Theme"
import { LoadingStateContext, SetLoadingStateContext } from "./contexts/loading"
import { PortalRouter } from "./router"
import type { ErrorType } from "./types/utils"
import { axiosFetcher } from "./utils/axios"

const App: React.FC<{}> = () => {
  const [isLoadingOuter, setIsLoadingOuter] = useState<boolean>(false)
  const [isLoadingInner, setIsLoadingInner] = useState<boolean>(false)
  const [error, setError] = useState<ErrorType>(undefined)

  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher,
        onSuccess: () => {
          setIsLoadingOuter(false)
          setIsLoadingInner(false)
        },
        onError: (err: ErrorType) => {
          setError(err)
          setIsLoadingOuter(false)
          setIsLoadingInner(false)
        },
      }}
    >
      <ChakraProvider theme={PortalTheme}>
        <SetLoadingStateContext.Provider
          value={{
            setIsLoadingOuter: setIsLoadingOuter,
            setIsLoadingInner: setIsLoadingInner,
            setError: setError,
          }}
        >
          <LoadingStateContext.Provider
            value={{
              isLoadingOuter: isLoadingOuter,
              isLoadingInner: isLoadingInner,
              error: error,
            }}
          >
            <PortalRouter />
            <LoadingOverlay />
          </LoadingStateContext.Provider>
        </SetLoadingStateContext.Provider>
      </ChakraProvider>
    </SWRConfig>
  )
}

export { App }
