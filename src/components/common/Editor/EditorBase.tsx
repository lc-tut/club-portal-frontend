import { Flex, VStack } from "@chakra-ui/react"
import React from "react"

export const EditorBase: React.VFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <Flex pt="3rem">
      <VStack
        backgroundColor="form.background"
        py="3rem"
        px="4rem"
        spacing="4rem"
      >
        {props.children}
      </VStack>
    </Flex>
  )
}
