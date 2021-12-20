import { PortalButtonProps } from "../../../types/button"
import { PortalButton } from "./PortalButton"

type mbprops = {
  mbtype?: "main" | "sub"
}

export const MenuButton: React.VFC<
  React.PropsWithChildren<PortalButtonProps & mbprops>
> = (props) => {
  const type = props.mbtype ?? "main"
  const width = type === "main" ? "340px" : "100%";
  const height = type === "main" ? "67px" : "50px"

  return (
    <PortalButton width={width} height={height} fontSize="20px" {...props}>
      {props.children}
    </PortalButton>
  )
}
