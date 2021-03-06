import { Outlet } from "react-router-dom"
import { useOutletUser } from "../../../hooks/useOutletUser"
import { NotFound } from "../../../pages"

export const ClubRouteElement: React.VFC<{}> = () => {
  const user = useOutletUser()

  return user.role === "general" ? <Outlet context={user} /> : <NotFound />
}
