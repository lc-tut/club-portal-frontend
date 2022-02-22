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
import type { DetailInformationProps } from "../../../types/description"

type GeneralInformationRowProps = {
  icon: IconType
  label: string
  content: string[]
  type?: "text" | "list" | "link" | "table"
  islast?: boolean
}

type DateTimeInformationRowProps = {
  content: { [key: string]: string }
  islast?: boolean
}

type RowComponentProps = {
  icon: IconType
  label: string
  content: JSX.Element
  islast: boolean
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

const GeneralInformationRow: React.VFC<GeneralInformationRowProps> = (
  props
) => {
  const type = props.type ?? "text"
  let content = <></>

  switch (type) {
    case "text":
      content = (
        <List textColor="text.main">
          {props.content.map((item) => {
            return <ListItem key={item}>{item}</ListItem>
          })}
        </List>
      )
      break

    case "list":
      content = (
        <UnorderedList stylePosition="inside" color="text.main">
          {" "}
          {props.content?.map((item) => {
            return <ListItem key={item}> {item} </ListItem>
          })}
        </UnorderedList>
      )
      break

    case "link":
      content = (
        <List>
          {" "}
          {props.content.map((item) => {
            return (
              <ListItem key={item} textColor="green.600">
                <Link to={item}>{item}</Link>
              </ListItem>
            )
          })}
        </List>
      )
      break

    default:
      break
  }

  return (
    <RowComponent
      icon={props.icon}
      label={props.label}
      content={content}
      islast={props.islast || false}
    />
  )
}

const DateTimeInformationRow: React.VFC<DateTimeInformationRowProps> = (
  props
) => {
  const items = []
  for (const key in props.content) {
    items.push(<GridItem key={key}>{key}</GridItem>)
    items.push(
      <GridItem key={props.content[key]}>{props.content[key]}</GridItem>
    )
  }

  const content = (
    <Grid
      templateColumns="repeat(2, 1fr)"
      textColor="text.main"
      gridTemplateColumns={"4rem 1fr"}
    >
      {items}
    </Grid>
  )

  return (
    <RowComponent
      icon={BsClock}
      label="時間"
      content={content}
      islast={props.islast || false}
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
