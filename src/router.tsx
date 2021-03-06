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
import { UserRouteElement } from "./components/global/Route/UserRoute"
import { ClubRouteElement } from "./components/global/Route/ClubRoute"
import { DomainUserRouteElement } from "./components/global/Route/DomainUserRoute"

const AnimatedRouter: React.VFC<{}> = () => {
  const location = useLocation()
  const { session, isLoading, isError } = useSession()

  if (isError) {
    if (axios.isAxiosError(isError)) {
      return <ErrorPage />
    }
  }

  if (isLoading) {
    return (
      <AnimatePresence>
        <Loading fullScreen />
      </AnimatePresence>
    )
  }

  return (
    <Flex direction="column" minH="100vh">
      <Header session={session} />
      <Flex p="0" flex="1">
        <AnimatePresence exitBeforeEnter initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<page.Top />} />
            <Route path="clubs">
              <Route index element={<page.Clubs />} />
              <Route
                path=":slug"
                element={
                  <page.ClubPage
                    userUUID={
                      session?.role === "domain" ? session.userUuid : undefined
                    }
                  />
                }
              />
            </Route>
            <Route path="users" element={<UserRouteElement />}>
              <Route path="club" element={<ClubRouteElement />}>
                <Route path="edit">
                  <Route index element={<page.EditorList />} />
                  <Route
                    path="description"
                    element={<page.DescriptionEditor />}
                  />
                  <Route path="detail" element={<page.DetailEditor />} />
                  <Route path="image" element={<page.ImageEditor />} />
                  <Route path="link" element={<page.LinkEditor />} />
                  <Route path="schedule" element={<page.ScheduleEditor />} />
                  <Route path="video" element={<page.VideoEditor />} />
                  <Route path="icon" element={<page.IconEditor />} />
                </Route>
              </Route>
              <Route path="favs" element={<DomainUserRouteElement />}>
                <Route index element={<page.Favorites />} />
              </Route>
              <Route path="edit" />
              <Route path=":uuid" />
            </Route>
            <Route path="*" element={<page.NotFound />} />
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
