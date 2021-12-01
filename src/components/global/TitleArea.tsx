import { Flex, Heading } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { PortalBanner } from "../common/PortalBanner";

export const TitleArea: React.VFC<PropsWithChildren<{}>> = (props) => {
  return (
    <Flex flex="1" maxHeight="200px" justifyContent="center">
      <PortalBanner />
      <Heading
        justifySelf="center"
        alignSelf="center"
        fontSize="40px"
      >
        {props.children}
      </Heading>
    </Flex>
  );
}
