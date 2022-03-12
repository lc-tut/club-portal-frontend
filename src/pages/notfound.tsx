import { Heading, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
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
            お探しのページは見つかりませんでした
          </Heading>
          <Text color="text.main">URLにタイプミスが無いかご確認下さい。</Text>
        </VStack>
      </motion.div>
    </>
  )
}
