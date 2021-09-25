import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        text: {
            "main": "#626262",
            "sub": "#A0A0A0",
            card: {
                "main": "#7BB194",
                "sub": "#8E958C",
            },
            modal: {
                "main": "#19342B",
                "sub": "#818684",
            },
            title: {
                "sub": "#888888"
            }
        },
        button: {
            "yellow": "#EDBD17",
            "orange": "#ED8131",
        },
        form: {
            "frame": "#C1C1C1",
            "background": "#F5F5F5",
        },
        background: {
            "main": "#FFFFFC",
            "cards": "#F7F1E5"
        },
        separator: "#DEDEDE",
    }
})

export {
    theme as PortalTheme
}