import { Heading, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { TitleArea } from "../components/global/Header/TitleArea"

export const ErrorPage: React.FC<{}> = () => {
  return (
    <motion.div>
      <VStack w="100vw">
        <TitleArea>Error</TitleArea>
        <Heading color="green.900" pt="5rem">
          エラーが発生しました
        </Heading>
        <Text color="text.main">
          サーバーでエラーが発生したか、一時的に利用できない状態です。
          <br />
          URLが正しいかどうか、もう一度ご確認下さい。
          <br />
        </Text>
        <Text color="green.600" borderBottom="1px" pt="4rem">
          <Link to="/">←TOPページへ</Link>
        </Text>
      </VStack>
    </motion.div>
  )
}
