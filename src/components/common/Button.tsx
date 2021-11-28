import { border, Button, ButtonProps } from "@chakra-ui/react"
import { Icon } from "react-bootstrap-icons"

type ButtonSize = "normal" | "large"
type ButtonStyle = "fill" | "solid" | "round-fill" | "round-solid"
type ButtonColor = "green" | "orange" | "yellow"

interface PortalButtonProps extends ButtonProps {
    pbsize?: ButtonSize     // specify template width of button (default is 'normal')
    pbstyle?: ButtonStyle   // specify style like rounded or square, filled or solid (default is 'fill')
    pbcolor?: ButtonColor   // specify color theme (default is 'green')
    pbicon?: Icon           // specify left icon (default is undefined)
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
    let size: ButtonSize = "normal";
    if (props.pbsize) {
        size = props.pbsize;
    }

    // default height and width
    let width: number | undefined;
    let height: number | undefined;
    if (!props.width) {
        width = sizeMap[size];
    }
    if (!props.height) {
        height = 41
    }

    // default style prop
    let style: ButtonStyle = "fill";
    if (props.pbstyle) {
        style = props.pbstyle;
    }

    // default color prop
    let color: ButtonColor = "green";
    if (props.pbcolor) {
        color = props.pbcolor;
    }

    // define border-radius
    let borderRadius: "full" | undefined;
    if (isRound(style)) {
        borderRadius = "full";
    }

    // define FG color
    let fgColor: string = "#ffffff";
    if (isSolid(style)) {
        fgColor = colorMap[color];
    }

    // define BG color
    let bgColor: string = colorMap[color];
    if (isSolid(style)) {
        bgColor = "transparent";
    }

    // define border-color
    let borderColor: string = "transparent";
    if (isSolid(style)) {
        borderColor = fgColor;
    }

    return (
        <Button
            width={width + "px"}
            height={height + "px"}
            borderRadius={borderRadius}
            color={fgColor}
            borderColor={borderColor}
            borderWidth="1px"
            backgroundColor={bgColor}
            {...props}
        >
            {props.children}
        </Button>
    );
}
