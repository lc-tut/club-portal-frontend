import {
  Stack,
  FormControl,
  Box,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

type RemarkInputProps = {
  label: string
  remarkKey: "placeRemark" | "timeRemark"
  isDisabled: boolean
}

type FormRemarkType = {
  timeRemark: string
  placeRemark: string
}

export const RemarkInput: React.VFC<RemarkInputProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormRemarkType>()

  return (
    <Stack spacing="0">
      <FormControl
        isInvalid={props.isDisabled && errors[props.remarkKey] !== undefined}
      >
        <Box minH="1.2rem">
          <FormLabel fontSize="0.8rem" color="text.sub">
            {props.label}
          </FormLabel>
        </Box>
        <Input
          backgroundColor="#fff"
          textColor="text.main"
          {...register(props.remarkKey)}
        />
        <FormErrorMessage>
          {errors[props.remarkKey] && errors[props.remarkKey]?.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
    // <EditorTextInput
    //   label={props.label}
    //   value={props.inputData[props.remarkKey]}
    //   onChange={(e) => {
    //     const newInputData = { ...props.inputData }
    //     newInputData[props.remarkKey] = e.target.value
    //     props.setInputData(newInputData)
    //   }}
    // />
  )
}
