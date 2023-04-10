import type { ComponentMeta, ComponentStory } from "@storybook/react"

import { PortalLogo } from "."

export default {
  title: "Club Portal/Icon/PortalLogo",
  component: PortalLogo,
} as ComponentMeta<typeof PortalLogo>

const Template: ComponentStory<typeof PortalLogo> = (args) => (
  <PortalLogo {...args} />
)

export const Default = Template.bind({})
