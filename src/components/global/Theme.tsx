import { extendTheme } from "@chakra-ui/react"

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "80em",
  xl: "100em",
}

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-colors-green-500)",
      boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
    },
  },
})

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-colors-green-500)",
      boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
    },
  },
})

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-colors-green-500)",
      boxShadow: "0 1px 0 0 var(--chakra-colors-green-500)",
    },
  },
})

const theme = extendTheme({
  colors: {
    text: {
      main: "#626262",
      sub: "#A0A0A0",
      card: {
        main: "#7BB194",
        sub: "#8E958C",
      },
      modal: {
        main: "#19342B",
        sub: "#818684",
      },
      title: {
        sub: "#888888",
      },
    },
    button: {
      yellow: "#EDBD17",
      orange: "#ED8131",
      gray: "#E8E8E8",
      text: {
        gray: "#707070",
      },
    },
    form: {
      frame: "#C1C1C1",
      background: "#F5F5F5",
    },
    background: {
      main: "#FFFFFC",
      cards: "#F7F1E5",
      remark: "#F8F8F8",
      modal: "#D9D9D9",
    },
    badge: {
      text: {
        campus: "#0A904D",
        activity: "#898900",
      },
      background: {
        campus: "#E2F5E8",
        activity: "#F0F4DB",
      },
    },
    separator: "#DEDEDE",
  },
  shadows: {
    outline: "0 0 0 1px var(--chakra-colors-green-500)",
  },
  components: {
    Input: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    NumberInput: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    Select: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    Textarea: {
      variants: {
        outline: () => variantOutlined().field,
        filled: () => variantFilled().field,
        flushed: () => variantFlushed().field,
      },
    },
  },
  breakpoints,
})

export { theme as PortalTheme }
