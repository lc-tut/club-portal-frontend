import {
  Box,
  Flex,
  Input,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Select,
  SelectProps,
  Stack,
  Switch,
  SwitchProps,
  Text,
  TextProps,
} from "@chakra-ui/react"
import { EditorSelectOptionItem } from "../../../types/editor"

type EditorTextInputProps = Pick<InputProps, "width" | "value" | "onChange"> & {
  label: string
}

type EditorSelectProps = Pick<SelectProps, "width" | "value" | "onChange"> & {
  label: string
  options: Array<EditorSelectOptionItem>
}

type EditorSwitchProps = Pick<SwitchProps, "isChecked" | "onChange"> & {
  label: string
}

type EditorInputProps = {
  label: string
  element: JSX.Element
}

type EditorNumberInputProps = Pick<
  NumberInputProps,
  "defaultValue" | "min" | "max" | "width" | "value" | "onChange"
> & {
  isDisabled: boolean
  label: string
}

const EditorInput: React.VFC<EditorInputProps> = (props) => {
  return (
    <Stack spacing="0">
      <Box minH="1.2rem">
        <Text fontSize="0.8rem" color="text.sub">
          {props.label}
        </Text>
      </Box>
      {props.element}
    </Stack>
  )
}

export const EditorTextInput: React.VFC<EditorTextInputProps> = (props) => {
  return (
    <EditorInput
      element={
        <Input
          width={props.width}
          value={props.value}
          onChange={props.onChange}
          backgroundColor="#fff"
          textColor="text.main"
        />
      }
      label={props.label}
    />
  )
}

export const EditorSelect: React.VFC<EditorSelectProps> = (props) => {
  return (
    <EditorInput
      element={
        <Select
          backgroundColor="#fff"
          textColor="text.main"
          width={props.width}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )
          })}
        </Select>
      }
      label={props.label}
    />
  )
}

export const EditorNumberInput: React.VFC<EditorNumberInputProps> = (props) => {
  return (
    <EditorInput
      element={
        <NumberInput
          width={props.width}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
          textColor="text.main"
          isDisabled={props.isDisabled}
          value={props.value}
          onChange={props.onChange}
        >
          <NumberInputField backgroundColor="#fff" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      }
      label={props.label}
    />
  )
}

export const EditorSwitch: React.VFC<EditorSwitchProps> = (props) => {
  return (
    <EditorInput
      element={
        <Flex h="40px" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={props.isChecked}
            onChange={props.onChange}
          />
        </Flex>
      }
      label={props.label}
    />
  )
}

export const EditorText: React.VFC<TextProps> = (props) => {
  return (
    <Text pt="1.2rem" color={props.color ?? "text.main"}>
      {props.children}
    </Text>
  )
}
