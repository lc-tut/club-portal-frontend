import { Button, ButtonProps, CSSObject } from "@chakra-ui/react"

type ButtonSize = "normal" | "large" | "100%"
type ButtonStyle = "fill" | "solid" | "round-fill" | "round-solid"
type ButtonColor = "green" | "orange" | "yellow"

export interface PortalButtonProps extends ButtonProps {
  pbsize?: ButtonSize // specify template width of button (default is 'normal')
  pbstyle?: ButtonStyle // specify style like rounded or square, filled or solid (default is 'fill')
  pbcolor?: ButtonColor // specify color theme (default is 'green')
}

function isSolid(style: ButtonStyle): boolean {
  return ["solid", "round-solid"].includes(style)
}

function isRound(style: ButtonStyle): boolean {
  return ["round-fill", "round-solid"].includes(style)
}

export const PortalButton: React.VFC<
  React.PropsWithChildren<PortalButtonProps>
> = (props) => {
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

  // default size prop
  let size: ButtonSize = "normal"
  if (props.pbsize) {
    size = props.pbsize
  }

  // default height and width
  let width: string | undefined
  let height: string | undefined
  if (!props.width) {
    width = sizeMap[size]
  }
  if (!props.height) {
    height = "41px"
  }

  // default style prop
  let style: ButtonStyle = "fill"
  if (props.pbstyle) {
    style = props.pbstyle
  }

  // default color prop
  let color: ButtonColor = "green"
  if (props.pbcolor) {
    color = props.pbcolor
  }

  // define border-radius
  let borderRadius: "full" | undefined
  if (isRound(style)) {
    borderRadius = "full"
  }

  // define FG color
  let fgColor = "#ffffff"
  if (isSolid(style)) {
    fgColor = colorMap[color]
  }

  // define BG color
  let bgColor: string = colorMap[color]
  if (isSolid(style)) {
    bgColor = "transparent"
  }

  // define border-color
  let borderColor = "transparent"
  if (isSolid(style)) {
    borderColor = fgColor
  }

  // define hover style
  let hoverStyle: CSSObject = {}
  if (isSolid(style)) {
    hoverStyle = {
      bg: "#fff",
      opacity: 0.8,
    }
  } else {
    hoverStyle = {
      opacity: 0.8,
    }
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
