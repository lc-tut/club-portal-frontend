import { useParams } from "react-router-dom"
import { NotFound } from "../notfound"
import { IconEditor } from "./IconEditor"

const pageMap: {[key in string]: JSX.Element} = {
  "club-icon": <IconEditor />
}

export const EditorRouter: React.VFC<{}> = () => {
  const { page } = useParams()
  const content = pageMap[page ?? ""] ?? <NotFound />
    
  return content
}