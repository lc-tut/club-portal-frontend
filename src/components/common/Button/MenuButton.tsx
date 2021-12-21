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

  return (
    <PortalButton width="20rem" height={height} fontSize="1.25rem" {...props}>
      {props.children}
    </PortalButton>
  )
}
