import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import type { Dispatch } from "react"
import { useForm } from "react-hook-form"

import type { FilterActionType, FilterStateType } from "../../../types/reducer"
import type { StateDispatch } from "../../../types/utils"
import {
  PADDING_BEFORE_FOOTER,
  RESET_FILTER,
  TOGGLE_IS_COMMITTEE,
  TOGGLE_IS_CULTURE_CLUB,
  TOGGLE_IS_HACHIOJI_CAMPUS,
  TOGGLE_IS_KAMATA_CAMPUS,
  TOGGLE_IS_SPORTS_CLUB,
} from "../../../utils/consts"
import { PortalButton } from "../Button"

type FilterSwitchProps = {
  filterValues: FilterStateType
  dispatchFilterValues: Dispatch<FilterActionType>
}

type FilterAreaProps = FilterSwitchProps & {
  setKeyword: StateDispatch<string>
  isMobileLayout: boolean
}

type FilterItemProps = {
  label: string
  isChecked: boolean
  action: FilterActionType["type"]
  dispatcher: Dispatch<FilterActionType>
}

const FilterItem: React.FC<FilterItemProps> = (props) => {
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

const FilterSwitch: React.FC<FilterSwitchProps> = (props) => {
  return (
    <Stack alignSelf="start" spacing="0.5rem" pt="1rem" pl="3rem">
      <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
        キャンパス
      </Text>
      <FilterItem
        label="八王子"
        isChecked={props.filterValues.isHachiojiCampus}
        action={TOGGLE_IS_HACHIOJI_CAMPUS}
        dispatcher={props.dispatchFilterValues}
      />
      <FilterItem
        label="蒲田"
        isChecked={props.filterValues.isKamataCampus}
        action={TOGGLE_IS_KAMATA_CAMPUS}
        dispatcher={props.dispatchFilterValues}
      />
      <Text color="text.modal.sub" pb="0.5rem" pt="1rem">
        分類
      </Text>
      <FilterItem
        label="文化系"
        isChecked={props.filterValues.isCultureClub}
        action={TOGGLE_IS_CULTURE_CLUB}
        dispatcher={props.dispatchFilterValues}
      />
      <FilterItem
        label="体育系"
        isChecked={props.filterValues.isSportsClub}
        action={TOGGLE_IS_SPORTS_CLUB}
        dispatcher={props.dispatchFilterValues}
      />
      <FilterItem
        label="委員会"
        isChecked={props.filterValues.isCommittee}
        action={TOGGLE_IS_COMMITTEE}
        dispatcher={props.dispatchFilterValues}
      />
    </Stack>
  )
}

export const ClubFilter: React.FC<FilterAreaProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm<KeywordFormType>()

  const onSubmit = handleSubmit((data) => {
    props.setKeyword(data.keyword)
  })

  return (
    <VStack
      width={props.isMobileLayout ? "100vw" : "20rem"}
      height="100%"
      pt="2rem"
      pb={PADDING_BEFORE_FOOTER}
      backgroundColor="form.background"
    >
      <form onSubmit={onSubmit}>
        {!props.isMobileLayout ? (
          <>
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

            <FilterSwitch
              filterValues={props.filterValues}
              dispatchFilterValues={props.dispatchFilterValues}
            />
            <HStack w="80%" pt="1.5rem">
              <PortalButton
                pbstyle="solid"
                width="7rem"
                onClick={() =>
                  props.dispatchFilterValues({ type: RESET_FILTER })
                }
              >
                リセット
              </PortalButton>
              <Spacer flex="1" />
              <PortalButton width="7rem" type="submit">
                検索
              </PortalButton>
            </HStack>
          </>
        ) : (
          <>
            <Box
              w="90vw"
              backgroundColor="background.main"
              textColor="text.main"
              fontSize="0.8rem"
              border="1px"
              borderColor="form.frame"
              borderRadius="5px"
            >
              <HStack>
                <Flex
                  w="6.2rem"
                  h="2rem"
                  pl="1rem"
                  borderTopLeftRadius="5px"
                  backgroundColor="background.cards"
                  alignItems="center"
                >
                  <Text>キャンパス</Text>
                </Flex>
                {props.filterValues.isHachiojiCampus && <Text>八王子</Text>}
                {props.filterValues.isKamataCampus && <Text>蒲田</Text>}
              </HStack>
              <HStack>
                <Flex
                  w="6.2rem"
                  h="2rem"
                  pl="1rem"
                  borderBottomLeftRadius="5px"
                  backgroundColor="background.cards"
                  alignItems="center"
                >
                  <Text>分類</Text>
                </Flex>
                {props.filterValues.isCultureClub && <Text>文化系</Text>}
                {props.filterValues.isSportsClub && <Text>体育系</Text>}
                {props.filterValues.isCommittee && <Text>委員会</Text>}
              </HStack>
            </Box>
            <HStack
              w="100%"
              px="2rem"
              pt="1.5rem"
              justifyContent="center"
              spacing="2rem"
            >
              <PortalButton pbstyle="solid" width="7rem" onClick={onOpen}>
                条件変更
              </PortalButton>
              <PortalButton width="7rem" type="submit">
                検索
              </PortalButton>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent w="90vw" backgroundColor="background.modal">
                <ModalHeader pt="2rem" pb="0">
                  <Center
                    color="text.modal.main"
                    fontWeight="bold"
                    fontSize="1.5rem"
                  >
                    条件絞り込み
                  </Center>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pt="0" pb="2rem">
                  <VStack>
                    <FilterSwitch
                      filterValues={props.filterValues}
                      dispatchFilterValues={props.dispatchFilterValues}
                    />
                    <HStack
                      w="100%"
                      px="2rem"
                      pt="1.5rem"
                      justifyContent="center"
                    >
                      <PortalButton
                        pbstyle="solid"
                        width="7rem"
                        onClick={() =>
                          props.dispatchFilterValues({ type: RESET_FILTER })
                        }
                      >
                        リセット
                      </PortalButton>
                      <PortalButton width="7rem" onClick={onClose}>
                        適用
                      </PortalButton>
                    </HStack>
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
      </form>
    </VStack>
  )
}
