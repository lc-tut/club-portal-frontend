import type { ComponentMeta, ComponentStory } from "@storybook/react"

import { PortalButton } from "."

export default {
  title: "Club Portal/Button/PortalButton",
  component: PortalButton,
  argTypes: {
    pbsize: {
      options: ["normal", "large", "100%"],
      control: { type: "radio" },
    },
    pbstyle: {
      options: ["fill", "solid", "round-fill", "round-solid"],
      control: { type: "radio" },
    },
    pbcolor: {
      options: ["green", "orange", "yellow"],
      control: { type: "radio" },
    },
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof PortalButton>

const Template: ComponentStory<typeof PortalButton> = (args) => (
  <PortalButton {...args} />
)

export const Default = Template.bind({})

Default.args = {
  pbsize: "normal",
  pbstyle: "fill",
  pbcolor: "green",
  width: "10rem",
  height: "2.5rem",
}
