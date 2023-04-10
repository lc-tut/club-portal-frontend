import type { ComponentMeta, ComponentStory } from "@storybook/react"

import { DefaultUserIcon } from "."

export default {
  title: "Club Portal/Icon/DefaultUserIcon",
  component: DefaultUserIcon,
} as ComponentMeta<typeof DefaultUserIcon>

const Template: ComponentStory<typeof DefaultUserIcon> = (args) => (
  <DefaultUserIcon {...args} />
)

export const Default = Template.bind({})
