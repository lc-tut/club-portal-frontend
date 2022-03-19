import axios from "axios"
import { Outlet } from "react-router-dom"
import { useAPI } from "../../../hooks/useAPI"
import { NotFound } from "../../../pages"
import { ErrorPage } from "../../../pages/error"
import type { UserInfo } from "../../../types/api"
import { Loading } from "../LoadingPage"

// TODO: return Unauthorized instead of NotFound
export const UserRouteElement: React.VFC<{}> = () => {
  const { data, isLoading, isError } = useAPI<UserInfo>("/api/v1/users")

  if (isLoading) {
    return <Loading fullScreen />
  }

  if (isError) {
    if (axios.isAxiosError(isError) && isError.response?.status === 401) {
      return <NotFound />
    } else {
      return <ErrorPage />
    }
  }

  return <Outlet context={data} />
}
