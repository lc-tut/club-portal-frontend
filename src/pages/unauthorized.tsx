import { Heading, VStack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { TitleArea } from "../components/global/Header/TitleArea"

export const UnauthorizedPage: React.FC<{}> = () => {
  return (
    <motion.div>
      <VStack w="100vw">
        <TitleArea>401 Unauthorized</TitleArea>
        <Heading color="green.900" pt="5rem">
          アクセスが許可されていないページです
        </Heading>
        <Text color="text.main">
          このページにアクセスする権限を持っていません。
          <br />
          正しいアカウントでログインしているかどうか、もう一度ご確認下さい。
          <br />
        </Text>
        <Text color="green.600" borderBottom="1px" pt="4rem">
          <Link to="/">←TOPページへ</Link>
        </Text>
      </VStack>
    </motion.div>
  )
}
