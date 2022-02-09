import { PortalLogo } from "."

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "Club Portal/Icon/PortalLogo",
  component: PortalLogo,
} as ComponentMeta<typeof PortalLogo>

const Template: ComponentStory<typeof PortalLogo> = (args) => (
  <PortalLogo {...args} />
)

export const Default = Template.bind({})
