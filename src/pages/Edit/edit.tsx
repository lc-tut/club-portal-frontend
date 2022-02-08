import { useParams } from "react-router-dom"
import { NotFound } from "../notfound"
import { EditorTop } from "./EditorTop"

const pageMap: {[key in string]: JSX.Element} = {
  top: <EditorTop />,
  notfound: <NotFound />
}

export const Editor: React.VFC<{}> = () => {
  const { page } = useParams()
  const label = page ?? "notfound"
  const content = pageMap[label] ?? <NotFound />

  return content
}
