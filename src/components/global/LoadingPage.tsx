import { Container, Flex, Center, Spinner } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { MinFullHeight } from "./Utils"

export const Loading: React.VFC<{}> = () => {
  return (
    <motion.div exit={{opacity: 0}}>
      <MinFullHeight>
        <Container maxW="2xl" height="100vh">
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="100%"
          >
            <Center>
              <Spinner size="xl" />
            </Center>
          </Flex>
        </Container>
      </MinFullHeight>
    </motion.div>
  )
}
