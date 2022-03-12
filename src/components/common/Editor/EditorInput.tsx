import { Box, FormLabel, Text, TextProps } from "@chakra-ui/react"

export const EditorText: React.VFC<TextProps> = (props) => {
  return (
    <Text pt="1.2rem" color={props.color ?? "text.main"}>
      {props.children}
    </Text>
  )
}

type EditorLabelProps = {
  label: string
}

export const EditorLabel: React.VFC<EditorLabelProps> = (props) => (
  <Box minH="1.2rem">
    <FormLabel fontSize="0.8rem" color="text.sub">
      {props.label}
    </FormLabel>
  </Box>
)
