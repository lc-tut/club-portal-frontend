import {
  HStack,
  Stack,
  Text,
  Grid,
  GridItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react"
import { PlaceAndTime } from "../../../types/description"
import { ContentProps, RowComponent } from "./RowComponent"

type PlaceAndTimeContentProps = ContentProps & {
  placeAndTimes: Array<PlaceAndTime>
}

type RemarkButtonProps = {
  text: string
}

type ElementProps = {
  item: PlaceAndTime
}

const RemarkButton: React.VFC<RemarkButtonProps> = (props) => {
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

const Element: React.VFC<ElementProps> = (props) => {
  return (
    <Grid templateColumns="auto 1fr" columnGap="1rem" textColor="text.main">
      <GridItem>
        <Text>{props.item.date}曜日</Text>
      </GridItem>
      <GridItem>
        <HStack>
          <Text w="9rem">{props.item.time}</Text>
          {props.item.timeRemark && (
            <RemarkButton text={props.item.timeRemark} />
          )}
        </HStack>
      </GridItem>
      <GridItem />
      <GridItem>
        <HStack>
          <Text w="9rem">{props.item.place}</Text>
          {props.item.placeRemark && (
            <RemarkButton text={props.item.placeRemark} />
          )}
        </HStack>
      </GridItem>
    </Grid>
  )
}

export const PlaceAndTimeContent: React.VFC<PlaceAndTimeContentProps> = (
  props
) => {
  const content = (
    <Stack>
      {props.placeAndTimes.map((item) => {
        return <Element item={item} key={item.date} />
      })}
    </Stack>
  )

  return (
    <RowComponent
      icon={props.icon}
      label={props.label}
      islast={props.islast}
      content={content}
    />
  )
}
