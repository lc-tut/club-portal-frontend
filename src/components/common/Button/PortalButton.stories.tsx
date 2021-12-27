import { PortalButton } from ".";

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "PortalButton",
  component: PortalButton,
} as ComponentMeta<typeof PortalButton>

const Template: ComponentStory<typeof PortalButton> = args => (
  <PortalButton {...args} />
)

const PortalButtonStory = Template.bind({})
