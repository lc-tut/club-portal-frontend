import { Center } from "@chakra-ui/react"

import type {
  BadgeCampus,
  BadgeContent,
  BadgeSize,
  ClubTypeBadgeProp,
} from "../../../types/badge"

function isCampusContent(content: BadgeContent): content is BadgeCampus {
  return content === "hachioji" || content === "kamata"
}

export const ClubTypeBadge: React.FC<ClubTypeBadgeProp> = (props) => {
  const sizeMap: Record<
    BadgeSize,
    {
      height: string
      width: string
      fontSize: string
    }
  > = {
    card: {
      height: "1rem",
      width: "3rem",
      fontSize: "0.5rem",
    },
    page: {
      height: "1.5rem",
      width: "4.5rem",
      fontSize: "0.85rem",
    },
  }

  const contentMap: Record<BadgeContent, string> = {
    hachioji: "八王子",
    kamata: "蒲田",
    sports: "体育系",
    culture: "文化系",
    committee: "委員会",
  }

  type ColorType = {
    foreground: string
    background: string
  }
  const colorMap: Record<"campus" | "activity", ColorType> = {
    campus: {
      foreground: "badge.text.campus",
      background: "badge.background.campus",
    },
    activity: {
      foreground: "badge.text.activity",
      background: "badge.background.activity",
    },
  }

  const type: BadgeSize = props.badgetype ?? "card"
  const size = sizeMap[type]
  const content = contentMap[props.content]
  const color = colorMap[isCampusContent(props.content) ? "campus" : "activity"]

  return (
    <Center
      height={size["height"]}
      width={size["width"]}
      fontSize={size["fontSize"]}
      color={color["foreground"]}
      backgroundColor={color["background"]}
    >
      {content}
    </Center>
  )
}
