import { useMediaQuery } from "@chakra-ui/react"

export const useMobileMediaQuery = () => {
  const [isMobile] = useMediaQuery("(max-width: 32em)")
  return isMobile
}
