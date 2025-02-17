import { Link as ChakraLink } from "@chakra-ui/react"
import { Link } from "react-router-dom"

type BackButtonProps = {
  to: string
}
export const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  return (
    <ChakraLink as={Link} color="green.600" fontSize="1.2rem" to={to}>
      ←戻る
    </ChakraLink>
  )
}
