import { Button, CSSObject, Tooltip, Wrap } from "@chakra-ui/react"
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
  normal: "10rem",
  large: "16rem",
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
  const height = props.height ?? "2.5rem"

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
    hoverStyle.opacity = "0.8"
  }

  return (
    <Tooltip label={props.isPreparing ? "準備中です" : undefined}>
      <Wrap flex={props.flex}>
        <Button
          width={width}
          height={height}
          borderRadius={borderRadius}
          color={fgColor}
          borderColor={borderColor}
          borderWidth="1px"
          backgroundColor={bgColor}
          leftIcon={props.leftIcon}
          fontSize={props.fontSize}
          isDisabled={props.isPreparing || props.isDisabled}
          type={props.type}
          onClick={props.onClick}
          _hover={hoverStyle}
          _focus={{}}
          _active={{backgroundColor: bgColor}}
        >
          {props.children}
        </Button>
      </Wrap>
    </Tooltip>
  )
}
