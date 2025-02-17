import { Flex, Stack, VStack, Wrap } from "@chakra-ui/react"

import { BackButton } from "../Button/BackButton"

type EditorBaseProps = {
  noBackButton?: boolean
}

export const EditorBase: React.FC<React.PropsWithChildren<EditorBaseProps>> = (
  props
) => {
  return (
    <Flex pt="1rem">
      <Stack>
        <Wrap h="2rem">
          {!props.noBackButton && <BackButton to={"/users/club/edit"} />}
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
