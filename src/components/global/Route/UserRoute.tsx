import axios from "axios"
import { Outlet } from "react-router-dom"
import { useLoadingStateContext } from "../../../contexts/loading"
import { useAPI } from "../../../hooks/useAPI"
import { NotFound } from "../../../pages"
import { ErrorPage } from "../../../pages/error"
import type { UserInfo } from "../../../types/api"

// TODO: return Unauthorized instead of NotFound
export const UserRouteElement: React.FC<{}> = () => {
  const { data } = useAPI<UserInfo>("/api/v1/users")
  const { isLoading, error } = useLoadingStateContext()

  if (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return <NotFound />
    } else {
      return <ErrorPage />
    }
  }

  return <>{!isLoading && data && <Outlet context={data} />}</>
}
