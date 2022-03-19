import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { StateDispatch } from "../../../types/utils"
import { PADDING_BEFORE_FOOTER } from "../../../utils/consts"
import { PortalButton } from "../Button"
import { FilterFlagKey, FilterSwitch } from "./FilterSwitch"

export type Filter = {
  keyword: string
  flags: { [key in FilterFlagKey]: boolean }
}

export const defaultFilter: Filter = {
  keyword: "",
  flags: {
    inHachioji: true,
    inKamata: true,
    isCulture: true,
    isSports: true,
    isCommittee: true,
  },
}

type ClubFilterProps = {
  filter: Filter
  setFilter: StateDispatch<Filter>
  onReset: () => void
  onApply: () => void
  isMobileLayout: boolean
}

export const BrowserClubFilter: React.VFC<ClubFilterProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [adjustWidth] = useMediaQuery("(max-width: 20em)")
  let inputWidth = ""
  if (props.isMobileLayout) {
    inputWidth = adjustWidth ? "90vw" : "20rem"
  } else {
    inputWidth = "18rem"
  }

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterInput = { ...props.filter }
    newFilterInput.keyword = e.target.value
    props.setFilter(newFilterInput)
  }

  return (
    <VStack
      width={props.isMobileLayout ? "100%" : "20rem"}
      height="100%"
      pt="2rem"
      pb={props.isMobileLayout ? "2rem" : PADDING_BEFORE_FOOTER}
      backgroundColor="form.background"
    >
      <Input
        width={inputWidth}
        backgroundColor="#fff"
        borderColor="form.frame"
        textColor="text.main"
        placeholder="検索キーワード"
        value={props.filter.keyword}
        onChange={onKeywordChange}
        _placeholder={{
          color: "text.sub",
        }}
      />

      {/* Browser */}
      {!props.isMobileLayout && (
        <>
          <FilterSwitch filter={props.filter} setFilter={props.setFilter} />
          <HStack
            w="100%"
            px="2rem"
            pt="1.5rem"
            justifyContent={props.isMobileLayout ? "center" : "space-between"}
            spacing={props.isMobileLayout ? "2rem" : undefined}
          >
            <PortalButton pbstyle="solid" width="7rem" onClick={props.onReset}>
              リセット
            </PortalButton>
            <PortalButton width="7rem" onClick={props.onApply}>
              検索
            </PortalButton>
          </HStack>
        </>
      )}

      {/* Mobile */}
      {props.isMobileLayout && (
        <>
          <Box
            w={adjustWidth ? "90vw" : "20rem"}
            backgroundColor="background.main"
            textColor="text.main"
            fontSize={adjustWidth ? "0.8rem" : "1rem"}
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
              {props.filter.flags.inHachioji && <Text>八王子</Text>}
              {props.filter.flags.inKamata && <Text>蒲田</Text>}
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
              {props.filter.flags.isCulture && <Text>文化系</Text>}
              {props.filter.flags.isSports && <Text>体育系</Text>}
              {props.filter.flags.isCommittee && <Text>委員会</Text>}
            </HStack>
          </Box>
          <HStack
            w="1"
            px="2rem"
            pt="1.5rem"
            justifyContent={props.isMobileLayout ? "center" : "space-between"}
            spacing={props.isMobileLayout ? "2rem" : undefined}
          >
            <PortalButton pbstyle="solid" width="7rem" onClick={onOpen}>
              条件変更
            </PortalButton>
            <PortalButton width="7rem" onClick={props.onApply}>
              検索
            </PortalButton>
          </HStack>
          <Modal isOpen={props.isMobileLayout && isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              w={adjustWidth ? "90vw" : "20rem"}
              backgroundColor="background.modal"
            >
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
                    filter={props.filter}
                    setFilter={props.setFilter}
                  />
                  <HStack
                    w="100%"
                    px="2rem"
                    pt="1.5rem"
                    justifyContent="center"
                    spacing={adjustWidth ? undefined : "2rem"}
                  >
                    <PortalButton
                      pbstyle="solid"
                      width="7rem"
                      onClick={() => {
                        props.onReset()
                        onClose()
                      }}
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
    </VStack>
  )
}
