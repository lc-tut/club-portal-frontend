import { MenuButton } from "."

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "Club Portal/Button/MenuButton",
  component: MenuButton,
  argTypes: {
    mbtype: {
      options: ["main", "sub"],
      control: { type: "radio" },
    },
    height: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof MenuButton>

const Template: ComponentStory<typeof MenuButton> = (args) => (
  <MenuButton {...args} />
)

export const Default = Template.bind({})

Default.args = {
  mbtype: "main",
  children: "foo",
}
