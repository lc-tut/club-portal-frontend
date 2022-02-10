import {
  HStack, Input,
  Select,
  Stack,
  Text
} from "@chakra-ui/react"
import { createRef, useState } from "react"
import { EditorButton } from "../../../../components/common/Editor/EditorButton"
import { DatetimeEditorProps, DatetimeItem } from "../../../../types/editor"

const dateDisplayNameMap: { [key in string]: string } = {
  mon: "月",
  tue: "火",
  wed: "水",
  thu: "木",
  fri: "金",
  sat: "土",
  sun: "日",
}

export const DatetimeEditor: React.VFC<DatetimeEditorProps> = (props) => {
  const { items, setItems } = props
  const [inputData, setInputData] = useState<DatetimeItem>({
    date: "",
    time: "",
  })
  const selectRef = createRef<HTMLSelectElement>()

  const onAdd = (item: DatetimeItem) => {
    if (item.date === "") {
      window.alert("曜日を入力して下さい")
      return
    }

    setItems([...items, item])
    selectRef.current?.focus()
  }
  const onRemove = (index: number) => {
    const newItems = [...props.items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <Stack spacing="0.5rem">
      <Text color="text.main" fontSize="1.2rem">
        活動日時
      </Text>
      <HStack alignItems="end">
        <EditorButton
          icon="add"
          onClick={()=>onAdd(inputData)}
        />
        <Stack spacing="0">
          <Text color="text.sub" fontSize="0.8rem">
            {" "}
            曜日{" "}
          </Text>
          <Select
            textColor="text.main"
            backgroundColor="#fff"
            ref={selectRef}
            value={inputData?.date}
            onChange={(e) =>
              setInputData({
                date: e.target.value,
                time: inputData.time,
              })
            }
          >
            <option value=""> - </option>
            <option value="mon"> {dateDisplayNameMap["mon"]} </option>
            <option value="tue"> {dateDisplayNameMap["tue"]} </option>
            <option value="wed"> {dateDisplayNameMap["wed"]} </option>
            <option value="thu"> {dateDisplayNameMap["thu"]} </option>
            <option value="fri"> {dateDisplayNameMap["fri"]} </option>
            <option value="sat"> {dateDisplayNameMap["sat"]} </option>
            <option value="sun"> {dateDisplayNameMap["sun"]} </option>
          </Select>
        </Stack>
        <Stack flex="1" spacing="0">
          <Text color="text.sub" fontSize="0.8rem">
            {" "}
            曜日{" "}
          </Text>
          <Input
            placeholder="例 19:00~21:00"
            backgroundColor="#fff"
            value={inputData.time}
            onChange={(e) =>
              setInputData({
                date: inputData.date,
                time: e.target.value,
              })
            }
          />
        </Stack>
      </HStack>
      <Stack>
        {props.items.map((item, index) => {
          return (
            <HStack key={index} textColor="text.main">
              <EditorButton
                icon="remove"
                onClick={()=>onRemove(index)}
              />
              <Text>{dateDisplayNameMap[item.date] + " - "}</Text>
              <Text>{item.time}</Text>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
