import {
  Grid,
  GridItem,
  HStack,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { Fragment } from "react"
import {
  BsClock,
  BsEnvelope,
  BsLink45Deg,
  BsQuestionCircle,
  BsTrophy,
} from "react-icons/bs"

import type {
  DetailInformationProps,
  RowComponentProps,
} from "../../../types/description"
import { DATE_MAP } from "../../../utils/consts"

import { ActivityRemarkButton } from "./ActivityRemarkButton"
import { Remark } from "./Remark"

const RowComponent: React.FC<React.PropsWithChildren<RowComponentProps>> = (
  props
) => {
  return (
    <HStack
      borderTop="1px"
      borderTopColor="text.sub"
      borderBottom={props.lastIndex ? "1px" : ""}
      borderBottomColor="text.sub"
      py="0.8rem"
    >
      <HStack minWidth="7rem" pl="0.2rem" color="text.sub">
        <props.icon size="1.1rem" />
        <Text>{props.label}</Text>
      </HStack>
      {props.children}
    </HStack>
  )
}
export const DetailInformation: React.FC<DetailInformationProps> = (props) => {
  return (
    <GridItem colSpan={{ base: 12, md: 6 }}>
      <VStack spacing="1rem">
        <Text fontSize="1.5rem" textColor="text.main">
          詳細情報
        </Text>
        <Stack alignSelf="stretch" spacing="0">
          <RowComponent icon={BsQuestionCircle} label="活動内容">
            <UnorderedList stylePosition="inside" color="text.main">
              {props.activity?.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </UnorderedList>
          </RowComponent>
          <RowComponent icon={BsClock} label="日時・場所">
            <Grid
              templateColumns="auto 1fr"
              columnGap="1rem"
              textColor="text.main"
            >
              {props.activityDetail.map((pat, i) => {
                const time = pat.time === "00:00-00:00" ? "未定" : pat.time
                const isLast = props.activityDetail.length - 1 === i

                return (
                  <Fragment key={i}>
                    <GridItem>
                      <Text>{DATE_MAP[pat.date]}</Text>
                    </GridItem>
                    <GridItem>
                      <HStack>
                        <Text>{time}</Text>
                        {pat.timeRemark && (
                          <ActivityRemarkButton text={pat.timeRemark} />
                        )}
                      </HStack>
                    </GridItem>
                    <GridItem />
                    <GridItem pb={isLast ? "0" : "0.8rem"}>
                      <HStack>
                        <Text>{pat.place}</Text>
                        {pat.placeRemark && (
                          <ActivityRemarkButton text={pat.placeRemark} />
                        )}
                      </HStack>
                    </GridItem>
                  </Fragment>
                )
              })}
            </Grid>
          </RowComponent>
          <RowComponent icon={BsTrophy} label="実績">
            <UnorderedList stylePosition="inside" color="text.main">
              {props.achievements?.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </UnorderedList>
          </RowComponent>
          <RowComponent icon={BsEnvelope} label="メール">
            <List textColor="text.main" wordBreak="break-all">
              {props.mail?.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </List>
          </RowComponent>
          <RowComponent icon={BsLink45Deg} label="HP" lastIndex>
            <List>
              {props.website?.map((item, i) => (
                <ListItem key={i} textColor="green.600">
                  <Link href={item}>{item}</Link>
                </ListItem>
              ))}
            </List>
          </RowComponent>
        </Stack>
        {props.remark && <Remark text={props.remark} />}
      </VStack>
    </GridItem>
  )
}
