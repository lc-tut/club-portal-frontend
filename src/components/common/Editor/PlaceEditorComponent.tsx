//@ts-nocheck

import {
  Flex,
  FormControl,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react"
import { EditorLabel } from "./EditorInput"
import { BUILDING_ID_MAP } from "../../../utils/consts"
import type {
  EditorSelectOptionItem,
  TimePlaceInputProps,
} from "../../../types/editor"
import { useFormContext } from "react-hook-form"

type FormPlaceType = {
  place: {
    building: number
    room: number
  }
}

export const PlaceInput: React.VFC<TimePlaceInputProps> = (props) => {
  const { register } = useFormContext<FormPlaceType>()
  const { state, dispatch } = props
  const options: Array<EditorSelectOptionItem> = Object.entries(
    BUILDING_ID_MAP
  ).map((d) => ({ displayName: d[1], value: d[0] }))

  return (
    <HStack>
      <FormControl w="10rem">
        <Stack spacing="0">
          <EditorLabel label="活動場所" />
          <Select
            w="10rem"
            backgroundColor="#fff"
            textColor="text.main"
            {...register("place.building", { disabled: state.isPlaceDisabled })}
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
        </Stack>
      </FormControl>
      <FormControl w="8rem">
        <Stack spacing="0">
          <EditorLabel label="部屋番号" />
          <NumberInput
            width="8rem"
            min={0}
            max={2000}
            defaultValue={0}
            {...register("place.room", {
              disabled: state.isPlaceDisabled || state.isRoomDisabled,
            })}
          >
            <NumberInputField backgroundColor="#fff" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </FormControl>
      <Stack spacing="0" pl="2rem">
        <EditorLabel label="部屋番号なし" />
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={state.isRoomDisabled}
            onChange={() => dispatch({ type: "room" })}
          />
        </Flex>
      </Stack>
      <Stack spacing="0" pl="1rem">
        <EditorLabel label="場所を「その他」にする" />
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={state.isPlaceDisabled}
            onChange={() => dispatch({ type: "place" })}
          />
        </Flex>
      </Stack>
    </HStack>
  )
}
