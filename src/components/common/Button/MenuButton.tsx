import type { MenuButtonProps } from "../../../types/button"
import { PortalButton } from "./PortalButton"

export const MenuButton: React.VFC<React.PropsWithChildren<MenuButtonProps>> = (
  props
) => {
  const type = props.mbtype ?? "main"
  const height = type === "main" ? "4.25rem" : "3rem"
  const width = type === "main" ? "20rem" : "100%"

  return (
    <PortalButton
      width={width}
      height={height}
      fontSize="1.25rem"
      leftIcon={props.leftIcon}
      flex={props.flex}
      isPreparing={props.isPreparing}
      pbcolor={props.pbcolor}
      pbsize={props.pbsize}
      pbstyle={props.pbstyle}
    >
      {props.children}
    </PortalButton>
  )
}
