import { Box, Center, Container, Flex, Spinner } from "@chakra-ui/react"
import { motion } from "framer-motion"

import { useLoadingStateContext } from "../../contexts/loading"

export const Loading: React.FC<{}> = () => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <Box minH="100%">
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
      </Box>
    </motion.div>
  )
}

export const LoadingOverlay: React.FC<{}> = () => {
  const { isLoadingOuter } = useLoadingStateContext()

  return isLoadingOuter ? (
    <Box minH="100vh" minW="100vw" zIndex={Infinity} position="absolute" top="0" left="0">
      <Container maxW="2xl" height="100vh">
        <Flex direction="column" align="center" justify="center" height="100%">
          <Center>
            <Spinner size="xl" />
          </Center>
        </Flex>
      </Container>
    </Box>
  ) : (
    <></>
  )
}
