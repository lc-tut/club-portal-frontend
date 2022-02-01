import { GridItem, HStack, ListItem, Stack, Text, UnorderedList, VStack } from "@chakra-ui/react";
import React from "react";
import { BsCalendarCheck, BsClock, BsEnvelope, BsLink45Deg, BsPinMap, BsQuestionCircle } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { DetailInformationProps } from "../../types/description";

type RowProps = {
  icon: IconType
  label: string
  content: string[]
	islast?: boolean
}

const InformationRow: React.VFC<RowProps> = (props) => {
  const isLast = props.islast || false

  let content = <Text color="text.main">{props.content}</Text>
  if (props.content.length > 1) {
    content = <UnorderedList stylePosition="inside" color="text.main"> {
      props.content.map((item) => {
        return (
          <ListItem key={item}> {item} </ListItem>
        )
      })
    }</UnorderedList>
  }

  return (
    <HStack
      borderTop="1px"
      borderTopColor="text.sub"
      borderBottom={isLast ? "1px" : ""}
      borderBottomColor="text.sub"
      py="0.8rem"
    >
      <HStack minWidth="7rem" color="text.sub">
        <props.icon />
        <Text>
          {props.label}
        </Text>
      </HStack>
      {content}
    </HStack>
  )
}

export const DetailInformation: React.VFC<DetailInformationProps> = () => {
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
            content={[
              "これはテストです",
              "活動内容はああああああああです"
            ]}
          />
          <InformationRow
            icon={BsCalendarCheck}
            label="活動日"
            content={["毎週水曜日"]}
          />
          <InformationRow
            icon={BsClock}
            label="時間"
            content={["19:30 ~ 20:00"]}
          />
          <InformationRow
            icon={BsPinMap}
            label="場所"
            content={["サークル棟000"]}
          />
          <InformationRow
            icon={BsEnvelope}
            label="メール"
            content={["account@mail.example.com"]}
          />
          <InformationRow
            icon={BsLink45Deg}
            label="HP"
            content={["https://example.co.jp/introduce/this/club"]}
            islast={true}
          />
        </Stack>
      </VStack>
    </GridItem>
  )
}