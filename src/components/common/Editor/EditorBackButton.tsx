import { Link } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

export const EditorBackButton: React.VFC<{}> = () => {
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
