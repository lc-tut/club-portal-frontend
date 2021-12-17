import { ChakraProvider } from "@chakra-ui/react"

import { PortalTheme } from "../src/components/global/Colors"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => {
    <ChakraProvider theme={PortalTheme}>
      <Story />
    </ChakraProvider>
  }
]
