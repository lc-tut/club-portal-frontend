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
            <Route path="/" element={<page.Top />} />
            <Route path="/clubs/:slug" />
            <Route path="/users/:uuid" />

            <Route path="/edit" element={<page.Editors />} />
            <Route path="/edit/:page" element={<page.EditorRouter />} />
            <Route
              path="/edit/description"
              element={<page.DescriptionEditors />}
            />
            <Route
              path="/edit/description/:page"
              element={<page.DescriptionEditorRouter />}
            />

            <Route path="/clubs" element={<page.Clubs />} />
            <Route path="*" element={<page.NotFound />} />
            <Route
              path="/club-description-test"
              element={<page.ClubDescription />}
            />

            {/* TODO: エラーページ確認用なので後で消すこと */}
            <Route path="/error" element={<ErrorPage />} />
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
