import { Flex, Stack, VStack, Wrap } from "@chakra-ui/react"
import type { PropsWithChildren } from "react"
import { EditorBackButton } from "./EditorBackButton"

type EditorBaseProps = {
  noBackButton?: boolean
}

export const EditorBase: React.VFC<PropsWithChildren<EditorBaseProps>> = (
  props
) => {
  return (
    <Flex pt="1rem">
      <Stack>
        <Wrap h="2rem">
          {!props.noBackButton && <EditorBackButton />}
        </Wrap>
        <VStack
          backgroundColor="form.background"
          py="3rem"
          px="4rem"
          spacing="4rem"
        >
          {props.children}
        </VStack>
      </Stack>
    </Flex>
  )
}
