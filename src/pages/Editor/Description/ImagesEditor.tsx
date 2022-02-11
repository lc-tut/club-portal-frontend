import { Button, Input, VStack, Text } from "@chakra-ui/react"
import { createRef, useState } from "react"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { TitleArea } from "../../../components/global/Header/TitleArea"

export const ImagesEditor: React.VFC<{}> = () => {
  const [ inputData, setInputData ] = useState<File>()
  const inputRef = createRef<HTMLInputElement>()

  return (
    <VStack flex="1">
      <TitleArea>
        画像の掲載・変更
      </TitleArea>
      <EditorBase>
        <Input
          type="file"
          accept="image/png image/jpeg"
          display="none"
          ref={inputRef}
          onChange={(e)=>{
            const file = e.target.files?.item(0)
            if (file) {
              setInputData(file)
            }
          }}
        />
        <Button
          onClick={()=>inputRef.current?.click()}
        >
          ファイルを選択
        </Button>
        <Text>
          {inputData?.name}
        </Text>
      </EditorBase>
    </VStack>
  )
}