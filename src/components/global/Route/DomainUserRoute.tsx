import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"
import { NotFound } from "../../../pages"

export const DomainUserRouteElement: React.VFC<{}> = () => {
  const user = useOutletUser()

  return user.role === "domain" ? <Outlet context={user} /> : <NotFound />
}
