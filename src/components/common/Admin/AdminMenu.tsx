import { Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs"
import { Link } from "react-router-dom"

import type {
  EditorMenuButtonProps,
  EditorMenuProps,
} from "../../../types/editor"

import { AdminBase } from "./AdminBase"

const EditorMenuButton: React.FC<
  React.PropsWithChildren<EditorMenuButtonProps>
> = (props) => {
  const isNotAvailable = props.isNotAvailable ?? false
  const color = isNotAvailable ? "text.main" : "green.600"

  let remark = ""
  let remarkColor = ""
  if (props.isNotAvailable) {
    remark = "準備中です"
    remarkColor = "text.main"
  } else if (props.remark !== undefined) {
    remark = props.remark
    remarkColor = "text.main"
  }

  return (
    <Stack spacing="4px">
      <Link to={props.to}>
        <Button
          h="3rem"
          minW="15rem"
          justifyContent="space-between"
          color={color}
          borderColor={color}
          backgroundColor="#fff"
          variant="outline"
          isDisabled={isNotAvailable}
        >
          {props.children}
          <BsChevronRight />
        </Button>
      </Link>
      <Text fontSize="0.8rem" color={remarkColor} w={"15rem"}>
        {remark}
      </Text>
    </Stack>
  )
}

export const AdminMenu: React.FC<EditorMenuProps> = (props) => {
  return (
    <AdminBase noBackButton>
      <Grid
        // TODO: ブレークポイントをモバイルにする
        templateColumns={{ base: "repeat(1. 1fr)", md: "repeat(2, 1fr)" }}
        rowGap="1rem"
        columnGap="1rem"
      >
        {props.items.map((item) => (
          <GridItem key={item.content}>
            <EditorMenuButton
              to={item.to}
              isNotAvailable={item.isNotAvailable}
              remark={item.remark}
            >
              {item.content}
            </EditorMenuButton>
          </GridItem>
        ))}
      </Grid>
    </AdminBase>
  )
}
