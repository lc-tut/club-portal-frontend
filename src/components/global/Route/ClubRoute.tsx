import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"
import { UnauthorizedPage } from "../../../pages"

export const ClubRouteElement: React.FC<{}> = () => {
  const user = useOutletUser()

  return user.role === "general" ? (
    <Outlet context={user} />
  ) : (
    <UnauthorizedPage />
  )
}
