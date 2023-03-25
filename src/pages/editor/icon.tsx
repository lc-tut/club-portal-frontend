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
import { PADDING_BEFORE_FOOTER, ICON_SIZE } from "../../utils/consts"
import { makeCenterCrop, toAbsolutePath } from "../../utils/functions"

type ResizeModalProps = {
  image: HTMLImageElement
  isOpen: boolean
  onClose: () => void
  setImage: StateDispatch<HTMLImageElement>
  setChangeFlag: StateDispatch<boolean>
  setIcon: StateDispatch<string>
  setNewImageBlob: StateDispatch<Blob>
}

const ResizeModal: React.FC<ResizeModalProps> = (props) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop>()

  const onSave = () => {
    const canvas = document.createElement("canvas")
    canvas.width = ICON_SIZE
    canvas.height = ICON_SIZE
    const { image, setNewImageBlob, setIcon, setChangeFlag, onClose } = props
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    if (!completedCrop) {
      console.error("No completedCrop state")
      return
    }

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      ICON_SIZE,
      ICON_SIZE
    )

    canvas.toBlob((b) => {
      if (b) {
        setNewImageBlob(b)
        setIcon(URL.createObjectURL(b))
      }
    })

    setChangeFlag(true)
    onClose()
  }

  const onImageLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const { naturalWidth: imgW, naturalHeight: imgH } = e.currentTarget
    setCrop(makeCenterCrop(imgW, imgH))
    props.setImage(e.currentTarget)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf="center">
          <Text>画像のリサイズ</Text>
        </ModalHeader>
        <ModalBody>
          <VStack>
            <Text>画像は400x400[px]に縮小されます</Text>
            <ReactCrop
              crop={crop}
              aspect={1}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <ChakraImage src={props.image.src} onLoad={onImageLoad} />
            </ReactCrop>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <PortalButton pbstyle="solid" onClick={props.onClose}>
              キャンセル
            </PortalButton>
            <PortalButton onClick={onSave}>保存</PortalButton>
          </HStack>
        </ModalFooter>
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
  const [newImageBlob, setNewImageBlob] = useState<Blob>(new File([], ""))
  const [fileName, setFileName] = useState<string>("")
  const [inputImage, setInputImage] = useState<HTMLImageElement>(new Image())
  const inputRef = useRef<HTMLInputElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (data) {
      setIcon(data.path)
    }
  }, [data])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      image.onload = () => onOpen()
      setInputImage(image)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", newImageBlob, fileName)
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
          onChange={onSelectFile}
        />
        <ResizeModal
          image={inputImage}
          isOpen={isOpen}
          onClose={onClose}
          setChangeFlag={setChangeFlag}
          setIcon={setIcon}
          setImage={setInputImage}
          setNewImageBlob={setNewImageBlob}
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
