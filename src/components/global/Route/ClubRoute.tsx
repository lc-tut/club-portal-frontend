import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"

export const ClubRouteElement: React.FC<{}> = () => {
  const user = useOutletUser()

  return <>{user.role === "general" && <Outlet context={user} />}</>
}
