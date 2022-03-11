import {
  HStack,
  Image as ChakraImage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { AxiosRequestConfig } from "axios"
import { ChangeEvent, useRef, useState } from "react"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { PortalLogo } from "../../components/common/Icon"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { Loading } from "../../components/global/LoadingPage"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { Thumbnail } from "../../types/api"
import type { StateDispatch } from "../../types/utils"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { ErrorPage } from "../error"

type ResizeModalProps = {
  isOpen: boolean
  onClose: () => void
  crop: Crop
  image: HTMLImageElement
  setCrop: StateDispatch<Crop>
  setIcon: StateDispatch<string>
}

const defaultCrop: Crop = {
  unit: "%",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  aspect: 1,
}

const ResizeModal: React.VFC<ResizeModalProps> = (props) => {
  const onCancel = () => {
    props.setCrop(defaultCrop)
    props.onClose()
  }

  const onSave = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 400
    const scaleX = props.image.naturalWidth / props.image.width
    const scaleY = props.image.naturalHeight / props.image.height
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    ctx.drawImage(
      props.image,
      props.crop.x * scaleX,
      props.crop.y * scaleY,
      props.crop.width * scaleX,
      props.crop.height * scaleY,
      0,
      0,
      400,
      400
    )

    canvas.toBlob((b) => {
      if (b) props.setIcon(URL.createObjectURL(b))
    })

    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalContent>
          <ModalHeader alignSelf="center">
            <Text>画像のリサイズ</Text>
          </ModalHeader>
          <ModalBody>
            <VStack>
              <Text>画像は400x400[px]に縮小されます</Text>
              <ReactCrop
                src={props.image.src}
                crop={props.crop}
                onChange={(crop) => props.setCrop(crop)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <PortalButton pbstyle="solid" onClick={onCancel}>
                キャンセル
              </PortalButton>
              <PortalButton onClick={onSave}>保存</PortalButton>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ModalContent>
    </Modal>
  )
}

export const IconEditor: React.VFC<{}> = () => {
  const { clubUUID } = useOutletUser()
  const { data, isLoading, isError } = useAPI<Thumbnail>(
    `/api/v1/upload/thumbnail/${clubUUID!}`
  )
  const toast = useErrorToast("データの保存に失敗しました。")
  const [icon, setIcon] = useState<string>("")
  const [inputImage, setInputImage] = useState<HTMLImageElement>(() => {
    const img = new Image()
    img.src = data.path
    return img
  })
  const [crop, setCrop] = useState<Crop>(defaultCrop)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const onImageLoad = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      const result = reader.result?.toString()
      if (!result) {
        return
      }
      const image = new Image()
      image.src = result
      image.onload = () => {
        const [imgW, imgH] = [image.naturalWidth, image.naturalHeight]
        let [cropW, cropH] = [0, 0]
        if (imgW < imgH) {
          cropW = 1
          cropH = imgW / imgH
        } else {
          cropW = imgH / imgW
          cropH = 1
        }
        cropW *= 100
        cropH *= 100

        setInputImage(image)
        setCrop({
          ...defaultCrop,
          width: cropW,
          height: cropH,
        })
        onOpen()
      }
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", inputRef.current!.files![0])
    const requestConfig: AxiosRequestConfig<FormData> = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: `/api/v1/upload/thumbnail/clubs/${clubUUID!}`,
      method: "put",
      data: formData,
    }
    try {
      await axiosWithPayload<FormData, unknown>(requestConfig)
    } catch (e) {
      toast()
    }
  }

  if (isLoading) {
    return <Loading fullScreen />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークルアイコンの変更</TitleArea>
      <form onSubmit={onSubmit}>
        <Input
          type="file"
          accept="image/png, image/jpeg"
          display="none"
          ref={inputRef}
          value=""
          onChange={onImageLoad}
        />
        <ResizeModal
          image={inputImage ?? new Image()}
          isOpen={isOpen}
          onClose={onClose}
          crop={crop}
          setCrop={setCrop}
          setIcon={setIcon}
        />
        <EditorBase>
          {icon !== "" ? (
            <ChakraImage src={icon} w="10rem" h="auto" />
          ) : (
            <PortalLogo boxSize="10rem" />
          )}
          <PortalButton
            pbstyle="solid"
            onClick={() => inputRef.current?.click()}
          >
            画像をアップロード
          </PortalButton>
          <PortalButton type="submit" isDisabled={icon === ""}>
            保存
          </PortalButton>
        </EditorBase>
      </form>
    </VStack>
  )
}