import { ListItem, UnorderedList } from "@chakra-ui/react"
import { ContentProps, RowComponent } from "./RowComponent"

type ListContentProps = ContentProps & {
  list: Array<string>
}

export const ListContent: React.VFC<ListContentProps> = (props) => {
  const content = (
    <UnorderedList stylePosition="inside" color="text.main">
      {props.list.map((item) => {
        return <ListItem key={item}> {item} </ListItem>
      })}
    </UnorderedList>
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
