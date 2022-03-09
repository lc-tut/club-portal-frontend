import { useOutletContext } from "react-router-dom"
import { UserInfo } from "../types/api"

export const useOutletUser = () => {
  return useOutletContext<UserInfo>()
}
