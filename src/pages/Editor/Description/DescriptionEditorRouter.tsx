import { useParams } from "react-router-dom"
import { NotFound } from "../../notfound"
import { AnualPlanEditor } from "./AnnualPlanEditor"
import { ClubDescriptionEditor } from "./ClubDescriptionEditor"
import { DetailInformationEditor } from "./DetailInformation/DetailInformationEditor"
import { IntroductionVideoEditor } from "./IntroductionVideoEditor"
import { SnsLinkEditor } from "./SnsLinkEditor"

const pageMap: { [key in string]: JSX.Element } = {
  "club-description": <ClubDescriptionEditor />,
  "detail-information": <DetailInformationEditor />,
  "annual-plan": <AnualPlanEditor />,
  links: <SnsLinkEditor />,
  video: <IntroductionVideoEditor />,
  pictures: <></>,
}

export const DescriptionEditorRouter: React.VFC<{}> = () => {
  const { page } = useParams()
  const content = pageMap[page ?? ""] ?? <NotFound />

  return content
}
