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
import type { AxiosRequestConfig } from "axios"
import { useEffect, useRef, useState } from "react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { PortalLogo } from "../../components/common/Icon"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { useAPI } from "../../hooks/useAPI"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useOutletUser } from "../../hooks/useOutletUser"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import type { Thumbnail } from "../../types/api"
import type { StateDispatch } from "../../types/utils"
import { axiosWithPayload } from "../../utils/axios"
import { PADDING_BEFORE_FOOTER } from "../../utils/consts"
import { toAbsolutePath } from "../../utils/functions"

type ResizeModalProps = {
  isOpen: boolean
  onClose: () => void
  crop: Crop
  image: HTMLImageElement
  setChangeFlag: StateDispatch<boolean>
  setImage: StateDispatch<HTMLImageElement>
  setCrop: StateDispatch<Crop>
  setIcon: StateDispatch<string>
  setNewImage: StateDispatch<Blob>
}

const defaultCrop: Crop = {
  unit: "%",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
}

const ResizeModal: React.FC<ResizeModalProps> = (props) => {
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
      if (b) {
        props.setNewImage(b)
        props.setIcon(URL.createObjectURL(b))
      }
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
                crop={props.crop}
                aspect={1}
                onChange={(crop) => props.setCrop(crop)}
              >
                {/* TODO: setImage の修正 (critical) | onLoad 時に crop がしっかりセットされるように修正する */}
                <ChakraImage src={props.image.src} onLoad={e => props.setImage(e.currentTarget)} />
              </ReactCrop>
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

export const IconEditor: React.FC<{}> = () => {
  const { clubUuid } = useOutletUser()
  const { data } = useAPI<Thumbnail>(
    `/api/v1/upload/thumbnail/clubs/${clubUuid!}`
  )
  const errorToast = useErrorToast("データの保存に失敗しました。")
  const successToast = useSuccessToast("データの保存が完了しました！")
  const [icon, setIcon] = useState<string>("")
  const [changeFlag, setChangeFlag] = useState<boolean>(false)
  const [newImage, setNewImage] = useState<Blob>(new File([], ""))
  const [fileName, setFileName] = useState<string>("")
  const [inputImage, setInputImage] = useState<HTMLImageElement>(new Image())
  const [crop, setCrop] = useState<Crop>(defaultCrop)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (data) {
      setIcon(data.path)
    }
  }, [data])

  const onImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files.length > 0)) {
      return
    }
    const reader = new FileReader()
    const imageFile = e.target.files[0]
    reader.readAsDataURL(imageFile)
    setFileName(imageFile.name)
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
    formData.append("file", newImage, fileName)
    const requestConfig: AxiosRequestConfig<FormData> = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: `/api/v1/upload/thumbnail/clubs/${clubUuid!}`,
      method: data?.thumbnailId === 1 ? "post" : "put",
      data: formData,
    }
    try {
      await axiosWithPayload<FormData, unknown>(requestConfig)
      successToast()
    } catch (e) {
      errorToast()
    }
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
          image={inputImage}
          setImage={setInputImage}
          isOpen={isOpen}
          onClose={onClose}
          crop={crop}
          setChangeFlag={setChangeFlag}
          setCrop={setCrop}
          setIcon={setIcon}
          setNewImage={setNewImage}
        />
        <EditorBase>
          {icon !== "" || changeFlag ? (
            <ChakraImage src={toAbsolutePath(icon)} w="10rem" h="auto" />
          ) : (
            <PortalLogo boxSize="10rem" />
          )}
          <PortalButton
            pbstyle="solid"
            onClick={() => inputRef.current?.click()}
          >
            画像をアップロード
          </PortalButton>
          <PortalButton type="submit" isDisabled={icon === "" || !changeFlag}>
            保存
          </PortalButton>
        </EditorBase>
      </form>
    </VStack>
  )
}
