import { List, ListItem } from "@chakra-ui/react"
import { ContentProps, RowComponent } from "./RowComponent"

type TextContentProps = ContentProps & {
  // 要素ごとに改行する
  texts: Array<string>
}

export const TextContent: React.VFC<TextContentProps> = (props) => {
  const content = (
    <List textColor="text.main">
      {props.texts.map((item) => {
        return <ListItem key={item}>{item}</ListItem>
      })}
    </List>
  )

  return (
    <RowComponent
      icon={props.icon}
      label={props.label}
      islast={props.islast}
      content={content}
    />
  )
}
