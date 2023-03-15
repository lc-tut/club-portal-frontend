import { GridItem, VStack, Grid, Text, HStack, Flex } from "@chakra-ui/react"
import { MONTHS } from "../../../utils/consts"
import type { AnnualPlanProps } from "../../../types/description"
import { Remark } from "./Remark"

export const AnnualPlan: React.FC<AnnualPlanProps> = (props) => {
  return (
    <GridItem colSpan={12}>
      <VStack>
        <Text fontSize="1.5rem" color="text.main">
          年間予定
        </Text>
        <Grid
          width="100%"
          templateRows={{ base: "repeat(12, 1fr)", md: "repeat(6, 1fr)" }}
          gridAutoFlow="column"
          borderTopWidth="1px"
          borderTopColor="text.sub"
          borderBottomWidth="1px"
          borderBottomColor="text.sub"
        >
          {MONTHS.map((month) => {
            const even = month % 2 == 0
            return (
              <GridItem key={month} backgroundColor={even ? "#F8FFFA" : "#fff"}>
                <HStack height="2.5rem">
                  <Flex
                    height="100%"
                    width="3rem"
                    alignItems="center"
                    justifyContent="end"
                    pr="0.5rem"
                    backgroundColor={even ? "green.50" : "#fff"}
                    textColor="text.sub"
                  >
                    {month}月
                  </Flex>
                  <Text color="text.main">{props.schedules[month]}</Text>
                </HStack>
              </GridItem>
            )
          })}
        </Grid>
        {props.remark && <Remark text={props.remark} />}
      </VStack>
    </GridItem>
  )
}
