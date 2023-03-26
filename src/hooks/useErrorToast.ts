import { useToast } from "@chakra-ui/react"

export function useErrorToast(desc: string) {
  const toast = useToast()

  return () =>
    toast({
      title: "Error!",
      description: desc,
      status: "error",
      isClosable: true,
      duration: 6000,
      position: "top-right",
    })
}
