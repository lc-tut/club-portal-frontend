import { Outlet } from "react-router-dom"

import { useLoadingStateContext } from "../../../contexts/loading"
import { useAPI } from "../../../hooks/useAPI"
import type { UserInfo } from "../../../types/api"

export const UserRouteElement: React.FC<{}> = () => {
  const { data } = useAPI<UserInfo>("/api/v1/users")
  const { isLoadingOuter } = useLoadingStateContext()

  return <>{!isLoadingOuter && data && <Outlet context={data} />}</>
}
