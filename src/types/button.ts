import type { ButtonProps } from "@chakra-ui/react"

export type ButtonSize = "normal" | "large" | "100%"
export type ButtonStyle = "fill" | "solid" | "round-fill" | "round-solid"
export type ButtonColor = "green" | "orange" | "yellow"

export type PortalButtonProps = ButtonProps & {
  pbsize?: ButtonSize // specify template width of button (default is 'normal')
  pbstyle?: ButtonStyle // specify style like rounded or square, filled or solid (default is 'fill')
  pbcolor?: ButtonColor // specify color theme (default is 'green')
}

export type ButtonSolidStyle = "solid" | "round-solid"
export type ButtonRoundStyle = "round-fill" | "round-solid"
