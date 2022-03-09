import { useToast } from "@chakra-ui/react"

export const useErrorToast = (desc: string) => {
  const toast = useToast()

  return () => toast({
    title: "Error!",
    description: desc,
    status: "error",
    isClosable: true,
    duration: 6000,
    position: "top-right",
  })
}
