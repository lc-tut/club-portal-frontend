import { PortalRouter } from "./router"
import { ChakraProvider } from "@chakra-ui/react"
import { PortalTheme } from "./components/global/Theme"
import { useState } from "react"
import { LoadingStateContext, SetLoadingStateContext } from "./contexts/loading"
import type { ErrorType } from "./types/utils"

const App: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<ErrorType>(undefined)

  return (
    <ChakraProvider theme={PortalTheme}>
      <LoadingStateContext.Provider
        value={{ isLoading: isLoading, isError: isError }}
      >
        <SetLoadingStateContext.Provider
          value={{ setIsLoading: setIsLoading, setIsError: setIsError }}
        >
          <PortalRouter />
        </SetLoadingStateContext.Provider>
      </LoadingStateContext.Provider>
    </ChakraProvider>
  )
}

export { App }
