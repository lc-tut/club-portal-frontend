import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react"
import type { Dispatch } from "react"
import { useForm } from "react-hook-form"
import type { FilterActionType, FilterStateType } from "../../../types/reducer"
import type { StateDispatch } from "../../../types/utils"
import { PADDING_BEFORE_FOOTER } from "../../../utils/consts"
import { PortalButton } from "../Button"

type FilterAreaProps = {
  filterValues: FilterStateType
  dispatchFilterValues: Dispatch<FilterActionType>
  setKeyword: StateDispatch<string>
}

type FilterItemProps = {
  label: string
  isChecked: boolean
  action: FilterActionType["type"]
  dispatcher: Dispatch<FilterActionType>
}

const FilterItem: React.VFC<FilterItemProps> = (props) => {
  return (
    <FormControl display="flex" pl="1rem">
      <FormLabel width="8rem" fontSize="1.25rem" mb="0">
        {props.label}
      </FormLabel>
      <Switch
        colorScheme="green"
        size="lg"
        isChecked={props.isChecked}
        onChange={() => props.dispatcher({ type: props.action })}
      />
    </FormControl>
  )
}

type KeywordFormType = {
  keyword: string
}

export const ClubFilter: React.VFC<FilterAreaProps> = (props) => {
  const { register, handleSubmit } = useForm<KeywordFormType>()

  const onSubmit = handleSubmit((data) => {
    props.setKeyword(data.keyword)
  })

  return (
    <VStack
      width="20rem"
      height="100%"
      pt="2rem"
      pb={PADDING_BEFORE_FOOTER}
      backgroundColor="form.background"
    >
      <form onSubmit={onSubmit}>
        <Input
          width="18rem"
          backgroundColor="#fff"
          borderColor="form.frame"
          textColor="text.main"
          placeholder="検索キーワード"
          _placeholder={{
            color: "text.sub",
          }}
          {...register("keyword")}
        />

        <Stack alignSelf="start" spacing="0.5rem" pt="1rem" pl="3rem">
          <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
            キャンパス
          </Text>
          <FilterItem
            label="八王子"
            isChecked={props.filterValues.isHachiojiCampus}
            action="TOGGLE_IS_HACHIOJI_CAMPUS"
            dispatcher={props.dispatchFilterValues}
          />
          <FilterItem
            label="蒲田"
            isChecked={props.filterValues.isKamataCampus}
            action="TOGGLE_IS_KAMATA_CAMPUS"
            dispatcher={props.dispatchFilterValues}
          />
          <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
            分類
          </Text>
          <FilterItem
            label="文化系"
            isChecked={props.filterValues.isCultureClub}
            action="TOGGLE_IS_CULTURE_CLUB"
            dispatcher={props.dispatchFilterValues}
          />
          <FilterItem
            label="体育系"
            isChecked={props.filterValues.isSportsClub}
            action="TOGGLE_IS_SPORTS_CLUB"
            dispatcher={props.dispatchFilterValues}
          />
          <FilterItem
            label="委員会"
            isChecked={props.filterValues.isCommittee}
            action="TOGGLE_IS_COMMITTEE"
            dispatcher={props.dispatchFilterValues}
          />
        </Stack>
        <HStack w="80%" pt="1.5rem">
          <PortalButton
            pbstyle="solid"
            width="7rem"
            onClick={() => props.dispatchFilterValues({ type: "RESET_FILTER" })}
          >
            リセット
          </PortalButton>
          <Spacer flex="1" />
          <PortalButton width="7rem" type="submit">
            検索
          </PortalButton>
        </HStack>
      </form>
    </VStack>
  )
}
