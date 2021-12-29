import { DefaultUserIcon } from "."

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "Club Portal/Icon/DefaultUserIcon",
  component: DefaultUserIcon,
} as ComponentMeta<typeof DefaultUserIcon>

const Template: ComponentStory<typeof DefaultUserIcon> = (args) => (
  //@ts-ignore
  <DefaultUserIcon {...args} />
)

export const Default = Template.bind({})
