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
  Wrap,
  FormErrorMessage,
} from "@chakra-ui/react"
import { EditorLabel } from "./CommonEditorComponent"
import {
  BUILDING_ID_MAP,
  TOGGLE_PLACE,
  TOGGLE_ROOM,
} from "../../../utils/consts"
import type {
  EditorSelectOptionItem,
  TimePlaceInputProps,
} from "../../../types/editor"
import { useFormContext } from "react-hook-form"
import { Fragment } from "react"

type FormPlaceType = {
  place: {
    building: number
    room: number
  }
}

export const PlaceInput: React.VFC<TimePlaceInputProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormPlaceType>()
  const { state, dispatch } = props
  const options: Array<EditorSelectOptionItem> = Object.entries(
    BUILDING_ID_MAP
  ).map((d) => ({ displayName: d[1], value: d[0] }))

  return (
    <HStack>
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
            {...register("place.building", { disabled: state.isPlaceDisabled })}
          >
            <option value="" hidden>
              -
            </option>
            {options.map((item, index) => {
              return item.value !== "300" ? (
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
              {errors.place?.building && errors.place.building.message}
            </FormErrorMessage>
          </Wrap>
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
            isDisabled={state.isPlaceDisabled || state.isRoomDisabled}
          >
            <NumberInputField
              backgroundColor="#fff"
              {...register("place.room")}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Wrap h="1.2rem" />
        </Stack>
      </FormControl>
      <Stack spacing="0" pl="2rem">
        <EditorLabel label="部屋番号なし" />
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={state.isRoomDisabled}
            onChange={() => dispatch({ type: TOGGLE_ROOM })}
          />
        </Flex>
        <Wrap h="1.2rem" />
      </Stack>
      <Stack spacing="0" pl="1rem">
        <EditorLabel label="場所を「その他」にする" />
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={state.isPlaceDisabled}
            onChange={() => dispatch({ type: TOGGLE_PLACE })}
          />
        </Flex>
        <Wrap h="1.2rem" />
      </Stack>
    </HStack>
  )
}
