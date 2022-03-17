import { Link } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

export const EditorBackButton: React.VFC<{}> = (props) => {
  return (
    <ChakraLink color="green.600" fontSize="1.2rem">
      <Link to="/users/club/edit">←戻る</Link>
    </ChakraLink>
  )
}
