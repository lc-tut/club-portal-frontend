import { DefaultUserIcon } from ".";

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "DefaultUserIcon",
  component: DefaultUserIcon,
} as ComponentMeta<typeof DefaultUserIcon>

const Template: ComponentStory<typeof DefaultUserIcon> = args => (
  //@ts-ignore
  <DefaultUserIcon {...args} />
)

const DefaultUserIconStory = Template.bind({})
