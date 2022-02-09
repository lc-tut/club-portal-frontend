import { useParams } from "react-router-dom"
import { NotFound } from "../../notfound"
import { ClubDescriptionEditor } from "./ClubDescriptionEditor"
import { DetailInformationEditor } from "./DetailInformation/DetailInformationEditor"

const pageMap: {[key in string]: JSX.Element} = {
  "club-description": <ClubDescriptionEditor />,
  "detail-information": <DetailInformationEditor />,
  "annual-plan": <></>,
  "links": <></>,
  "video": <></>,
  "pictures": <></>
}

export const DescriptionEditorRouter: React.VFC<{}> = () => {
  const { page } = useParams()
  const content = pageMap[page ?? ""] ?? <NotFound />

  return content
}