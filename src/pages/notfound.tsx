import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const NotFound: React.VFC<{}> = () => {
  return (
    <motion.div>
      <h1>Not Found</h1>
      <Link to="/">Back</Link>
    </motion.div>
  )
}
