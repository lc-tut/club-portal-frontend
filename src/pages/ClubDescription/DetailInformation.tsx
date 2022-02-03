import { GridItem, HStack, ListItem, Stack, Text, UnorderedList, VStack, Box, List } from "@chakra-ui/react";
import React from "react";
import { BsCalendarCheck, BsClock, BsEnvelope, BsLink45Deg, BsPinMap, BsQuestionCircle } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import { DetailInformationProps } from "../../types/description";

type RowProps = {
  icon: IconType
  label: string
  content: string[]
  type?: "text" | "list" | "link"
	islast?: boolean
}

const InformationRow: React.VFC<RowProps> = (props) => {
  const isLast = props.islast || false
  const type = props.type ?? "text"
  let content = <></>

  switch (type) {
    case "text":
      content = <List textColor="text.main">{
        props.content.map((item) => {
          return (
            <ListItem key={item}>
              {item}
            </ListItem>
          )
        })
      }</List>
      break;
  
    case "list":
      content = <UnorderedList stylePosition="inside" color="text.main"> {
        props.content?.map((item) => {
          return (
            <ListItem key={item}> {item} </ListItem>
          )
        })
      }</UnorderedList>
      break;

    case "link":
      content = <List> {
        props.content.map((item) => {
          return (
            <ListItem key={item} textColor="green.600">
              <Link to={item}>
                {item}
              </Link>
            </ListItem>
          )
        })
      }</List>
      break;

    default:
      break;
  }

  return (
    <HStack
      borderTop="1px"
      borderTopColor="text.sub"
      borderBottom={isLast ? "1px" : ""}
      borderBottomColor="text.sub"
      py="0.8rem"
    >
      <HStack minWidth="7rem" pl="0.2rem" color="text.sub">
        <props.icon size="1.1rem" />
        <Text>
          {props.label}
        </Text>
      </HStack>
      {content}
    </HStack>
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
          <InformationRow
            icon={BsQuestionCircle}
            label="活動内容"
            content={props.activity ?? []}
            type="list"
          />
          <InformationRow
            icon={BsCalendarCheck}
            label="活動日"
            content={props.date ?? []}
          />
          <InformationRow
            icon={BsClock}
            label="時間"
            content={props.time ?? []}
          />
          <InformationRow
            icon={BsPinMap}
            label="場所"
            content={props.place ?? []}
          />
          <InformationRow
            icon={BsEnvelope}
            label="メール"
            content={props.mail ?? []}
          />
          <InformationRow
            icon={BsLink45Deg}
            label="HP"
            content={props.website ?? []}
            islast={true}
            type="link"
          />
        </Stack>
        { props.remark &&
          <Box
            width="100%"
            p="1rem"
            backgroundColor="background.remark"
            textColor="text.modal.sub"
            borderLeftWidth="1rem"
            borderLeftColor="green.200"
          >
            <Text>
              {props.remark}
            </Text>
          </Box>
        }
      </VStack>
    </GridItem>
  )
}