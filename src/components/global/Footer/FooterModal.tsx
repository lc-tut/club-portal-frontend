import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

export type FooterModalProps = {
  title: string
  element: JSX.Element
  isOpen: boolean
  onClose: () => void
}

export const FooterModal: React.FC<FooterModalProps> = (props) => {
  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.element}</ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
