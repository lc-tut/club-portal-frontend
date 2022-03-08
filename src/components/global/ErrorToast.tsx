import { useToast } from "@chakra-ui/react"

export const ErrorToast: React.VFC<{ desc: string }> = (props) => {
  const toast = useToast()

  return (
    <>
      {toast({
        title: "Error!",
        description: props.desc,
        status: "error",
        isClosable: true,
        duration: 6000,
        position: "top-right",
      })}
    </>
  )
}
