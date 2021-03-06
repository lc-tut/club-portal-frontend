import { PortalRouter } from "./router"
import { ChakraProvider } from "@chakra-ui/react"
import { PortalTheme } from "./components/global/Theme"

const App: React.VFC<{}> = () => {
  return (
    <ChakraProvider theme={PortalTheme}>
      <PortalRouter />
    </ChakraProvider>
  )
}

export { App }
