import { ClubPageExternal, ClubPageInternal } from "../types/api"
import { useAPI } from "./useAPI";

export const useClubInternalList = (clubs: Array<ClubPageExternal>) => {
  for (const club of clubs) {
    console.log(club.clubSlug);
    const {data, isLoading, isError} = useAPI<ClubPageInternal>("")
  }

  return {
    list: [],
    isLoading: false,
    isError: false
  }
}
