import { Outlet } from "react-router-dom"
import { useAPI } from "../../../hooks/useAPI"
import { UserInfo } from "../../../types/api"

export const UserRouteElement: React.VFC<{}> = () => {
  const { data, isLoading, isError } = useAPI<UserInfo>("/api/v1/users")

  return <Outlet context={data} />
}
