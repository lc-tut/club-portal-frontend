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
  Wrap,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

import type {
  EditorSelectOptionItem,
  TimePlaceInputProps,
} from "../../../types/editor"
import { BUILDING_ID_MAP, TOGGLE_ROOM } from "../../../utils/consts"
import { EditorLabel } from "./CommonEditor"

type FormPlaceType = {
  place: {
    building: string
    room: number
  }
}

export const PlaceInput: React.FC<TimePlaceInputProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormPlaceType>()
  const { state, dispatch } = props
  const options: Array<EditorSelectOptionItem> = Object.entries(
    BUILDING_ID_MAP
  ).map((d) => ({ displayName: d[1], value: d[0] }))

  return (
    <HStack pl="50px">
      <FormControl
        w="10rem"
        isInvalid={
          errors.place !== undefined && errors.place.building !== undefined
        }
      >
        <Stack spacing="0">
          <EditorLabel label="活動場所" />
          <Select
            w="10rem"
            backgroundColor="#fff"
            textColor="text.main"
            {...register("place.building")}
          >
            <option value="" hidden>
              -
            </option>
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.displayName}
              </option>
            ))}
          </Select>
          <Wrap h="1.2rem">
            <FormErrorMessage>
              {errors.place?.building && errors.place.building.message}
            </FormErrorMessage>
          </Wrap>
        </Stack>
      </FormControl>
      <FormControl w="8rem">
        <Stack spacing="0" pb="1.2rem">
          <EditorLabel label="部屋番号" />
          <NumberInput
            width="8rem"
            min={0}
            max={2000}
            defaultValue={0}
            isDisabled={state.isRoomDisabled}
          >
            <NumberInputField
              backgroundColor="#fff"
              {...register("place.room", { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </FormControl>
      <Stack spacing="0" pl="2rem" pb="1.2rem">
        <EditorLabel label="部屋番号なし" />
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={state.isRoomDisabled}
            onChange={() => dispatch({ type: TOGGLE_ROOM })}
          />
        </Flex>
      </Stack>
    </HStack>
  )
}
