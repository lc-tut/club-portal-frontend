import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"
import { UnauthorizedPage } from "../../../pages"

export const DomainUserRouteElement: React.FC<{}> = () => {
  const user = useOutletUser()

  return user.role === "domain" ? (
    <Outlet context={user} />
  ) : (
    <UnauthorizedPage />
  )
}
