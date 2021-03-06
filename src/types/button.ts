import type { ButtonProps } from "@chakra-ui/react"

export type ButtonSize = "normal" | "large" | "100%"
export type ButtonStyle = "fill" | "solid" | "round-fill" | "round-solid"
export type ButtonColor = "green" | "orange" | "yellow"

type CommonPickedProps = Pick<
  ButtonProps,
  "leftIcon" | "flex" | "isDisabled" | "onClick"
>

type CommonProps = CommonPickedProps & {
  pbsize?: ButtonSize // specify template width of button (default is 'normal')
  pbstyle?: ButtonStyle // specify style like rounded or square, filled or solid (default is 'fill')
  pbcolor?: ButtonColor // specify color theme (default is 'green')
}

type MenuButtonInternalProps = {
  mbtype?: "main" | "sub"
  isPreparing?: boolean
  width?: string
}

export type MenuButtonProps = CommonProps & MenuButtonInternalProps

export type FavoriteButtonProps = CommonProps & {
  isRegistered?: boolean
  isLoading: boolean
}

type PortalButtonInternalProps = Pick<
  ButtonProps,
  "width" | "height" | "fontSize" | "type"
> & {
  isPreparing?: boolean
}

export type PortalButtonProps = CommonProps & PortalButtonInternalProps

export type ButtonSolidStyle = "solid" | "round-solid"
export type ButtonRoundStyle = "round-fill" | "round-solid"
