import { Input, Text, VStack } from "@chakra-ui/react"
import { createRef, useState } from "react"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../static/consts"

export const IconEditor: React.VFC<{}> = () => {
  const [ icon, setIcon ] = useState<string>("")
  const [ inputData, setInputData ] = useState<string>()
  const inputRef = createRef<HTMLInputElement>()

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>
        サークルアイコンの変更
      </TitleArea>
      <Input
        type="file"
        accept="image/png, image/jpeg"
        display="none"
        ref={inputRef}
      />
      <EditorBase>
        <PortalButton onClick={() => inputRef.current?.click()}>
          画像をアップロード
        </PortalButton>
      </EditorBase>
    </VStack>
  )
}
