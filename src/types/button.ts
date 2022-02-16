import type { ButtonProps } from "@chakra-ui/react"

export type ButtonSize = "normal" | "large" | "100%"
export type ButtonStyle = "fill" | "solid" | "round-fill" | "round-solid"
export type ButtonColor = "green" | "orange" | "yellow"

type CommonPickedProps = Pick<ButtonProps, "leftIcon" | "flex" | "isDisabled">

type CommonProps = CommonPickedProps & {
  pbsize?: ButtonSize // specify template width of button (default is 'normal')
  pbstyle?: ButtonStyle // specify style like rounded or square, filled or solid (default is 'fill')
  pbcolor?: ButtonColor // specify color theme (default is 'green')
}

type MenuButtonInternalProps = {
  mbtype?: "main" | "sub"
}

export type MenuButtonProps = CommonProps & MenuButtonInternalProps

type FavoriteButtonInternalProps = {
  registered: boolean
}

export type FavoriteButtonProps = CommonProps & FavoriteButtonInternalProps

type PortalButtonInternalProps = Pick<
  ButtonProps,
  "width" | "height" | "fontSize"
>

export type PortalButtonProps = CommonProps & PortalButtonInternalProps

export type ButtonSolidStyle = "solid" | "round-solid"
export type ButtonRoundStyle = "round-fill" | "round-solid"
