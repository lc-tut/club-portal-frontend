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
  Stack,
  Switch,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { EditorLabel, EditorText } from "./CommonEditor"
import type {
  EditorSelectOptionItem,
  TimePlaceInputProps,
} from "../../../types/editor"
import { DATE_MAP, TOGGLE_DATE, TOGGLE_TIME } from "../../../utils/consts"
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
    <Stack>
      <HStack textColor="text.main">
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
        <Stack spacing="0" pb="1.2rem">
          <EditorLabel label="開始時間" />
          <NumberInput
            width="5rem"
            min={0}
            max={23}
            defaultValue={19}
            isDisabled={state.isTimeDisabled}
          >
            <NumberInputField
              backgroundColor="#fff"
              {...register("start.hour")}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <Stack spacing="0" pb="1.2rem">
          <EditorText pb="1.2rem">:</EditorText>
        </Stack>
        <Stack spacing="0" py="1.2rem">
          <NumberInput
            width="5rem"
            min={0}
            max={59}
            defaultValue={0}
            isDisabled={state.isTimeDisabled}
          >
            <NumberInputField
              backgroundColor="#fff"
              {...register("start.minute")}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <Stack spacing="0" pb="1.2rem">
          <EditorText>~</EditorText>
        </Stack>
        <Stack spacing="0" pb="1.2rem">
          <EditorLabel label="終了時間" />
          <NumberInput
            width="5rem"
            min={0}
            max={23}
            defaultValue={21}
            isDisabled={state.isTimeDisabled}
          >
            <NumberInputField
              backgroundColor="#fff"
              {...register("end.hour")}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <Stack spacing="0" pb="1.2rem">
          <EditorText>:</EditorText>
        </Stack>
        <Stack spacing="0" py="1.2rem">
          <NumberInput
            width="5rem"
            min={0}
            max={23}
            defaultValue={0}
            isDisabled={state.isTimeDisabled}
          >
            <NumberInputField
              backgroundColor="#fff"
              {...register("end.minute")}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </HStack>
      <HStack pb="1rem" spacing="1.5rem">
        <VStack spacing="0">
          <EditorLabel label="曜日を「その他」にする" />
          <Flex h="40px" alignItems="center">
            <Switch
              colorScheme="green"
              size="lg"
              isChecked={state.isDateDisabled}
              onChange={() => dispatch({ type: TOGGLE_DATE })}
            />
          </Flex>
        </VStack>
        <VStack spacing="0">
          <EditorLabel label="時間を「その他」にする" />
          <Flex h="40px" alignItems="center">
            <Switch
              colorScheme="green"
              size="lg"
              isChecked={state.isTimeDisabled}
              onChange={() => dispatch({ type: TOGGLE_TIME })}
            />
          </Flex>
        </VStack>
      </HStack>
    </Stack>
  )
}
