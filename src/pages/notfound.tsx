import { Heading, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { TitleArea } from "../components/global/Header/TitleArea"

export const NotFound: React.VFC<{}> = () => {
  return (
    <>
      <motion.div>
        <VStack w="100vw">
          <TitleArea>
            404 Not Found
          </TitleArea>
          <Heading color="green.900" pt="5rem">
            お探しのページは
          </Heading>
          <Heading color="green.900">
            見つかりませんでした
          </Heading>
          <Text color="text.main">URLが正しいかどうかご確認下さい。</Text>
          <Text color="green.600" borderBottom="1px" pt="4rem">
            <Link to="/">←TOPページへ</Link>
          </Text>
        </VStack>
      </motion.div>
    </>
  )
}
