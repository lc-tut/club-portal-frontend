import {
  AspectRatio,
  Button,
  Grid,
  GridItem,
  HStack,
  Image as ChakraImage,
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
import { useEffect, useRef, useState } from "react"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { EditorButton } from "../../components/common/Editor/EditorButton"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useAPI } from "../../hooks/useAPI"
import type { Image, UpdateImagePayload } from "../../types/api"
import { toAbsolutePath } from "../../utils/functions"
import type { AxiosRequestConfig } from "axios"
import { axiosWithPayload } from "../../utils/axios"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"

type ImageModalProps = {
  image: string | undefined
  isOpen: boolean
  onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ChakraImage src={props.image} pr="2rem" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

type ImagePreviewsProps = {
  path: string
  item: Image | File
  isNew?: boolean
  onPreviewClick: () => void
  onRemove: (item: Image | File, isNew?: boolean) => void
}

const ImagePreviews: React.FC<ImagePreviewsProps> = (props) => {
  return (
    <GridItem>
      <HStack>
        <VStack>
          <EditorButton
            icon="remove"
            onClick={() => props.onRemove(props.item, props.isNew)}
          />
          <Text color="text.main">{props.isNew && "新規"}</Text>
        </VStack>
        <AspectRatio ratio={16 / 9} w="15rem">
          <Button p="0" borderRadius="0" onClick={props.onPreviewClick}>
            <ChakraImage src={props.path} />
          </Button>
        </AspectRatio>
      </HStack>
    </GridItem>
  )
}

export const ImageEditor: React.FC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Array<Image>>(`/api/v1/clubs/uuid/${clubUuid!}/image`)
  const [existImages, setExistImages] = useState<Array<Image>>([])
  const [newImages, setNewImages] = useState<Array<File>>([])
  const [currentImage, setCurrentImage] = useState<string>("")
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")

  useEffect(() => {
    if (data) {
      setExistImages(data)
    }
  }, [data])

  const onAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files[0]) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      setNewImages([...newImages, files[0]])
    }
  }

  const onRemove = (item: Image | File, isNew?: boolean) => {
    if (isNew) {
      setNewImages(newImages.filter((image) => !Object.is(image, item)))
    } else {
      setExistImages(existImages.filter((image) => !Object.is(image, item)))
    }
    setIsUpdated(true)
  }

  const onPreviewClick = (imagePath: string) => {
    setCurrentImage(imagePath)
    onOpen()
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const imageIDs = existImages.map((image) => ({ imageId: image.imageId }))
    const formData = new FormData()
    newImages.map((image) => formData.append("images", image))
    const uploadRequestConfig: AxiosRequestConfig<FormData> = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: `/api/v1/upload/images/`,
      method: "post",
      data: formData,
    }
    try {
      const res =
        newImages.length > 0
          ? await axiosWithPayload<FormData, Array<Image>>(uploadRequestConfig)
          : undefined
      if (res) {
        res.data.map((d) => imageIDs.push({ imageId: d.imageId }))
      }
      const updateRequestConfig: AxiosRequestConfig<UpdateImagePayload> = {
        url: `/api/v1/clubs/uuid/${clubUuid!}/image`,
        method: "put",
        data: imageIDs,
      }
      await axiosWithPayload<UpdateImagePayload, Array<Image>>(
        updateRequestConfig
      )
      successToast()
    } catch (e) {
      errorToast()
    }
  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>画像の掲載・変更</TitleArea>
      <form onSubmit={onSubmit}>
        <Input
          type="file"
          accept="image/png, image/jpeg"
          display="none"
          ref={inputRef}
          onChange={onAdd}
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
              {existImages.map((image) => (
                <ImagePreviews
                  path={toAbsolutePath(image.path)}
                  item={image}
                  onPreviewClick={() => onPreviewClick(image.path)}
                  onRemove={onRemove}
                  key={image.imageId}
                />
              ))}
              {newImages.map((image, index) => (
                <ImagePreviews
                  path={toAbsolutePath(URL.createObjectURL(image))}
                  item={image}
                  onPreviewClick={() =>
                    onPreviewClick(URL.createObjectURL(image))
                  }
                  onRemove={() => onRemove(image, true)}
                  key={index}
                  isNew
                />
              ))}
            </Grid>
            <ImageModal
              image={toAbsolutePath(currentImage)}
              isOpen={isOpen}
              onClose={onClose}
            />
          </VStack>
          <VStack>
            <PortalButton
              type="submit"
              isDisabled={newImages.length === 0 && !isUpdated}
            >
              保存
            </PortalButton>
            <Text color="text.main">
              新しく追加された画像: {newImages.length ?? 0} 件
            </Text>
          </VStack>
        </EditorBase>
      </form>
    </VStack>
  )
}
