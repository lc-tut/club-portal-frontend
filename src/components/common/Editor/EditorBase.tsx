import { VStack } from "@chakra-ui/react";
import React from "react";

export const EditorBase: React.VFC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <VStack
      backgroundColor="form.background"
      py="3rem"
      px="4rem"
      spacing="2rem"
    >
      {props.children}
    </VStack>
  )
}