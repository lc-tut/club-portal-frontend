import { PortalLogo } from ".";

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "PortalLogo",
  component: PortalLogo,
} as ComponentMeta<typeof PortalLogo>

const Template: ComponentStory<typeof PortalLogo> = args => (
  //@ts-ignore
  <PortalLogo {...args} />
)

export const PortalLogoStory = Template.bind({})
