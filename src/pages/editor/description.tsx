import { Textarea, VStack } from "@chakra-ui/react"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"

export const DescriptionEditor: React.VFC<{}> = () => {
  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークル説明文の編集</TitleArea>
      <form>
        <EditorBase>
          <Textarea
            backgroundColor="#fff"
            w="30rem"
            h="10rem"
            placeholder="サークルの説明文を入力して下さい"
            resize="none"
          />
          <PortalButton type="submit">保存</PortalButton>
        </EditorBase>
      </form>
    </VStack>
  )
}
