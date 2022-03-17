import { Link } from "react-router-dom"
import { Text } from "@chakra-ui/react"

export const EditorBackButton: React.VFC<{}> = (props) => {
  return (
    <Text color="green.600" fontSize="1.2rem" _hover={{ borderBottom: "1px" }}>
      <Link to="/users/club/edit">←戻る</Link>
    </Text>
  )
}
