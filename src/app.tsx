import { PortalRouter } from "./router"
import { ChakraProvider } from "@chakra-ui/react"
import { PortalTheme } from "./components/global/Theme"
import { useState } from "react"
import { LoadingStateContext, SetLoadingStateContext } from "./contexts/loading"
import type { ErrorType } from "./types/utils"
import { axiosFetcher } from "./utils/axios"
import { SWRConfig } from "swr"

const App: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorType>(undefined)

  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher,
        onSuccess: () => {
          setIsLoading(false)
        },
        onError: (err: ErrorType) => {
          setError(err)
          setIsLoading(false)
        },
      }}
    >
      <ChakraProvider theme={PortalTheme}>
        <SetLoadingStateContext.Provider
          value={{ setIsLoading: setIsLoading, setError: setError }}
        >
          <LoadingStateContext.Provider
            value={{ isLoading: isLoading, error: error }}
          >
            <PortalRouter />
          </LoadingStateContext.Provider>
        </SetLoadingStateContext.Provider>
      </ChakraProvider>
    </SWRConfig>
  )
}

export { App }
