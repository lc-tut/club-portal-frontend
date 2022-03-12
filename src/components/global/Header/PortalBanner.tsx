import { Center, Flex, Text, BoxProps } from "@chakra-ui/react"
import { PortalLogo } from "../../common/Icon"

type BannerProps = BoxProps & {
  maincolor?: string
  subcolor?: string
}

export const PortalBanner: React.VFC<BannerProps> = (props) => {
  const mainColor = props.maincolor ?? "text.title.sub"
  const subColor = props.subcolor ?? "text.main"

  return (
    <Flex direction="column" {...props}>
      <Center>
        <PortalLogo width="70px" height="100%" mr="8px" />
        <Text color={mainColor} fontSize="30px" fontWeight="bold">
          TUT Club Portal
        </Text>
      </Center>
      <Text color={subColor} fontSize="16px" width="100%" letterSpacing="4.7px">
        東京工科大学サークルホームページ
      </Text>
    </Flex>
  )
}
