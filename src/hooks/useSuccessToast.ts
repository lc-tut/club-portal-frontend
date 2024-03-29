import { useToast } from "@chakra-ui/react"

export function useSuccessToast(desc: string) {
  const toast = useToast()

  return () =>
    toast({
      title: "Success!",
      description: desc,
      status: "success",
      isClosable: true,
      duration: 6000,
      position: "top-right",
    })
}
