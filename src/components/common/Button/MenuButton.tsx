import { PortalButtonProps } from "../../../types/button"
import { PortalButton } from "./PortalButton"

type mbprops = {
  mbtype?: "main" | "sub"
}

export const MenuButton: React.VFC<
  React.PropsWithChildren<PortalButtonProps & mbprops>
> = (props) => {
  const type = props.mbtype ?? "main"
  const height = type === "main" ? "3.5em" : "2.5em"

  return (
    <PortalButton width="340px" height={height} fontSize="1.25rem" {...props}>
      {props.children}
    </PortalButton>
  )
}
