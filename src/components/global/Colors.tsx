import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        text: {
            "main": "#626262",
            "sub": "#A0A0A0",
            "test": "#ff0000"
        }
    }
})

export {
    theme as PortalTheme
}