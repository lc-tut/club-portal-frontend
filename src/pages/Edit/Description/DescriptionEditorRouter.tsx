import { useParams } from "react-router-dom"
import { NotFound } from "../../notfound"
import { ClubDescriptionEditor } from "./ClubDescriptionEditor"

const pageMap: {[key in string]: JSX.Element} = {
  "club-description": <ClubDescriptionEditor />
}

export const DescriptionEditorRouter: React.VFC<{}> = () => {
  const { page } = useParams()
  const content = pageMap[page ?? ""] ?? <NotFound />

  return content
}