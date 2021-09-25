import { Box, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { useSession } from "../hooks/useSession"

const AnimatedTop: React.VFC<{}> = () => {
  const { session } = useSession()

  return (
    <Box>
      <Text color="text.test">This is TEXT.</Text>
    </Box>
  )
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
