import { border, Button, ButtonProps } from "@chakra-ui/react"
import { Icon } from "react-bootstrap-icons"

type ButtonSize = "normal" | "large"
type ButtonStyle = "fill" | "solid" | "round-fill" | "round-solid"
type ButtonColor = "green" | "orange" | "yellow"

interface PortalButtonProps extends ButtonProps {
    buttonSize?: ButtonSize
    buttonStyle?: ButtonStyle
    buttonColor?: ButtonColor
    buttonIcon?: Icon
}

function isSolid(style: ButtonStyle): boolean {
    return ["solid", "round-solid"].includes(style);
}

function isRound(style: ButtonStyle): boolean {
    return ["round-fill", "round-solid"].includes(style);
}

export const PortalButton: React.VFC<React.PropsWithChildren<PortalButtonProps>> =(
    props
) => {
    const sizeMap: { [key in ButtonSize]: number } = {
        "normal": 157,
        "large" : 253,
    }
    const colorMap: { [key in ButtonColor]: string } = {
        "green": "green.600",
        "orange": "button.orange",
        "yellow": "button.yellow"
    }

    // default size prop
    let buttonSize: ButtonSize = "normal";
    if (props.buttonSize) {
        buttonSize = props.buttonSize;
    }

    // default height and width
    let width: number | undefined;
    let height: number | undefined;
    if (!props.width) {
        width = sizeMap[buttonSize];
    }
    if (!props.height) {
        height = 41
    }

    // default style prop
    let buttonStyle: ButtonStyle = "fill";
    if (props.buttonStyle) {
        buttonStyle = props.buttonStyle;
    }

    // default color prop
    let buttonColor: ButtonColor = "green";
    if (props.buttonColor) {
        buttonColor = props.buttonColor;
    }

    // define border-radius
    let borderRadius: "full" | undefined;
    if (isRound(buttonStyle)) {
        borderRadius = "full";
    }

    // define FG color
    let color: string = "#ffffff";
    if (isSolid(buttonStyle)) {
        color = colorMap[buttonColor];
    }

    // define BG color
    let backgroundColor: string = colorMap[buttonColor];
    if (isSolid(buttonStyle)) {
        backgroundColor = "transparent";
    }

    // define border-color
    let borderColor: string = "transparent";
    if (isSolid(buttonStyle)) {
        borderColor = color;
    }

    return (
        <Button
            width={width + "px"}
            height={height + "px"}
            borderRadius={borderRadius}
            color={color}
            borderColor={borderColor}
            borderWidth="1px"
            backgroundColor={backgroundColor}
            {...props}
        >
            {props.children}
        </Button>
    );
}
