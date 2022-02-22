import { HStack, Text } from "@chakra-ui/react"
import { IconType } from "react-icons"

type RowComponentProps = {
  icon: IconType
  label: string
  content: JSX.Element
  islast: boolean
}

export type ContentProps = Pick<RowComponentProps, "icon" | "label" | "islast">

export const RowComponent: React.VFC<RowComponentProps> = (props) => {
  return (
    <HStack
      borderTop="1px"
      borderTopColor="text.sub"
      borderBottom={props.islast ? "1px" : ""}
      borderBottomColor="text.sub"
      py="0.8rem"
    >
      <HStack minWidth="7rem" pl="0.2rem" color="text.sub">
        <props.icon size="1.1rem" />
        <Text>{props.label}</Text>
      </HStack>
      {props.content}
    </HStack>
  )
}
