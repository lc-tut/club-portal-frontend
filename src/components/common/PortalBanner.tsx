import { BoxProps, HStack, Stack, Text } from "@chakra-ui/react"
import { PortalLogo } from "./Icon"

type BannerProps = BoxProps & {
  maincolor?: string
  subcolor?: string
}

export const PortalBanner: React.VFC<React.PropsWithChildren<BannerProps>> = (
  props
) => {
  const mainColor = props.maincolor ?? "text.title.sub"
  const subColor = props.subcolor ?? "text.main"

  return (
    <Stack direction="column">
      <HStack>
        <PortalLogo width="70px" height="100%" mr="8px" />
        <Text color={mainColor} fontSize="30px" fontWeight="bold">
          TUT Club Portal
        </Text>
      </HStack>
      <Text color={subColor} fontSize="16px" letterSpacing="4.7px">
        東京工科大学サークルホームページ
      </Text>
    </Stack>
  )
}
