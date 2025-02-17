import { Flex } from "@chakra-ui/react"
import { isAxiosError } from "axios"
import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import { Footer } from "./components/global/Footer"
import { Header } from "./components/global/Header/Header"
import { AdminRouteElement } from "./components/global/Route/AdminRoute"
import { ClubRouteElement } from "./components/global/Route/ClubRoute"
import { DomainUserRouteElement } from "./components/global/Route/DomainUserRoute"
import { UserRouteElement } from "./components/global/Route/UserRoute"
import {
  useLoadingStateContext,
  useSetLoadingStateContext,
} from "./contexts/loading"
import { useSession } from "./hooks/useSession"
import * as page from "./pages"

// TODO: 存在しない clubSlug には NotFound を出す
const AnimatedRouter: React.FC<{}> = () => {
  const location = useLocation()
  const { session } = useSession()
  const { error } = useLoadingStateContext()
  const { setError } = useSetLoadingStateContext()

  useEffect(() => {
    window.scrollTo(0, 0) // ページ遷移時にスクロールをトップに戻す
    setError(undefined)
  }, [location, setError])

  if (error) {
    if (isAxiosError(error)) {
      return (
        <AnimatePresence mode="wait" initial={false}>
          {error.response?.status === 401 ? (
            <page.UnauthorizedPage />
          ) : (
            <page.ErrorPage />
          )}
        </AnimatePresence>
      )
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
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
              <Route path="description" element={<page.DescriptionEditor />} />
              <Route path="detail" element={<page.DetailEditor />} />
              <Route path="image" element={<page.ImageEditor />} />
              <Route path="link" element={<page.LinkEditor />} />
              <Route path="schedule" element={<page.ScheduleEditor />} />
              <Route path="video" element={<page.VideoEditor />} />
              <Route path="icon" element={<page.IconEditor />} />
              <Route path="name" element={<page.NameEditor />} />
            </Route>
          </Route>
          <Route path="favs" element={<DomainUserRouteElement />}>
            <Route index element={<page.Favorites />} />
          </Route>
          <Route path="edit" />
          <Route path=":uuid" />
        </Route>

        <Route path="admin" element={<AdminRouteElement />}>
          <Route index element={<page.AdminMenuList />} />
          <Route
            path="add-circle-account"
            element={<page.CreateNewUserAccount />}
          />
          <Route path="users">
            <Route index element={<page.UserLists />} />
            <Route path="edit">
              <Route path=":uuid" element={<page.EditGeneralUser />} />
            </Route>
          </Route>
          {/* <Route path="users" element={<page.AdminUsers />} /> */}
        </Route>

        <Route path="*" element={<page.NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export const PortalRouter: React.FC<{}> = () => {
  const { session } = useSession()

  return (
    <BrowserRouter>
      <Flex direction="column" minH="100vh">
        <Header session={session} />
        <Flex p="0" flex="1">
          <AnimatedRouter />
        </Flex>
        <Footer />
      </Flex>
    </BrowserRouter>
  )
}
