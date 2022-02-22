import { AnimatePresence } from "framer-motion"
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom"
import { useSession } from "./hooks/useSession"
import * as page from "./pages"
import { Loading } from "./components/global/LoadingPage"
import { Header } from "./components/global/Header/Header"
import { Footer } from "./components/global/Footer"
import axios from "axios"
import { ErrorPage } from "./pages/error"
import { Flex } from "@chakra-ui/react"

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
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex p="0" flex="1">
        <AnimatePresence exitBeforeEnter initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<page.Top />} />
            <Route path="clubs">
              <Route index element={<page.Clubs />} />
              <Route path=":slug" />
            </Route>
            <Route path="users">
              <Route path="edit">
                <Route index element={<page.Editors />} />
                <Route path="description">
                  <Route index element={<page.DescriptionEditors />} />
                  <Route
                    path=":page"
                    element={<page.DescriptionEditorRouter />}
                  />
                </Route>
                <Route path=":page" element={<page.EditorRouter />} />
              </Route>
              <Route path=":uuid" />
            </Route>
            <Route path="*" element={<page.NotFound />} />
            <Route
              path="club-description-test"
              element={<page.ClubDescription />}
            />
          </Routes>
        </AnimatePresence>
      </Flex>
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
