import { Center, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { PortalLogo } from "./Logo";

interface BannerProps {
  maincolor?: string
  subcolor?: string
}

export const PortalBanner: React.VFC<React.PropsWithChildren<BannerProps>> = (props) => {
  const mainColor = props.maincolor ? props.maincolor : "text.title.sub";
  const subColor = props.subcolor ? props.subcolor : "text.main";

  return (
    <Flex direction="column">
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
  );
}