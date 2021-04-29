import { PortalRouter } from "./router"
import { ChakraProvider } from "@chakra-ui/react"

const App: React.VFC<{}> = () => {
  return (
    <ChakraProvider>
      <PortalRouter />
    </ChakraProvider>
  )
}

export { App }
