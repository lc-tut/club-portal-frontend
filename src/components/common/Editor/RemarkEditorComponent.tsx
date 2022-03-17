import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Wrap,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import { EditorLabel } from "./EditorInput"

type RemarkInputProps = {
  label: string
  remarkKey: "placeRemark" | "timeRemark"
  isRequired: boolean
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
    <FormControl
      isInvalid={props.isRequired && errors[props.remarkKey] !== undefined}
    >
      <Stack spacing="0">
        <Box minH="1.2rem">
          <EditorLabel label={props.label} />
        </Box>
        <Input
          backgroundColor="#fff"
          textColor="text.main"
          {...register(props.remarkKey)}
        />
        <Wrap h="1.2rem">
          <FormErrorMessage>
            {errors[props.remarkKey] && errors[props.remarkKey]?.message}
          </FormErrorMessage>
        </Wrap>
      </Stack>
    </FormControl>
  )
}
