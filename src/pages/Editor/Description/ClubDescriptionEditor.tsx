import { Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { PortalButton } from "../../../components/common/Button"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../components/global/TitleArea"

export const ClubDescriptionEditor: React.VFC<{}> = () => {
  return (
    <VStack flex="1">
      <TitleArea>
        サークル説明文の編集
      </TitleArea>
      <EditorBase>
        <Textarea
          backgroundColor="#fff"
          w="30rem"
          h="10rem"
          placeholder="サークルの説明文を入力して下さい"
        />
        <PortalButton> 保存 </PortalButton>
      </EditorBase>
    </VStack>
  )
}