//@ts-nocheck

import {
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spacer,
  Stack,
  Switch,
  Wrap,
} from "@chakra-ui/react"
import { EditorLabel, EditorText } from "./EditorInput"
import type {
  EditorSelectOptionItem,
  TimePlaceInputProps,
} from "../../../types/editor"
import { DATE_MAP } from "../../../utils/consts"
import type { DateType } from "../../../types/description"
import { useFormContext } from "react-hook-form"

type FormDateType = {
  date: DateType | ""
}

export const DateSelect: React.VFC<{}> = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormDateType>()
  const options: Array<EditorSelectOptionItem> = Object.entries(DATE_MAP).map(
    (d) => ({ displayName: d[1], value: d[0] })
  )

  return (
    <Stack spacing="0">
      <FormControl isInvalid={errors.date !== undefined}>
        <EditorLabel label="曜日" />
        <Select
          w="10rem"
          backgroundColor="#fff"
          textColor="text.main"
          {...register("date")}
        >
          <option value="" hidden>
            -
          </option>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.displayName}
              </option>
            )
          })}
        </Select>
        <Wrap h="1.2rem">
          <FormErrorMessage>
            {errors.date && errors.date.message}
          </FormErrorMessage>
        </Wrap>
      </FormControl>
    </Stack>
  )
}

type FormTimeType = {
  start: {
    hour: number
    minute: number
  }
  end: {
    hour: number
    minute: number
  }
}

export const TimeInput: React.VFC<TimePlaceInputProps> = (props) => {
  const { register } = useFormContext<FormTimeType>()
  const { state, dispatch } = props

  return (
    <FormControl>
      <HStack textColor="text.main" mb="1.2rem">
        <Stack spacing="0">
          <EditorLabel label="開始時間" />
          <NumberInput
            width="5rem"
            min={0}
            max={23}
            defaultValue={19}
            {...register("start.hour", { disabled: state.isTimeDisabled })}
          >
            <NumberInputField backgroundColor="#fff" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <EditorText>:</EditorText>
        <Wrap pt="1.2rem">
          <NumberInput
            width="5rem"
            min={0}
            max={59}
            defaultValue={0}
            {...register("start.minute", { disabled: state.isTimeDisabled })}
          >
            <NumberInputField backgroundColor="#fff" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Wrap>
        <EditorText>~</EditorText>
        <Stack spacing="0">
          <EditorLabel label="終了時間" />
          <NumberInput
            width="5rem"
            min={0}
            max={23}
            defaultValue={21}
            {...register("end.hour", { disabled: state.isTimeDisabled })}
          >
            <NumberInputField backgroundColor="#fff" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <EditorText>:</EditorText>
        <Wrap pt="1.2rem">
          <NumberInput
            width="5rem"
            min={0}
            max={23}
            defaultValue={0}
            {...register("end.minute", { disabled: state.isTimeDisabled })}
          >
            <NumberInputField backgroundColor="#fff" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Wrap>
        <Spacer w="0.5rem" />
        <Stack spacing="0">
          <EditorLabel label="時間を「その他」にする" />
          <Flex h="40px" alignItems="center">
            <Switch
              colorScheme="green"
              size="lg"
              isChecked={state.isTimeDisabled}
              onChange={() => dispatch({ type: "time" })}
            />
          </Flex>
        </Stack>
      </HStack>
    </FormControl>
  )
}
