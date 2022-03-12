import { useOutletContext } from "react-router-dom"
import type { UserInfo } from "../types/api"

export const useOutletUser = () => {
  return useOutletContext<UserInfo>()
}
