import {
  AspectRatio,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { createRef, useState } from "react"
import { PortalButton } from "../../../components/common/Button"
import { EditorBase } from "../../../components/common/Editor/EditorBase"
import { EditorButton } from "../../../components/common/Editor/EditorButton"
import { TitleArea } from "../../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../../utils/consts"
import { StateDispatch } from "../../../types/utils"

type ImageModalProps = {
  image: string
  isOpen: boolean
  onClose: () => void
}

type ImagePreviewsProps = {
  onPreviewClick: (image: string) => void
  items: string[]
  setItems: StateDispatch<Array<string>>
  isNew?: boolean
}

const ImageModal: React.VFC<ImageModalProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Image src={props.image} pr="2rem" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const ImagePreviews: React.VFC<ImagePreviewsProps> = (props) => {
  const onRemove = (index: number) => {
    const newItems = [...props.items]
    newItems.splice(index, 1)
    props.setItems(newItems)
  }

  return (
    <>
      {props.items.map((item, index) => (
        <GridItem key={item}>
          <HStack>
            <VStack>
              <EditorButton icon="remove" onClick={() => onRemove(index)} />
              <Text color="text.main">{props.isNew && "新規"}</Text>
            </VStack>
            <AspectRatio ratio={16 / 9} w="15rem">
              <Button
                p="0"
                borderRadius="0"
                onClick={() => props.onPreviewClick(item)}
              >
                <Image src={item} key={item} />
              </Button>
            </AspectRatio>
          </HStack>
        </GridItem>
      ))}
    </>
  )
}

export const ImagesEditor: React.VFC<{}> = () => {
  const dummy = [
    "https://placekitten.com/g/640/360",
    "https://placehold.jp/400x400.png",
    "https://loremflickr.com/400/400",
    "https://placehold.jp/640x360.png",
    "https://www.fillmurray.com/400/400",
    "https://baconmockup.com/640/360",
  ]
  const [inputImages, setInputImages] = useState<string[]>([])
  const [images, setImages] = useState<string[]>(dummy)
  const [modalImage, setModalImage] = useState<string>("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = createRef<HTMLInputElement>()
  const onClick = (image: string) => {
    setModalImage(image)
    onOpen()
  }
  const onAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result?.toString()
        if (!result) {
          return
        }
        setInputImages([...(inputImages ?? []), result])
      }
    }
  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>画像の掲載・変更</TitleArea>
      <Input
        type="file"
        accept="image/png, image/jpeg"
        display="none"
        ref={inputRef}
        onChange={(e) => onAdd(e)}
      />
      <EditorBase>
        <VStack>
          <PortalButton onClick={() => inputRef.current?.click()}>
            画像をアップロード
          </PortalButton>
          <Text color="text.main">
            掲載時に画像は16:9の比率で切り抜かれます
          </Text>
        </VStack>
        <VStack spacing="2rem">
          <Text color="text.main">画像クリックで拡大</Text>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            columnGap="2rem"
            rowGap="2rem"
          >
            <ImagePreviews
              items={images}
              setItems={setImages}
              onPreviewClick={onClick}
            />
            <ImagePreviews
              items={inputImages}
              setItems={setInputImages}
              onPreviewClick={onClick}
              isNew
            />
          </Grid>
          <ImageModal image={modalImage} isOpen={isOpen} onClose={onClose} />
        </VStack>
        <VStack>
          <PortalButton type="submit">保存</PortalButton>
          <Text color="text.main">
            新しく追加された画像: {inputImages?.length ?? 0} 件
          </Text>
        </VStack>
      </EditorBase>
    </VStack>
  )
}
