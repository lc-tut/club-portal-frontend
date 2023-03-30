import { useMemo } from "react"
import type { ClubPageExternal } from "../types/api"
import type { FilterStateType } from "../types/reducer"
import { useAPI } from "./useAPI"

// TODO: fix keyword and rendering problem
export function useClubDisplay(
  arr: Array<ClubPageExternal> | undefined,
  state: FilterStateType,
  keyword: string
) {
  const { data } = useAPI<Array<ClubPageExternal> | null>(
    keyword === "" ? null : `/api/v1/clubs/search?content=${keyword}`
  )

  if (data) {
    arr = data
  }

  const filteredClub = useMemo<typeof arr>(() => {
    return arr?.filter((val) => {
      const {
        isHachiojiCampus,
        isKamataCampus,
        isSportsClub,
        isCultureClub,
        isCommittee,
      } = state
      if (val.campus === 0 && !isHachiojiCampus) return false
      if (val.campus === 1 && !isKamataCampus) return false
      if (val.clubType === 0 && !isSportsClub) return false
      if (val.clubType === 1 && !isCultureClub) return false
      if (val.clubType === 2 && !isCommittee) return false
      return true
    })
  }, [arr, state])
  const sortedClub = useMemo<typeof arr>(() => {
    return filteredClub?.sort((val1, val2) => {
      if (state.isAscending) {
        return val1.name.localeCompare(val2.name)
      } else {
        return val2.name.localeCompare(val1.name)
      }
    })
  }, [filteredClub, state.isAscending])

  return sortedClub
}
