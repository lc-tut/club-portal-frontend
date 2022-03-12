import { Outlet } from "react-router-dom"
import { useAPI } from "../../../hooks/useAPI"
import { ErrorPage } from "../../../pages/error"
import type { UserInfo } from "../../../types/api"
import { Loading } from "../LoadingPage"

export const UserRouteElement: React.VFC<{}> = () => {
  const { data, isLoading, isError } = useAPI<UserInfo>("/api/v1/users")

  if (isLoading) {
    return <Loading fullScreen />
  }

  if (isError) {
    return <ErrorPage />
  }

  return <Outlet context={data} />
}
