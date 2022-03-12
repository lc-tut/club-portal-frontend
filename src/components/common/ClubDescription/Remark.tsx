import { Box, Text } from "@chakra-ui/react"
import type { RemarkProps } from "../../../types/description"

export const Remark: React.VFC<RemarkProps> = (props) => {
  return (
    <Box
      width="100%"
      p="1rem"
      backgroundColor="background.remark"
      textColor="text.modal.sub"
      borderLeftWidth="1rem"
      borderLeftColor="green.200"
    >
      <Text>{props.text}</Text>
    </Box>
  )
}
