import { Container, Flex, Center, Spinner, Box } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const Loading: React.FC<{ fullScreen?: boolean }> = (props) => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <Box minH={props.fullScreen ? "100vh" : "100%"}>
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
