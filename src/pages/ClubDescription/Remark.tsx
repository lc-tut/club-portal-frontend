import { Box, List, ListItem } from "@chakra-ui/react"
import { RemarkProps } from "../../types/description"

export const Remark: React.VFC<RemarkProps> = (props) => {
  return (
    <Box
      width={props.width ?? "100%"}
      p="1rem"
      backgroundColor="background.remark"
      textColor="text.modal.sub"
      borderLeftWidth="1rem"
      borderLeftColor="green.200"
    >
      <List>
        {props.texts.map((item) => {
          return <ListItem key={item}>{item}</ListItem>
        })}
      </List>
    </Box>
  )
}
