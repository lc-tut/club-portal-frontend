import { Box, GridItem, Stack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import {
  BsEnvelope,
  BsLink45Deg,
  BsPinMap,
  BsQuestionCircle,
} from "react-icons/bs"
import { DetailInformationProps } from "../../../types/description"
import { LinkContent } from "./LinkContent"
import { ListContent } from "./ListContent"
import { PlaceAndTimeContent } from "./PlaceAndTimeContent"
import { TextContent } from "./TextContent"

export const DetailInformation: React.VFC<DetailInformationProps> = (props) => {
  return (
    <GridItem colSpan={{ base: 12, md: 6 }}>
      <VStack spacing="1rem">
        <Text fontSize="1.5rem" textColor="text.main">
          詳細情報
        </Text>
        <Stack alignSelf="stretch" spacing="0">
          <ListContent
            icon={BsQuestionCircle}
            label="活動内容"
            list={props.activity ?? []}
            islast={false}
          />
          <PlaceAndTimeContent
            icon={BsPinMap}
            label="日時・場所"
            placeAndTimes={props.placeAndTimes}
            islast={false}
          />
          <TextContent
            icon={BsEnvelope}
            label="メール"
            texts={props.mail ?? []}
            islast={false}
          />
          <LinkContent
            icon={BsLink45Deg}
            label="HP"
            links={props.website ?? []}
            islast={true}
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
