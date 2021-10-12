import { AnimatePresence } from "framer-motion"
import { Route, Switch, BrowserRouter, useLocation } from "react-router-dom"
import { useSession } from "./hooks/useSession"
import * as page from "./pages"
import { Loading } from "./components/global/LoadingPage"
import { Header } from "./components/global/Header"
import { Footer } from "./components/global/Footer"
import axios from "axios"
import { ErrorPage } from "./pages/error"
import { Container, Flex } from "@chakra-ui/react"

const AnimatedRouter: React.VFC<{}> = () => {
  const location = useLocation()
  const { isLoading, isError } = useSession()

  if (isError) {
    if (axios.isAxiosError(isError)) {
      return <ErrorPage />
    }
  }

  if (isLoading) {
    return (
      <AnimatePresence>
        <Loading />
      </AnimatePresence>
    )
  }

  return (
    <Flex direction="column">
      <Header />
      <Container minW="100%" p="0" flex="1">
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={page.Top}></Route>
            <Route path="/clubs/:slug"></Route>
            <Route path="/users/:uuid"></Route>
            <Route path="*" component={page.NotFound}></Route>
          </Switch>
        </AnimatePresence>
      </Container>
      <Footer />
    </Flex>
  )
}

export const PortalRouter: React.VFC<{}> = () => {
  return (
    <BrowserRouter>
      <AnimatedRouter />
    </BrowserRouter>
  )
}
