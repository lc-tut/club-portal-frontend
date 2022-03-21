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
import { BUILDING_ID_MAP } from "../../../utils/consts"
import type {
  EditorSelectOptionItem,
  PlaceInputProps,
} from "../../../types/editor"
import { useFormContext } from "react-hook-form"
import { ChangeEvent } from "react"

type FormPlaceType = {
  place: {
    building: number
    room: number
  }
}

export const PlaceInput: React.VFC<PlaceInputProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormPlaceType>()
  const { state, dispatch } = props
  const options: Array<EditorSelectOptionItem> = Object.entries(
    BUILDING_ID_MAP
  ).map((d) => ({ displayName: d[1], value: d[0] }))

  const onBuildingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setIsPlaceEtc(Math.floor(Number(e.target.value) / 100) === 3)
  }

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
            {...register("place.building", {
              onChange: onBuildingChange,
            })}
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
            isDisabled={state.isRoomDisabled}
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
            onChange={() => dispatch({ type: "room" })}
          />
        </Flex>
        <Wrap h="1.2rem" />
      </Stack>
    </HStack>
  )
}
