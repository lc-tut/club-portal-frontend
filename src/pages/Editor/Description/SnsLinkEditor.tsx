import { HStack, Input, Select, Stack, VStack, Text } from "@chakra-ui/react"
import React, {
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from "react"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { EditorButton } from "../../../components/common/Editor/EditorButton"
import { TitleArea } from "../../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER, VALID_SNS_LIST } from "../../../static/consts"

type SnsLinkItem = {
  label: string
  url: string
}

type LabelSelectorProps = {
  ref: RefObject<HTMLSelectElement>
  inputData: SnsLinkItem
  setInputData: Dispatch<SetStateAction<SnsLinkItem>>
}

type UrlInputProps = {
  ref: RefObject<HTMLInputElement>
  inputData: SnsLinkItem
  setInputData: Dispatch<SetStateAction<SnsLinkItem>>
}

const LabelSelect: React.VFC<LabelSelectorProps> = (props) => {
  return (
    <Stack spacing="0">
      <Text fontSize="0.8rem" color="text.sub">
        {" "}
        SNS{" "}
      </Text>
      <Select
        backgroundColor="#fff"
        w="12rem"
        ref={props.ref}
        value={props.inputData.label}
        onChange={(e) => {
          props.setInputData({
            label: e.target.value,
            url: props.inputData.url,
          })
        }}
      >
        <option value=""> - </option>
        {VALID_SNS_LIST.map((item) => {
          return (
            <option key={item} value={item}>
              {" "}
              {item}{" "}
            </option>
          )
        })}
      </Select>
    </Stack>
  )
}

const UrlInput: React.VFC<UrlInputProps> = (props) => {
  return (
    <Stack spacing="0">
      <Text fontSize="0.8rem" color="text.sub">
        {" "}
        URL{" "}
      </Text>
      <Input
        w="25rem"
        placeholder="URLを入力して下さい"
        backgroundColor="#fff"
        ref={props.ref}
        value={props.inputData.url}
        onChange={(e) => {
          props.setInputData({
            label: props.inputData.label,
            url: e.target.value,
          })
        }}
      />
    </Stack>
  )
}

export const SnsLinkEditor: React.VFC<{}> = () => {
  const dummy = [
    ["twitter", "https://twitter.com/lc_tut"],
    ["instagram", "https://www.instagram.com/instagram/"],
  ]
  const [items, setItems] = useState(dummy)
  const [inputData, setInputData] = useState<SnsLinkItem>({
    label: "",
    url: "",
  })
  const selectRef = createRef<HTMLSelectElement>()
  const inputRef = createRef<HTMLInputElement>()
  const onAdd = () => {
    if (inputData.label === "") {
      window.alert("SNSの種類を選択して下さい")
      selectRef.current?.focus()
      return
    }
    if (inputData.url === "") {
      window.alert("URLを入力して下さい")
      inputRef.current?.focus()
      return
    }

    const newItems = [...items, [inputData.label, inputData.url]]
    setItems(newItems)
    setInputData({
      label: "",
      url: "",
    })
    selectRef.current?.focus()
  }
  const onRemove = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>SNSリンクの編集</TitleArea>
      <EditorBase>
        <HStack alignItems="end">
          <EditorButton icon="add" onClick={() => onAdd()} />
          <LabelSelect
            ref={selectRef}
            inputData={inputData}
            setInputData={setInputData}
          />
          <UrlInput
            ref={inputRef}
            inputData={inputData}
            setInputData={setInputData}
          />
        </HStack>
        <Stack w="100%">
          {items.map((item, index) => {
            return (
              <HStack key={item[1]} textColor="text.main">
                <EditorButton icon="remove" onClick={() => onRemove(index)} />
                <Text> {item[0] + " - "} </Text>
                <Text> {item[1]} </Text>
              </HStack>
            )
          })}
        </Stack>
      </EditorBase>
    </VStack>
  )
}
