import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"

export const DomainUserRouteElement: React.FC<{}> = () => {
  const user = useOutletUser()

  return <>{user.role === "domain" && <Outlet context={user} />}</>
}
