import { Button, CSSObject } from "@chakra-ui/react"
import type {
  ButtonColor,
  ButtonRoundStyle,
  ButtonSize,
  ButtonSolidStyle,
  ButtonStyle,
  PortalButtonProps,
} from "../../../types/button"

const isSolid = (style: ButtonStyle): style is ButtonSolidStyle =>
  style === "solid" || style === "round-solid"

const isRound = (style: ButtonStyle): style is ButtonRoundStyle =>
  style === "round-fill" || style === "round-solid"

const sizeMap: { [key in ButtonSize]: string } = {
  normal: "157px",
  large: "253px",
  "100%": "100%",
}

const colorMap: { [key in ButtonColor]: string } = {
  green: "green.600",
  orange: "button.orange",
  yellow: "button.yellow",
}

export const PortalButton: React.VFC<
  React.PropsWithChildren<PortalButtonProps>
> = (props) => {
  // default size prop
  const size = props.pbsize ?? "normal"

  // default height and width
  const width = props.width ?? sizeMap[size]
  const height = props.height ?? "41px"

  // default style prop
  const style = props.pbstyle ?? "fill"

  // default color prop
  const color = props.pbcolor ?? "green"

  // define border-radius
  const borderRadius = isRound(style) ? "full" : undefined

  // define FG color
  const fgColor = isSolid(style) ? colorMap[color] : "#ffffff"

  // define BG color
  const bgColor = isSolid(style) ? "transparent" : colorMap[color]

  // define border-color
  const borderColor = isSolid(style) ? fgColor : "transparent"

  // define hover style
  const hoverStyle: CSSObject = { opacity: 0.8 }
  if (isSolid(style)) {
    hoverStyle.bg = "#fff"
  }

  return (
    <Button
      width={width}
      height={height}
      borderRadius={borderRadius}
      color={fgColor}
      borderColor={borderColor}
      borderWidth="1px"
      backgroundColor={bgColor}
      _hover={hoverStyle}
      _focus={{}}
      {...props}
    >
      {props.children}
    </Button>
  )
}
