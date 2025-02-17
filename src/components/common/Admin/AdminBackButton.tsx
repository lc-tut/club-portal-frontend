import { Link as ChakraLink } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const AdminBackButton: React.FC<{}> = () => {
  const onClick = () => {
    window.history.back()
  }

  return (
    <ChakraLink as={Link} color="green.600" fontSize="1.2rem" onClick={onClick}>
      ←戻る
    </ChakraLink>
  )
}
