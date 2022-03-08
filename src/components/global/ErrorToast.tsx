import { useToast } from "@chakra-ui/react"

export const ErrorToast: React.VFC<{}> = () => {
  const toast = useToast()

  return (
    <>
      {toast({
        title: "Error!",
        description: "データ取得中にエラーが発生しました！",
        status: "error",
        isClosable: true,
        duration: 6000,
        position: "top-right",
      })}
    </>
  )
}
