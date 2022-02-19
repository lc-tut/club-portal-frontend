import {
  Grid,
  GridItem,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
  Box,
  List,
} from "@chakra-ui/react"
import React from "react"
import {
  BsClock,
  BsEnvelope,
  BsLink45Deg,
  BsPinMap,
  BsQuestionCircle,
} from "react-icons/bs"
import { IconType } from "react-icons/lib"
import { Link } from "react-router-dom"
import { DetailInformationProps } from "../../types/description"

type RowComponentProps = {
  icon: IconType
  label: string
  content: JSX.Element
  islast: boolean
}

type PlaceAndTime = {
  date: string
  time: string
  place: string
  timeRemark: string
  placeRemark: string
}

type ContentProps = Pick<RowComponentProps, "icon" | "label" | "islast">

type TextContentProps = ContentProps & {
  // 要素ごとに改行する
  texts: Array<string>
}

type ListContentProps = ContentProps & {
  list: Array<string>
}

type PlaceAndTimeContentProps = ContentProps & {
  placeAndTimes: Array<PlaceAndTime>
}

const RowComponent: React.VFC<RowComponentProps> = (props) => {
  return (
    <HStack
      borderTop="1px"
      borderTopColor="text.sub"
      borderBottom={props.islast ? "1px" : ""}
      borderBottomColor="text.sub"
      py="0.8rem"
    >
      <HStack minWidth="7rem" pl="0.2rem" color="text.sub">
        <props.icon size="1.1rem" />
        <Text>{props.label}</Text>
      </HStack>
      {props.content}
    </HStack>
  )
}

const TextContent: React.VFC<TextContentProps> = (props) => {
  const content = (
    <List textColor="text.main">
      {props.texts.map((item) => {
        return <ListItem key={item}>{item}</ListItem>
      })}
    </List>
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

const ListContent: React.VFC<ListContentProps> = (props) => {
  const content = (
    <UnorderedList stylePosition="inside" color="text.main">
      {props.list.map((item) => {
        return <ListItem key={item}> {item} </ListItem>
      })}
    </UnorderedList>
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

const PlaceAndTimeContent: React.VFC<PlaceAndTimeContentProps> = (props) => {
  const content = <></>

  return (
    <RowComponent
      icon={props.icon}
      label={props.label}
      islast={props.islast}
      content={content}
    />
  )
}

export const DetailInformation: React.VFC<DetailInformationProps> = (props) => {
  return (
    <GridItem colSpan={{ base: 12, md: 6 }}>
      <VStack spacing="1rem">
        <Text fontSize="1.5rem" textColor="text.main">
          詳細情報
        </Text>
        <Stack alignSelf="stretch" spacing="0">
          <GeneralInformationRow
            icon={BsQuestionCircle}
            label="活動内容"
            content={props.activity ?? []}
            type="list"
          />
          <DateTimeInformationRow content={props.datetime ?? {}} />
          <GeneralInformationRow
            icon={BsPinMap}
            label="場所"
            content={props.place ?? []}
          />
          <GeneralInformationRow
            icon={BsEnvelope}
            label="メール"
            content={props.mail ?? []}
          />
          <GeneralInformationRow
            icon={BsLink45Deg}
            label="HP"
            content={props.website ?? []}
            islast={true}
            type="link"
          />
        </Stack>
        {props.remark && (
          <Box
            width="100%"
            p="1rem"
            backgroundColor="background.remark"
            textColor="text.modal.sub"
            borderLeftWidth="1rem"
            borderLeftColor="green.200"
          >
            <Text>{props.remark}</Text>
          </Box>
        )}
      </VStack>
    </GridItem>
  )
}
