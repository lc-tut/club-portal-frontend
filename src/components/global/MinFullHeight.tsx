import { Box } from "@chakra-ui/layout"
import type { PropsWithChildren } from "react"

export const MinFullHeight: React.VFC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return <Box minH="100vh">{children}</Box>
}
