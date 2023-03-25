import { Box, FormLabel, Text, type TextProps } from "@chakra-ui/react"

export const EditorText: React.FC<TextProps> = (props) => {
  return (
    <Text pt="1.2rem" color={props.color ?? "text.main"}>
      {props.children}
    </Text>
  )
}

type EditorLabelProps = {
  label: string
}

export const EditorLabel: React.FC<EditorLabelProps> = (props) => (
  <Box minH="1.2rem">
    <FormLabel fontSize="0.8rem" color="text.sub" m="0">
      {props.label}
    </FormLabel>
  </Box>
)
