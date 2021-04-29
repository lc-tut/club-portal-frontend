import { motion } from "framer-motion"
import React from "react"
import { Link } from "react-router-dom"
import { useSession } from "../hooks/useSession"

const AnimatedTop: React.VFC<{}> = () => {
  const { session } = useSession()

  return <motion.div></motion.div>
}

export const Top: React.VFC<{}> = () => {
  return <AnimatedTop />
}
