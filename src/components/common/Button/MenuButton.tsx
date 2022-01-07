import { PortalButtonProps } from "../../../types/button"
import { PortalButton } from "./PortalButton"

type mbprops = {
  mbtype?: "main" | "sub"
}

export const MenuButton: React.VFC<
  React.PropsWithChildren<PortalButtonProps & mbprops>
> = (props) => {
  const type = props.mbtype ?? "main"
  const height = type === "main" ? "4.25rem" : "3rem"
  const width = type === "main" ? "20rem" : "100%"

  return (
    <PortalButton width={width} height={height} fontSize="1.25rem" {...props}>
      {props.children}
    </PortalButton>
  )
}
