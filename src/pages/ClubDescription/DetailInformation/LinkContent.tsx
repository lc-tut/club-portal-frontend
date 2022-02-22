import { List, ListItem } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ContentProps, RowComponent } from "./RowComponent"

type LinkContentProps = ContentProps & {
  links: Array<string>
}

export const LinkContent: React.VFC<LinkContentProps> = (props) => {
  const content = (
    <List>
      {props.links.map((item) => {
        return (
          <ListItem key={item} textColor="green.600">
            <Link to={item}>{item}</Link>
          </ListItem>
        )
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
