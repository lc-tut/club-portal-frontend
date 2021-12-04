import { PortalButtonProps } from "../../../types/button"
import { PortalButton } from "./PortalButton"

type mbprops = {
  mbtype?: "main" | "sub"
}

export const MenuButton: React.VFC<
  React.PropsWithChildren<PortalButtonProps & mbprops>
> = (props) => {
  const type = props.mbtype ?? "main"
  const height = type === "main" ? "67px" : "50px"

  return (
    <PortalButton width="340px" height={height} fontSize="20px" {...props}>
      {props.children}
    </PortalButton>
  )
}
