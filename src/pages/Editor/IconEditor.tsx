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
import {
  ChangeEvent,
  createRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { PortalButton } from "../../components/common/Button"
import { EditorBase } from "../../components/common/Editor/EditorBase"
import { PortalLogo } from "../../components/common/Icon"
import { TitleArea } from "../../components/global/Header/TitleArea"
import { PADDING_BEFORE_FOOTER } from "../../static/consts"

type ResizeModalProps = {
  isOpen: boolean
  onClose: () => void
  crop: Crop
  image: HTMLImageElement
  setImage: Dispatch<SetStateAction<HTMLImageElement>>
  setCrop: Dispatch<SetStateAction<Crop>>
  setIcon: Dispatch<SetStateAction<string>>
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
  const onImageLoad = (image: HTMLImageElement) => {
    props.setImage(image)
  }
  const onSave = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 400
    const scaleX = props.image.naturalWidth / props.image.width
    const scaleY = props.image.naturalHeight / props.image.height
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(
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
    props.setIcon(canvas.toDataURL().toString())

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
              <Text>画像は400x400[px]に圧縮されます</Text>
              <ReactCrop
                src={props.image.src}
                crop={props.crop}
                onChange={(crop) => props.setCrop(crop)}
                onImageLoaded={onImageLoad}
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
  const [icon, setIcon] = useState<string>("")
  const [inputImage, setInputImage] = useState<HTMLImageElement>(new Image())
  const [crop, setCrop] = useState<Crop>(defaultCrop)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = createRef<HTMLInputElement>()
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

  return (
    <VStack flex="1" pb={PADDING_BEFORE_FOOTER}>
      <TitleArea>サークルアイコンの変更</TitleArea>
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
        setImage={setInputImage}
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
        <PortalButton pbstyle="solid" onClick={() => inputRef.current?.click()}>
          画像をアップロード
        </PortalButton>
        <PortalButton>保存</PortalButton>
      </EditorBase>
    </VStack>
  )
}
