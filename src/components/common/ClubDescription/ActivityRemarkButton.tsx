import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react"
import type { ActivityRemarkButtonProps } from "../../../types/description"

export const ActivityRemarkButton: React.VFC<ActivityRemarkButtonProps> = (
  props
) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          h="1.4rem"
          px="4px"
          fontSize="0.8rem"
          colorScheme="green"
          variant="outline"
        >
          備考
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{props.text}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
