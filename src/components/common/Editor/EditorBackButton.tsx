import { Link as ChakraLink } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const EditorBackButton: React.FC<{}> = () => {
  return (
    <ChakraLink
      as={Link}
      color="green.600"
      fontSize="1.2rem"
      to="/users/club/edit"
    >
      ←戻る
    </ChakraLink>
  )
}
