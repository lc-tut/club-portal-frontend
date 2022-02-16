import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs"
import { useLocation } from "react-router-dom"

export const PortalBreadcrumbList: React.VFC<{}> = () => {
  const location = useLocation()
  const pathArray = location.pathname.split('/')
  console.log(pathArray)

  return (
    <Breadcrumb
      separator={<BsChevronRight />}
      fontSize="0.8rem"
      color="green.700"
      alignSelf="start"
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">PageA</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">PageB</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
