import { HStack, Input, Select, Stack, Text, Wrap } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { EditorButton } from "../../../../components/common/Editor/EditorButton"
import type { StateDispatch } from "../../../../types/utils"

export type DatetimeItem = {
  date: string
  time: string
  remarks?: string
}

export type DatetimeEditorProps = {
  items: DatetimeItem[]
  setItems: StateDispatch<DatetimeItem[]>
}

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
  const selectRef = useRef<HTMLSelectElement>(null)

  const onAdd = (item: DatetimeItem) => {
    if (item.date === "") {
      window.alert("曜日を入力して下さい")
      return
    }

    setItems([...items, item])
    setInputData({
      date: "",
      time: "",
      remarks: "",
    })
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
      <HStack alignItems="start">
        <Wrap pt="1.2rem" m="0">
          <EditorButton icon="add" onClick={() => onAdd(inputData)} />
        </Wrap>
        <Stack w="100%">
          <HStack>
            <Stack spacing="0">
              <Text color="text.sub" fontSize="0.8rem" h="1.2rem">
                曜日
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
                    remarks: inputData.remarks,
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
              <Text color="text.sub" fontSize="0.8rem" h="1.2rem">
                時間
              </Text>
              <Input
                placeholder="例 19:00~21:00"
                backgroundColor="#fff"
                value={inputData.time}
                onChange={(e) =>
                  setInputData({
                    date: inputData.date,
                    time: e.target.value,
                    remarks: inputData.remarks,
                  })
                }
              />
            </Stack>
          </HStack>
          <Stack spacing="0">
            <Text fontSize="0.8rem" color="text.sub">
              備考(任意)
            </Text>
            <Input
              backgroundColor="#fff"
              placeholder="備考があれば入力して下さい"
              value={inputData.remarks}
              onChange={(e) => {
                setInputData({
                  date: inputData.date,
                  time: inputData.time,
                  remarks: e.target.value,
                })
              }}
            />
          </Stack>
        </Stack>
      </HStack>
      <Stack>
        {props.items.map((item, index) => {
          return (
            <HStack key={index} textColor="text.main">
              <EditorButton icon="remove" onClick={() => onRemove(index)} />
              <Text>{dateDisplayNameMap[item.date] + " - "}</Text>
              <Text>{item.time}</Text>
              <Text>{item.remarks ? " - " + item.remarks : ""}</Text>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
