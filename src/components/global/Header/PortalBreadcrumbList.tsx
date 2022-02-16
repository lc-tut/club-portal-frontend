import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs"
import { useLocation } from "react-router-dom"

type PortalBreadcrumbListProps = {
  title: string
}

type breadcrumbNode = {
  label?: string
  // TitleAreaのprops.childrenをlabelとして使う
  useTitleAsLabel?: boolean
  // path: Node
  childNodes?: { [key in string]: breadcrumbNode }
  // /path/:uuid みたいな動的pathの場合の子Node
  dynamicChildNode?: breadcrumbNode
}

const breadcrumbTree: breadcrumbNode = {
  label: "Home",
  childNodes: {
    clubs: {
      label: "サークル一覧",
      dynamicChildNode: {
        useTitleAsLabel: true,
      },
    },
    users: {
      label: "",
      dynamicChildNode: {
        useTitleAsLabel: true,
      },
    },
    edit: {
      label: "編集者メニュー",
      childNodes: {
        description: {
          label: "サークル紹介ページ",
          dynamicChildNode: {
            useTitleAsLabel: true,
          },
        },
      },
      dynamicChildNode: {
        useTitleAsLabel: true,
      },
    },
  },
}

export const PortalBreadcrumbList: React.VFC<PortalBreadcrumbListProps> = (
  props
) => {
  const location = useLocation()
  const pathArray = location.pathname.split("/")
  const breadcrumbItems: JSX.Element[] = []

  let currentNode = breadcrumbTree
  let currentPath = "/"
  for (let i = 0; i < pathArray.length; i++) {
    const label = currentNode.useTitleAsLabel ? props.title : currentNode.label
    if (!label) {
      break
    }

    breadcrumbItems.push(
      <BreadcrumbItem key={i}>
        <BreadcrumbLink href={currentPath}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    )

    if (i >= pathArray.length) {
      break
    }

    if (currentNode.childNodes) {
      currentNode = currentNode.childNodes[pathArray[i + 1]]
    } else if (currentNode.dynamicChildNode) {
      currentNode = currentNode.dynamicChildNode
    }

    if (i > 0) {
      currentPath += "/"
    }
    currentPath += pathArray[i + 1]

    if (!currentNode) {
      break
    }
  }

  return (
    <Breadcrumb
      separator={<BsChevronRight />}
      fontSize="0.8rem"
      color="green.700"
      alignSelf="start"
    >
      {breadcrumbItems}
    </Breadcrumb>
  )
}
