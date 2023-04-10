import { useOutletContext } from "react-router-dom"

import type { UserInfo } from "../types/api"

export function useOutletUser() {
  return useOutletContext<UserInfo>()
}
