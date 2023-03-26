import { useMediaQuery } from "@chakra-ui/react"

export function useMobileMediaQuery() {
  const [isMobile] = useMediaQuery("(max-width: 32em)")
  return isMobile
}
