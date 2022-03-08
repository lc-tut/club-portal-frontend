import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"

export const ClubRouteElement: React.VFC<{}> = () => {
  const user = useOutletUser()

  // return ( user.role === "general" ? <Outlet context={user} /> : <p>Forbidden</p>)
  return <Outlet context={user} />
}
