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
import { Fragment } from "react"

type FormTimeType = {
  date: DateType | ""
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
  const {
    register,
    formState: { errors },
  } = useFormContext<FormTimeType>()
  const { state, dispatch } = props
  const options: Array<EditorSelectOptionItem> = Object.entries(DATE_MAP).map(
    (d) => ({ displayName: d[1], value: d[0] })
  )

  return (
    <HStack textColor="text.main" mb="1.2rem">
      <FormControl w="10rem" isInvalid={errors.date !== undefined}>
        <Stack spacing="0">
          <EditorLabel label="曜日" />
          <Select
            w="10rem"
            backgroundColor="#fff"
            textColor="text.main"
            {...register("date", { disabled: state.isDateDisabled })}
          >
            <option value="" hidden>
              -
            </option>
            {options.map((item, index) => {
              return item.value !== "Etc" ? (
                <option key={index} value={item.value}>
                  {item.displayName}
                </option>
              ) : (
                <Fragment key={index}></Fragment>
              )
            })}
          </Select>
          <Wrap h="1.2rem">
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </Wrap>
        </Stack>
      </FormControl>
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
        <Wrap h="1.2rem" />
      </Stack>
      <Stack spacing="0">
        <EditorText>:</EditorText>
        <Wrap h="1.2rem" />
      </Stack>
      <Wrap h="1.2rem" />
      <Stack spacing="0">
        <Wrap pt="1.2rem" />
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
        <Wrap pt="1.2rem" />
      </Stack>
      <Stack spacing="0">
        <EditorText>~</EditorText>
        <Wrap h="1.2rem" />
      </Stack>
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
        <Wrap pt="1.2rem" />
      </Stack>
      <Stack spacing="0">
        <EditorText>:</EditorText>
        <Wrap h="1.2rem" />
      </Stack>
      <Wrap h="1.2rem" />
      <Stack spacing="0">
        <Wrap pt="1.2rem" />
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
        <Wrap pt="1.2rem" />
      </Stack>
      <Spacer w="0.5rem" />
      <Stack spacing="0">
        <EditorLabel label="曜日を「その他」にする" />
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={state.isDateDisabled}
            onChange={() => dispatch({ type: "date" })}
          />
        </Flex>
        <Wrap pt="1.2rem" />
      </Stack>
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
        <Wrap pt="1.2rem" />
      </Stack>
    </HStack>
  )
}
