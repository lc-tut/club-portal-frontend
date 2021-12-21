import { ChakraProvider } from "@chakra-ui/react"
import type { Story } from "@storybook/react"

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
  (Story: Story) => (
    <ChakraProvider theme={PortalTheme}>
      <Story />
    </ChakraProvider>
  )
]
