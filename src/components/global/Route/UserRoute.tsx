import { Outlet } from "react-router-dom"
import { useLoadingStateContext } from "../../../contexts/loading"
import { useAPI } from "../../../hooks/useAPI"
import type { UserInfo } from "../../../types/api"

// TODO: return Unauthorized instead of NotFound
export const UserRouteElement: React.FC<{}> = () => {
  const { data } = useAPI<UserInfo>("/api/v1/users")
  const { isLoading } = useLoadingStateContext()

  return <>{!isLoading && data && <Outlet context={data} />}</>
}
