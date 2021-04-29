import { AnimatePresence, motion } from "framer-motion"
import { Route, Switch, BrowserRouter, useLocation } from "react-router-dom"
import { useSession } from "./hooks/useSession"
import * as page from "./pages"
import { Loading } from "./components/global/LoadingPage"

const AnimatedRouter: React.VFC<{}> = () => {
  const location = useLocation()
  const { isLoading, isError } = useSession()

  if (isError) {
    return <motion.div>Error!</motion.div>
  }

  if (isLoading) {
    return (
      <AnimatePresence>
        <Loading />
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={page.Top}></Route>
        <Route path="/clubs/:slug"></Route>
        <Route path="/users/:uuid"></Route>
        <Route path="*" component={page.NotFound}></Route>
      </Switch>
    </AnimatePresence>
  )
}

export const PortalRouter: React.VFC<{}> = () => {
  return (
    <BrowserRouter>
      <AnimatedRouter />
    </BrowserRouter>
  )
}
