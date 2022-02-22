import { useParams } from "react-router-dom"
import { NotFound } from "../../notfound"
import { AnualPlanEditor } from "./AnnualPlanEditor"
import { ClubDescriptionEditor } from "./ClubDescriptionEditor"
import { DetailInformationEditor } from "./DetailInformation/DetailInformationEditor"
import { ImagesEditor } from "./ImagesEditor"
import { IntroductionVideoEditor } from "./IntroductionVideoEditor"
import { SNSLinkEditor } from "./SNSLinkEditor"

const pageMap: { [key in string]: JSX.Element } = {
  "club-description": <ClubDescriptionEditor />,
  "detail-information": <DetailInformationEditor />,
  "annual-plan": <AnualPlanEditor />,
  links: <SNSLinkEditor />,
  video: <IntroductionVideoEditor />,
  pictures: <ImagesEditor />,
}

export const DescriptionEditorRouter: React.VFC<{}> = () => {
  const { page } = useParams()
  const content = pageMap[page ?? ""] ?? <NotFound />

  return content
}
